import { messageApi, userApi } from '@/api';
import { Conversation, Message, User } from '@/models';
import { useAppSelector } from '@/store/hooks';
import { selectSocket } from '@/store/slices/socketSlice';
import { selectCurrentUser } from '@/store/slices/userSlice';
import {
  ArrowBackRounded,
  CloseRounded,
  ForumRounded,
  SearchRounded,
  SendRounded,
  DeleteOutlineRounded,
} from '@mui/icons-material';
import { ConfirmDialog } from '@/components/common';
import {
  Avatar,
  Badge,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Paper,
  TextField,
  Typography,
  Zoom,
} from '@mui/material';
import dayjs from 'dayjs';
import { useEffect, useRef, useState } from 'react';

export function ChatWidget() {
  const socket = useAppSelector(selectSocket);
  const currentUser = useAppSelector(selectCurrentUser);

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'list' | 'chat'>('list');
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [deletingConversation, setDeletingConversation] = useState(false);
  const [conversationToDelete, setConversationToDelete] = useState<Conversation | null>(null);

  // Search & loading states
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<Partial<User>[]>([]);
  const [loadingConversations, setLoadingConversations] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  // Message input state
  const [inputText, setInputText] = useState('');

  // Refs
  const messageEndRef = useRef<HTMLDivElement>(null);

  // Load conversations when logged in and open
  const fetchConversations = async () => {
    if (!currentUser) return;
    setLoadingConversations(true);
    try {
      const data = await messageApi.getConversations();
      setConversations(data);
    } catch (error) {
      console.error('Failed to load conversations', error);
    } finally {
      setLoadingConversations(false);
    }
  };

  useEffect(() => {
    if (currentUser && isOpen) {
      fetchConversations();
    }
  }, [currentUser, isOpen]);

  // Handle open-chat custom events
  useEffect(() => {
    const handleOpenChat = async (e: Event) => {
      const customEvent = e as CustomEvent<{ userId?: string }>;
      const targetUserId = customEvent.detail?.userId;

      setIsOpen(true);

      if (targetUserId) {
        setLoadingMessages(true);
        setActiveTab('chat');
        try {
          const { conversation, messages: chatMessages } =
            await messageApi.getOrCreateConversation(targetUserId);
          setActiveConversation(conversation);
          setMessages(chatMessages);
          // Refresh list too so it exists
          fetchConversations();
        } catch (error) {
          console.error('Failed to open chat with user', error);
        } finally {
          setLoadingMessages(false);
        }
      } else {
        setActiveTab('list');
      }
    };

    window.addEventListener('open-chat', handleOpenChat);
    return () => {
      window.removeEventListener('open-chat', handleOpenChat);
    };
  }, [currentUser]);

  // Real-time socket message handler
  useEffect(() => {
    if (!socket || !currentUser) return;

    const handleNewMessage = (message: Message) => {
      // Refresh the conversations list so lastMessage and order update
      fetchConversations();

      // Check if message belongs to current open conversation
      if (activeConversation && message.conversationId === activeConversation._id) {
        setMessages((prev) => {
          // Prevent duplicates
          if (prev.some((m) => m._id === message._id)) return prev;
          return [...prev, message];
        });
      } else {
        // Only count as unread if the sender is not the current user
        if (message.senderId !== currentUser._id) {
          setUnreadCount((prev) => prev + 1);
        }
      }
    };

    const handleConversationDelete = ({ conversationId }: { conversationId: string }) => {
      fetchConversations();
      if (activeConversation && activeConversation._id === conversationId) {
        setActiveConversation(null);
        setMessages([]);
        setActiveTab('list');
      }
    };

    socket.on('message:receive', handleNewMessage);
    socket.on('conversation:delete', handleConversationDelete);
    return () => {
      socket.off('message:receive', handleNewMessage);
      socket.off('conversation:delete', handleConversationDelete);
    };
  }, [socket, currentUser, activeConversation]);

  const handleDeleteConversation = async () => {
    const targetConversation = conversationToDelete;
    if (!targetConversation) return;
    setDeletingConversation(true);
    try {
      await messageApi.deleteConversation(targetConversation._id);
      if (activeConversation && activeConversation._id === targetConversation._id) {
        setActiveConversation(null);
        setMessages([]);
        setActiveTab('list');
      }
      setConversationToDelete(null);
      setOpenDeleteConfirm(false);
      fetchConversations();
    } catch (error) {
      console.error('Failed to delete conversation', error);
    } finally {
      setDeletingConversation(false);
    }
  };

  // Scroll to bottom of message list on updates
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, activeTab]);

  // Clear unread count when opening the widget
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  // User search logic
  useEffect(() => {
    if (!searchText.trim()) {
      setSearchResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoadingSearch(true);
      try {
        const results = await userApi.search(searchText.trim());
        // Filter out current user from search results
        setSearchResults(results.filter((u) => u._id !== currentUser?._id));
      } catch (error) {
        console.error('Failed to search users', error);
      } finally {
        setLoadingSearch(false);
      }
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [searchText, currentUser]);

  const handleSelectConversation = async (conv: Conversation) => {
    setActiveConversation(conv);
    setLoadingMessages(true);
    setActiveTab('chat');
    try {
      const data = await messageApi.getMessages(conv._id);
      setMessages(data);
    } catch (error) {
      console.error('Failed to get messages', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSelectUserFromSearch = async (user: Partial<User>) => {
    if (!user._id) return;
    setLoadingMessages(true);
    setActiveTab('chat');
    setSearchText('');
    setSearchResults([]);
    try {
      const { conversation, messages: chatMessages } =
        await messageApi.getOrCreateConversation(user._id);
      setActiveConversation(conversation);
      setMessages(chatMessages);
      fetchConversations();
    } catch (error) {
      console.error('Failed to start conversation', error);
    } finally {
      setLoadingMessages(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const receiverId = activeConversation.otherParticipant._id;
    const text = inputText;
    setInputText('');

    try {
      // Sending message will trigger the Socket broadcast on the backend,
      // which will append it to our messages list in the socket listener.
      await messageApi.sendMessage({ receiverId, text });
    } catch (error) {
      console.error('Failed to send message', error);
    }
  };

  // Render helper for timestamp
  const formatTime = (dateString: string) => {
    const time = dayjs(dateString);
    if (time.isSame(dayjs(), 'day')) {
      return time.format('HH:mm');
    }
    return time.format('MMM DD');
  };

  if (!currentUser) return null;

  return (
    <Box sx={{ position: 'fixed', bottom: 24, right: 24, zIndex: 1000 }}>
      {/* Minimized State (Bubble) */}
      <Zoom in={!isOpen}>
        <IconButton
          onClick={() => setIsOpen(true)}
          sx={{
            width: 56,
            height: 56,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            boxShadow: '0px 4px 16px rgba(0,0,0,0.15)',
            transition: 'transform 0.2s',
            '&:hover': {
              backgroundColor: 'primary.dark',
              transform: 'scale(1.08)',
            },
          }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <ForumRounded sx={{ fontSize: 28, color: '#FFFFFF' }} />
          </Badge>
        </IconButton>
      </Zoom>

      {/* Expanded State (Chat Box) */}
      <Zoom in={isOpen}>
        <Paper
          sx={{
            position: 'absolute',
            bottom: 0,
            right: 0,
            width: 360,
            height: 480,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            borderRadius: 3,
            boxShadow: '0px 8px 32px rgba(0,0,0,0.15)',
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}
        >
          {/* Header */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              py: 1.5,
              backgroundColor: 'primary.main',
              color: 'primary.contrastText',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {activeTab === 'chat' && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setActiveTab('list');
                    setActiveConversation(null);
                  }}
                  sx={{ color: '#FFFFFF', mr: -0.5 }}
                >
                  <ArrowBackRounded fontSize="small" />
                </IconButton>
              )}
              {activeTab === 'chat' && activeConversation ? (
                <>
                  <Avatar
                    src={activeConversation.otherParticipant.avatar}
                    sx={{ width: 32, height: 32 }}
                  />
                  <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                      {activeConversation.otherParticipant.name}
                    </Typography>
                    <Typography variant="caption" sx={{ opacity: 0.8, color: '#FFFFFF', display: 'block', mt: -0.5 }}>
                      @{activeConversation.otherParticipant.username}
                    </Typography>
                  </Box>
                </>
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <ForumRounded sx={{ fontSize: 20, color: '#FFFFFF' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: '#FFFFFF' }}>
                    Messages
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {activeTab === 'chat' && activeConversation && (
                <IconButton
                  size="small"
                  onClick={() => {
                    setConversationToDelete(activeConversation);
                    setOpenDeleteConfirm(true);
                  }}
                  sx={{ color: '#FFFFFF' }}
                >
                  <DeleteOutlineRounded fontSize="small" />
                </IconButton>
              )}
              <IconButton
                size="small"
                onClick={() => setIsOpen(false)}
                sx={{ color: '#FFFFFF' }}
              >
                <CloseRounded fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          {/* Conversations List View */}
          {activeTab === 'list' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
              {/* User search bar */}
              <Box sx={{ p: 1.5 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Search people..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRounded fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Divider />

              {/* Chat list / Search results container */}
              <Box sx={{ flexGrow: 1, overflowY: 'auto' }}>
                {searchText.trim() ? (
                  /* Search Results */
                  loadingSearch ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : searchResults.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {searchResults.map((user) => (
                        <ListItem key={user._id} disablePadding>
                          <ListItemButton onClick={() => handleSelectUserFromSearch(user)}>
                            <ListItemAvatar>
                              <Avatar src={user.avatar} />
                            </ListItemAvatar>
                            <ListItemText
                              primary={user.name}
                              secondary={`@${user.username}`}
                            />
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: 'center', py: 4 }}
                    >
                      No users found
                    </Typography>
                  )
                ) : (
                  /* Conversations List */
                  loadingConversations ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                      <CircularProgress size={24} />
                    </Box>
                  ) : conversations.length > 0 ? (
                    <List sx={{ p: 0 }}>
                      {conversations.map((conv) => {
                        const otherUser = conv.otherParticipant;
                        return (
                          <ListItem key={conv._id} disablePadding>
                            <ListItemButton onClick={() => handleSelectConversation(conv)}>
                              <ListItemAvatar>
                                <Avatar src={otherUser.avatar} />
                              </ListItemAvatar>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                      {otherUser.name}
                                    </Typography>
                                    {conv.lastMessage && (
                                      <Typography variant="caption" color="text.secondary">
                                        {formatTime(conv.lastMessage.createdAt)}
                                      </Typography>
                                    )}
                                  </Box>
                                }
                                secondary={
                                  conv.lastMessage
                                    ? (conv.lastMessage.senderId === currentUser._id ? 'You: ' : '') + conv.lastMessage.text
                                    : 'Started a conversation'
                                }
                                secondaryTypographyProps={{
                                  sx: {
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  },
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        );
                      })}
                    </List>
                  ) : (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: 'center', py: 4, px: 2 }}
                    >
                      No conversations yet. Search for someone to start chatting!
                    </Typography>
                  )
                )}
              </Box>
            </Box>
          )}

          {/* Active Chat View */}
          {activeTab === 'chat' && (
            <Box sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, overflow: 'hidden' }}>
              {/* Message History */}
              <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                {loadingMessages ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : messages.length > 0 ? (
                  messages.map((msg) => {
                    const isOwn = msg.senderId === currentUser._id;
                    return (
                      <Box
                        key={msg._id}
                        sx={{
                          display: 'flex',
                          justifyContent: isOwn ? 'flex-end' : 'flex-start',
                        }}
                      >
                        <Box
                          sx={{
                            maxWidth: '75%',
                            backgroundColor: isOwn ? 'primary.main' : 'action.hover',
                            color: isOwn ? 'primary.contrastText' : 'text.primary',
                            borderRadius: isOwn ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                            px: 1.75,
                            py: 1,
                            boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                          }}
                        >
                          <Typography variant="body2">{msg.text}</Typography>
                          <Typography
                            variant="caption"
                            sx={{
                              display: 'block',
                              textAlign: 'right',
                              fontSize: '0.65rem',
                              opacity: 0.6,
                              mt: 0.25,
                              color: isOwn ? '#FFFFFF' : 'text.secondary',
                            }}
                          >
                            {dayjs(msg.createdAt).format('HH:mm')}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ textAlign: 'center', py: 4 }}
                  >
                    No messages yet. Say hello!
                  </Typography>
                )}
                <div ref={messageEndRef} />
              </Box>

              <Divider />

              {/* Message Input */}
              <Box component="form" onSubmit={handleSendMessage} sx={{ p: 1.5, display: 'flex', gap: 1 }}>
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Type a message..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  autoComplete="off"
                />
                <IconButton
                  type="submit"
                  color="primary"
                  disabled={!inputText.trim()}
                  sx={{
                    backgroundColor: inputText.trim() ? 'primary.main' : 'transparent',
                    color: inputText.trim() ? '#FFFFFF' : 'primary.main',
                    '&:hover': {
                      backgroundColor: inputText.trim() ? 'primary.dark' : 'transparent',
                    },
                  }}
                >
                  <SendRounded fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          )}
        </Paper>
      </Zoom>

      <ConfirmDialog
        type="chat.delete"
        open={openDeleteConfirm}
        loading={deletingConversation}
        onClose={() => setOpenDeleteConfirm(false)}
        onConfirm={handleDeleteConversation}
      />
    </Box>
  );
}
