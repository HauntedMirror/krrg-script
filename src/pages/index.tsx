import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import ProgramArea from "./components/ProgramArea";
import Description from "./components/Description";
import Header from "./components/Header";

export default function Home() {
  return (
    <main>
      <Header />
      <Grid container justifyContent="center" alignItems="flex-start">
        <Grid item xs>
          <ProgramArea />
          <pre></pre>
        </Grid>
        <Grid item xs>
          <Description />
        </Grid>
      </Grid>
    </main>
  );
}
