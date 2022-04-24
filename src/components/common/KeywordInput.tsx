import { Box, Chip, FormHelperText, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { formatKeyword } from 'utils/common';

export interface KeywordInputProps {
  name?: string;
  value?: string[];
  max?: number;
  label?: string;
  placeholder?: string;
  errorText?: string;
  onChange?: (keywordList: string[]) => void;
}

export function KeywordInput(props: KeywordInputProps) {
  const { name, value, max = 5, label, placeholder, errorText } = props;

  const [inputText, setInputText] = useState<string>('');
  const [keywordList, setKeywordList] = useState<string[]>(value || []);

  const updateKeywordList = (newKeywordList: string[]) => {
    setKeywordList(newKeywordList);
    props.onChange?.(newKeywordList);
  };

  const handleAddKeyword = (e: any) => {
    if (e.key !== 'Enter') return;

    const newKeyword = formatKeyword(inputText);
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
      <Typography component="p" fontSize={14} color="text.secondary" mb={0.5}>
        {label}
      </Typography>

      <TextField
        name={name}
        value={inputText}
        variant="standard"
        size="small"
        fullWidth
        placeholder={placeholder}
        disabled={keywordList.length >= max}
        onChange={handleChange}
        onKeyUp={handleAddKeyword}
      />

      {keywordList.length >= max && <FormHelperText error>{errorText}</FormHelperText>}

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
