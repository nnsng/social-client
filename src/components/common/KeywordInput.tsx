import { Box, Chip, Stack, TextField } from '@mui/material';
import { Keyword } from 'models';
import React, { useState } from 'react';
import { slugifyString } from 'utils/common';

export interface KeywordInputProps {
  name?: string;
  value?: Keyword[];
  maxKeywords?: number;
  placeholder?: string;
  maxKeywordsError?: string;
  onChange?: (keywordList: Keyword[]) => void;
}

export function KeywordInput(props: KeywordInputProps) {
  const { name, value, maxKeywords = 5, placeholder, maxKeywordsError } = props;

  const [inputText, setInputText] = useState<string>('');
  const [keywordList, setKeywordList] = useState<Keyword[]>(value || []);

  const handleAddKeyword = (e: any) => {
    if (e.key !== 'Enter') return;

    const newKeyword = {
      name: inputText,
      value: slugifyString(inputText),
    };
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

  const updateKeywordList = (newKeywordList: Keyword[]) => {
    setKeywordList(newKeywordList);
    props.onChange?.(newKeywordList);
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

      <Stack direction="row" mt={1} spacing={0.5}>
        {keywordList.map((keyword, idx) => (
          <Chip
            key={idx}
            variant="outlined"
            color="primary"
            label={keyword.name}
            onDelete={() => handleDelete(idx)}
            sx={{ fontSize: 14 }}
          />
        ))}
      </Stack>
    </Box>
  );
}
