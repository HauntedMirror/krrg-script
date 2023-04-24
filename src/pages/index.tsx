import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ProgramArea } from "./components/ProgramArea/ProgramArea";

const IndexPage: React.FC<PageProps> = () => {
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

export default IndexPage

export const Head: HeadFC = () => <title>Home Page</title>
