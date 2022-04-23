import { Box, Chip, Stack, TextField } from '@mui/material';
import React, { useState } from 'react';

export interface KeywordInputProps {
  name?: string;
  value?: string[];
  maxKeywords?: number;
  placeholder?: string;
  maxKeywordsError?: string;
  onChange?: (keywordList: string[]) => void;
}

export function KeywordInput(props: KeywordInputProps) {
  const { name, value, maxKeywords = 5, placeholder, maxKeywordsError } = props;

  const [inputText, setInputText] = useState<string>('');
  const [keywordList, setKeywordList] = useState<string[]>(value || []);

  const updateKeywordList = (newKeywordList: string[]) => {
    setKeywordList(newKeywordList);
    props.onChange?.(newKeywordList);
  };

  const handleAddKeyword = (e: any) => {
    if (e.key !== 'Enter') return;

    const newKeyword = inputText.toLowerCase().trim();
    if (!newKeyword) return;

    const newKeywordList = [...keywordList, newKeyword];

    updateKeywordList(newKeywordList);
    setInputText('');
  };

  const handleChange = (e: any) => {
    setInputText(e.target.value);
  };

  const handleDelete = (index: number) => {
    updateKeywordList(keywordList.filter((keyword, idx) => idx !== index));
  };

  return (
    <Box>
      <TextField
        name={name}
        value={inputText}
        variant="standard"
        size="small"
        fullWidth
        placeholder={keywordList.length >= maxKeywords ? maxKeywordsError : placeholder}
        disabled={keywordList.length >= maxKeywords}
        onChange={handleChange}
        onKeyUp={handleAddKeyword}
      />

      <Stack mt={1} spacing={0.5}>
        {keywordList.map((keyword, idx) => (
          <Chip
            key={idx}
            label={keyword}
            onDelete={() => handleDelete(idx)}
            sx={{ fontSize: 14 }}
          />
        ))}
      </Stack>
    </Box>
  );
}
