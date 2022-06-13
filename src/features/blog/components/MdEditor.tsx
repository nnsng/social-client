import { Theme, useMediaQuery } from '@mui/material';
import { Box } from '@mui/system';
import MarkdownIt from 'markdown-it';
import React, { useEffect, useRef } from 'react';
import Editor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getImageUrlFromCDN } from 'utils/common';

export interface IMdEditorChange {
  html: string;
  text: string;
}

export interface IMdEditorProps {
  onEditorChange?: (value: IMdEditorChange) => void;
  readOnly?: boolean;
  value?: string;
  placeholder?: string;
}

const mdParser = new MarkdownIt();

export default function MdEditor(props: IMdEditorProps) {
  const { onEditorChange, readOnly, value, placeholder } = props;

  const ref = useRef<any>(null);

  // add scrollbar to MDEditor
  useEffect(() => {
    const sectionContainers = ref.current.querySelectorAll('.section-container');
    for (const container of sectionContainers) {
      container.classList.add('default-scrollbar');
    }
  }, []);

  const handleImageUpload = async (file: File) => {
    const imageUrl = await getImageUrlFromCDN(file);
    return imageUrl;
  };

  const otherProps = readOnly && {
    view: { menu: false, md: false, html: true },
    style: { border: 'none' },
    readOnly: true,
  };

  return (
    <Box ref={ref} sx={configStyles(!!readOnly)}>
      <Editor
        markdownClass="md-editor"
        htmlClass="custom-html-style md-preview"
        renderHTML={(text: string) => mdParser.render(text)}
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

const configStyles = (readOnly: boolean) => {
  const smDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

  return {
    height: '100%',
    overflow: 'hidden',

    '& .rc-md-editor': {
      height: '100%',
      border: 'none',
      bgcolor: 'transparent',

      '& .editor-container': {
        '& .sec-md .input, & .sec-html .html-wrap': {
          bgcolor: 'transparent',
          color: 'text.primary',
          overflow: readOnly ? 'hidden' : 'auto',
          p: readOnly ? 0 : 'auto',
        },
      },

      '& .header-list .list-item': {
        color: 'text.primary',
        '&:hover': {
          bgcolor: 'action.hover',
        },
      },

      '& .drop-wrap': {
        bgcolor: 'background.paper',
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
      m: 0,
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
        fontSize: !readOnly || smDown ? 16 : 18,
        lineHeight: 1.4,
      },

      '& li': {
        fontSize: !readOnly || smDown ? 16 : 18,
        lineHeight: 1.4,
      },

      '& code': {
        py: 0.25,
        px: 0.5,
        borderRadius: '2px',
        fontSize: readOnly ? 16 : 14,
        lineHeight: 1.4,
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
        fontSize: !readOnly || smDown ? 16 : 18,
      },

      '& a': {
        color: 'primary.main',
        fontSize: !readOnly || smDown ? 16 : 18,
      },

      '& hr': {
        borderColor: 'divider',
      },
    },
  };
};
