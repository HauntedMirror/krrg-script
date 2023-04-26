import * as React from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import ProgramArea from "./components/ProgramArea";
import Description from "./components/Description"

export default function Home() {
  return (
    <main>
      <Box display="flex" justifyContent="center" p={1}>
        <Typography variant="h3">くるるぎすくりぷと</Typography>
      </Box>
      <Grid container justify="center" alignItems="flex-start">
        <Grid item xs><ProgramArea /></Grid>
        <Grid item xs><Description /></Grid>
      </Grid>
    </main>
  )
}
