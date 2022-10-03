import React from 'react';
import { Box, Typography } from '@mui/material';
import { purple } from '@mui/material/colors';

const primary = purple[500]; // #f44336

export default function Error() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#282c34',
      }}
    >
      <Typography variant="h1" style={{ color: 'white' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

      }}>
        <h1 style={{
          marginTop: '1px',
        }}>404</h1> 
	  	  <p style={{
          marginTop: '-100px',
        }}>Page Not Found</p>
		</div>
      </Typography>
    </Box>
  );
}
