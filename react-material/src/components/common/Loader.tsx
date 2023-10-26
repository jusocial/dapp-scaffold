import React, { useEffect, useState } from 'react'
import { Backdrop, Box, CircularProgress } from '@mui/material';


interface LoaderProps {
  isLoading?: boolean,
  loaderType?: 'linear' | 'circular',
  height?: string
}

export default function Loader({ isLoading = false, loaderType = 'circular', height = 'inherit' }: LoaderProps) {

  // const { loaderType, isLoading } = props;

  return (
    <>
      <Box
        display={'flex'}
        height={height}
        alignItems={'center'}
        justifyContent={'center'}
        sx={{}}
      >
        {/* <CircularProgress /> */}
        <Backdrop
          // sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        // onClick={handleClose}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      </Box>
    </>
  )
}
