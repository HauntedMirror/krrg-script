import React, { Component } from "react";
import dynamic from "next/dynamic";
import Box from "@mui/material/Box";

const AceEditor = dynamic(async () => import("react-ace"), { ssr: false });

type propsType = {
  onChange?: (value: string) => void;
};

export function Editor(props: propsType) {
  return (
    <Box>
      <AceEditor onChange={props.onChange} width="100%" />
    </Box>
  );
}

export default Editor;
