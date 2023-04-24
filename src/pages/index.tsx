import * as React from "react";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ProgramArea from "./components/ProgramArea/ProgramArea";

export default function Home() {
  return (
    <main>
      <Box sx={{ minWidth: 500, maxWidth: 600, margin: 'auto' }} p={2}>
        <Box display="flex" justifyContent="center" p={1}>
          <Typography variant="h3">くるるぎすくりぷと</Typography>
        </Box>
        <ProgramArea />
      </Box>
    </main>
  )
}
