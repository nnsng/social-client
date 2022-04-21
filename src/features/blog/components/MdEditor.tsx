import { Theme } from '@mui/material';
import { Box } from '@mui/system';
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
  overflow: 'hidden',

  '& .rc-md-editor': {
    height: '100%',
    border: 'none',
    bgcolor: 'transparent',

    '& .editor-container .sec-md .input, .editor-container .sec-html .html-wrap': {
      bgcolor: 'transparent',
      color: 'text.primary',
      overflow: readOnly ? 'hidden' : 'auto',
    },

    '& .header-list .list-item': {
      color: 'text.primary',
      '&:hover': {
        bgcolor: 'action.hover',
      },
    },

    '& .drop-wrap': {
      bgcolor: 'background.default',
      borderColor: 'divider',
    },

    '& .table-list.wrap .list-item': {
      bgcolor: 'action.focus',
      '&.active': {
        bgcolor: 'action.disabled',
      },
    },

    '&.full': {
      zIndex: 9999,
    },

    '& .rc-md-navigation': {
      border: 'none',
      bgcolor: 'transparent',

      '& .button-wrap .button': {
        color: 'text.secondary',
        '&:hover': {
          color: 'text.primary',
        },
        '&.disabled': {
          color: 'action.disabled',
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
    m: readOnly ? -2 : 0,
    color: 'text.primary',

    '& table': {
      '& thead th': {
        bgcolor: 'action.hover',
        borderColor: 'divider',
      },
      '& tbody td': {
        borderColor: 'divider',
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
      bgcolor: 'action.hover',
      color: 'text.primary',
    },

    '& pre': {
      borderRadius: 1,
      bgcolor: 'action.hover',
      color: 'text.primary',
      '& code': {
        bgcolor: 'transparent',
      },
    },

    '& blockquote': {
      borderLeft: 4,
      borderColor: 'primary.main',
      bgcolor: 'action.hover',
      color: 'text.primary',
    },

    '& a': {
      color: 'primary.main',
    },

    '& hr': {
      borderColor: 'divider',
    },
  },
});
