import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Loader() {
  return (
    <div
      style={{
        backgroundColor: '#282c34',
        height: '100vh',
        width: '100vw',
      }}
    >
      <Box sx={{ 
        left: '50%',
        top: '50%',
        position: 'absolute',
        transform: 'translate(-50%, -50%)',
      }}>
        <CircularProgress />
      </Box>
    </div>
  );
}