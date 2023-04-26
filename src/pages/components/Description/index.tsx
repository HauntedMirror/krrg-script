import React, {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import ReactMarkdown from 'react-markdown';
import markdown from './README.md';

export default function Description() {
  return (
    <Card sx={{ width: 600, margin: 'auto' }}>
      <ReactMarkdown children={markdown} />
    </Card>
  )
}
