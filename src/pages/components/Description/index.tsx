import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';

export default function Description() {
  return (
    <Card sx={{ width:600, margin: 'auto' }}>
      <Box>
        <Typography variant="h4">
          文法
        </Typography>
      </Box>
    </Card>
  )
}
