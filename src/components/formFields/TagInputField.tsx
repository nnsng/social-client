import { Grid, Typography } from '@mui/material';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import { Tag } from 'models';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import 'styles/tagInput.css';
import { slugifyString } from 'utils/common';

export interface TagInputFieldProps {
  name: string;
  control: Control<any>;
  editable?: boolean;
  maxTags?: number;
  placeholder?: string;
}

export function TagInputField(props: TagInputFieldProps) {
  const { name, control, editable, maxTags, placeholder } = props;

  const {
    field: { value, onChange },
  } = useController({ name, control });

  const handleTagInputChange = (newTags: string[]) => {
    const tagMap = newTags.map((tag) => ({
      name: tag,
      value: slugifyString(tag),
    }));

    onChange(tagMap);
  };

  return (
    <Grid item xs>
      <Typography variant="subtitle1" mb={0.5}>
        Thêm tối đa {maxTags} từ khóa liên quan đến bài viết:
        <br />
        (Enter để thêm từ khoá)
      </Typography>

      <ReactTagInput
        tags={value.map((tag: Tag) => tag.name)}
        removeOnBackspace={true}
        onChange={handleTagInputChange}
        editable={editable}
        maxTags={maxTags}
        placeholder={placeholder}
      />
    </Grid>
  );
}
