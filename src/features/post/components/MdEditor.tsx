import { Box, SxProps } from '@mui/system';
import MarkdownIt from 'markdown-it';
import React from 'react';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getImageUrl } from 'utils';

export interface MdEditorOnChangeProps {
  html: string;
  text: string;
}

export interface MdEditorProps {
  onEditorChange?: (value: MdEditorOnChangeProps) => void;
  readOnly?: boolean;
  value?: string;
  placeholder?: string;
}

const mdParser = new MarkdownIt();

export default function MdEditor(props: MdEditorProps) {
  const { onEditorChange, readOnly, value, placeholder } = props;

  const readOnlyAttrs = readOnly && {
    view: { menu: false, md: false, html: true },
    style: { border: 'none' },
    readOnly: true,
  };

  const handleImageUpload = async (file: File) => {
    const imageUrl = getImageUrl(file);
    return imageUrl;
  };

  const mdSxProps: SxProps = {
    height: '100%',

    '& .rc-md-editor': {
      height: '100%',
      border: 'none',

      '&.full': {
        zIndex: 9999,
      },
    },

    '& .rc-md-navigation': {
      border: 'none',
      bgcolor: 'transparent',
    },

    '& .md-editor': {
      fontSize: '16px !important',
      lineHeight: '1.6 !important',
      borderRight: (theme: any) => `1px solid ${theme.palette.divider} !important`,
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
    },

    '& .md-preview': {
      m: readOnly ? '-15px' : 0,

      '& p': {
        fontSize: readOnly ? 18 : 16,
        lineHeight: readOnly ? 1.8 : 1.6,
      },

      '& li': {
        fontSize: readOnly ? 18 : 16,
        lineHeight: readOnly ? 1.8 : 1.6,
      },

      '& code': {
        fontSize: readOnly ? 16 : 14,
        lineHeight: readOnly ? 1.8 : 1.6,
        py: 0.25,
        px: 0.5,
        bgcolor: 'grey.200',
        borderRadius: '2px',
      },

      '& pre': {
        bgcolor: 'grey.200',
        borderRadius: 1,
      },

      '& blockquote': {
        borderLeft: 4,
        borderColor: 'primary.main',
      },

      '& a': {
        color: 'primary.main',
      },
    },
  };

  return (
    <Box sx={mdSxProps}>
      <Editor
        markdownClass="md-editor"
        htmlClass="custom-html-style md-preview"
        renderHTML={(text) => mdParser.render(text)}
        onChange={onEditorChange}
        onImageUpload={handleImageUpload}
        value={value}
        placeholder={placeholder}
        allowPasteImage={true}
        {...readOnlyAttrs}
      />
    </Box>
  );
}
