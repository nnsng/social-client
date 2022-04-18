import { Theme } from '@mui/material';
import { Box, SxProps } from '@mui/system';
import MarkdownIt from 'markdown-it';
import React from 'react';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getImageUrlFromCDN } from 'utils/common';

export interface MdEditorOnChange {
  html: string;
  text: string;
}

export interface MdEditorProps {
  onEditorChange?: (value: MdEditorOnChange) => void;
  readOnly?: boolean;
  value?: string;
  placeholder?: string;
}

const mdParser = new MarkdownIt();

export default function MdEditor(props: MdEditorProps) {
  const { onEditorChange, readOnly, value, placeholder } = props;

  const otherProps = readOnly && {
    view: { menu: false, md: false, html: true },
    style: { border: 'none' },
    readOnly: true,
  };

  const handleImageUpload = async (file: File) => {
    const imageUrl = await getImageUrlFromCDN(file);
    return imageUrl;
  };

  const mdWrapperSx = configMdSx(!!readOnly);

  return (
    <Box sx={mdWrapperSx}>
      <Editor
        markdownClass="md-editor"
        htmlClass="custom-html-style md-preview"
        renderHTML={(text) => mdParser.render(text)}
        onChange={onEditorChange}
        onImageUpload={handleImageUpload}
        value={value}
        placeholder={placeholder}
        allowPasteImage={true}
        {...otherProps}
      />
    </Box>
  );
}

const configMdSx = (readOnly: boolean) => ({
  height: '100%',

  '& .rc-md-editor': {
    height: '100%',
    border: 'none',
    bgcolor: 'transparent',

    '& .editor-container .sec-md .input, .editor-container .sec-html .html-wrap': {
      bgcolor: 'transparent',
      color: (theme: Theme) => theme.palette.text.primary,
    },

    '& .header-list .list-item': {
      color: (theme: Theme) => theme.palette.text.primary,
      '&:hover': {
        bgcolor: (theme: Theme) => theme.palette.action.hover,
      },
    },

    '& .drop-wrap': {
      bgcolor: (theme: Theme) => theme.palette.background.default,
      borderColor: (theme: Theme) => theme.palette.divider,
    },

    '& .table-list.wrap .list-item': {
      bgcolor: (theme: Theme) => theme.palette.action.focus,
      '&.active': {
        bgcolor: (theme: Theme) => theme.palette.action.disabled,
      },
    },

    '&.full': {
      zIndex: 9999,
    },

    '& .rc-md-navigation': {
      border: 'none',
      bgcolor: 'transparent',

      '& .button-wrap .button': {
        color: (theme: Theme) => theme.palette.text.secondary,
        '&:hover': {
          color: (theme: Theme) => theme.palette.text.primary,
        },
        '&.disabled': {
          color: (theme: Theme) => theme.palette.action.disabled,
        },
      },
    },
  },

  '& .md-editor': {
    fontSize: '16px !important',
    lineHeight: '1.6 !important',
    borderRight: (theme: Theme) => `1px solid ${theme.palette.divider} !important`,
    scrollbarWidth: 'none',
    msOverflowStyle: 'none',
  },

  '& .md-preview': {
    m: readOnly ? '-15px' : 0,
    color: (theme: Theme) => theme.palette.text.primary,

    '& table': {
      '& thead th': {
        bgcolor: (theme: Theme) => theme.palette.action.hover,
        borderColor: (theme: Theme) => theme.palette.divider,
      },
      '& tbody td': {
        borderColor: (theme: Theme) => theme.palette.divider,
      },
    },

    '& p': {
      fontSize: readOnly ? 18 : 16,
      lineHeight: readOnly ? 1.8 : 1.6,
    },

    '& li': {
      fontSize: readOnly ? 18 : 16,
      lineHeight: readOnly ? 1.8 : 1.6,
    },

    '& code': {
      py: 0.25,
      px: 0.5,
      borderRadius: '2px',
      fontSize: readOnly ? 16 : 14,
      lineHeight: readOnly ? 1.8 : 1.6,
      bgcolor: (theme: Theme) => theme.palette.action.hover,
      color: (theme: Theme) => theme.palette.text.primary,
    },

    '& pre': {
      borderRadius: 1,
      bgcolor: (theme: Theme) => theme.palette.action.hover,
      color: (theme: Theme) => theme.palette.text.primary,
      '& code': {
        bgcolor: 'transparent',
      },
    },

    '& blockquote': {
      borderLeft: 4,
      borderColor: 'primary.main',
      bgcolor: (theme: Theme) => theme.palette.action.hover,
      color: (theme: Theme) => theme.palette.text.primary,
    },

    '& a': {
      color: 'primary.main',
    },

    '& hr': {
      borderColor: (theme: Theme) => theme.palette.divider,
    },
  },
});
