import React, {Component} from 'react';
import dynamic from 'next/dynamic';

const AceEditor = dynamic(async () => import('react-ace'), { ssr: false });

type propsType = {
  onChange?: (value: string) => void
}

export function Editor(props: propsType) {
  return (
    <AceEditor
    onChange={props.onChange}
    />
  )
}

export default Editor;
