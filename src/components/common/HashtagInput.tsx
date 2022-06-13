import { Box, Chip, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { formatHashtag } from 'utils/common';

export interface IHashtagInputProps {
  name?: string;
  value?: string[];
  max?: number;
  label?: string;
  placeholder?: string;
  errorText?: string;
  onChange?: (hashtagList: string[]) => void;
}

export function HashtagInput(props: IHashtagInputProps) {
  const { name, value, max = 5, label, placeholder, errorText } = props;

  const [inputText, setInputText] = useState<string>('');
  const [hashtagList, setHashtagList] = useState<string[]>(value || []);

  const updateHashtagList = (newHashtagList: string[]) => {
    setHashtagList(newHashtagList);
    props.onChange?.(newHashtagList);
  };

  const handleAddHashtag = (e: any) => {
    if (e.key !== 'Enter') return;

    const newHashtag = formatHashtag(inputText);
    if (!newHashtag) return;

    const newHashtagList = [...hashtagList, newHashtag];

    updateHashtagList(newHashtagList);
    setInputText('');
  };

  const handleChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleDelete = (index: number) => {
    updateHashtagList(hashtagList.filter((_, idx) => idx !== index));
  };

  return (
    <Box>
      <Typography component="p" color="text.secondary" fontSize={14} mb={0.5}>
        {label}
      </Typography>

      <TextField
        name={name}
        value={inputText}
        variant="outlined"
        size="small"
        fullWidth
        placeholder={placeholder}
        disabled={hashtagList.length >= max}
        sx={{
          '& input': {
            fontSize: 14,
          },
        }}
        onChange={handleChange}
        onKeyUp={handleAddHashtag}
      />

      {hashtagList.length >= max && <FormHelperText error>{errorText}</FormHelperText>}

      <Stack mt={1} spacing={0.5}>
        {hashtagList.map((hashtag, idx) => (
          <Chip key={idx} label={hashtag} onDelete={() => handleDelete(idx)} />
        ))}
      </Stack>
    </Box>
  );
}
