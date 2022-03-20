import { Grid, Typography } from '@mui/material';
import ReactTagInput from '@pathofdev/react-tag-input';
import '@pathofdev/react-tag-input/build/index.css';
import { Tag } from 'models';
import React from 'react';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
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

  const { t } = useTranslation('createEditForm');

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
        {t('label.tag', { maxTags })}
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
