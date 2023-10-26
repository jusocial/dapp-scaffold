'use client';

import { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckIcon from '@mui/icons-material/Check';
import { Box } from "@mui/material";


interface CopyToClipboardProps {
  textToCopy: string,
  title?: string,
  gap?: number,
  notification?: 'default' | 'toast'
}

export default function CopyToClipboard({ textToCopy, title, gap, notification = 'default' }: CopyToClipboardProps) {

  const [text, setText] = useState(textToCopy);
  const [isCopied, setIsCopied] = useState(false);

  // This is the function we wrote earlier
  async function copyTextToClipboard(text: string) {
    if ('clipboard' in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  // onClick handler function for the copy button
  const handleCopyClick = () => {
    // Asynchronously call copyTextToClipboard
    copyTextToClipboard(text)
      .then(() => {
        if (notification === 'toast') {
          // setOpen(true);
        } else {
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 2000);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (

    <Box 
    display={'flex'}
    alignItems={'center'}
    gap={gap ? gap : undefined}
    
    onClick={handleCopyClick}
    >
      {isCopied
        ?
        <CheckIcon
          fontSize='inherit'
          sx={{ transition: 'all 0.5s' }}
        />
        :
        <ContentCopyIcon
          fontSize='inherit'
          sx={{
            cursor: 'pointer',
            transition: 'all 0.3s'
          }}
        />
      }
      {title &&
        <>{title}</>
      }
    </Box>

  );
}
