import React, { Component } from "react";
import Editor from "../Editor";
import Card from "@mui/material/Card";

import dynamic from "next/dynamic";
const AceEditor = dynamic(async () => import("react-ace"), { ssr: false });

interface Props {}
interface State {
  code?: string;
  arg?: string;
  result?: string;
  running?: boolean;
}

export default class ProgramArea extends Component<Props, State> {
  private worker: Worker | undefined;
  private output: string;
  constructor(props: Props) {
    super(props);
    this.state = {
      code: "",
      arg: "",
      result: "",
      running: false,
    };
    this.output = "";
    this.terminateWorker = this.terminateWorker.bind(this);
    this.execute = this.execute.bind(this);
  }

  execute() {
    this.output = "";
    this.setState({ running: true });
    this.worker = new Worker(
      new URL("../../../interpreter/interpreter-worker.ts", import.meta.url)
    );
    this.worker.onmessage = (message) => {
      const data = JSON.parse(message.data);
      if (data.type === "console") {
        this.output = this.output + data.data;
      } else if (data.type === "Error") {
        this.output = this.output + data.data;
        this.setState({ running: false });
        this.terminateWorker();
      } else if (data.type == "OK") {
        this.setState({ running: false });
        this.terminateWorker();
      }
      this.setState({ result: this.output });
    };
    this.worker.postMessage(
      JSON.stringify({
        src: this.state.code,
        args: [Number.parseInt(this.state.arg || "")],
      })
    );
  }
  terminateWorker() {
    try {
      if (this.worker) {
        this.worker.terminate();
      }
    } catch (e) {
      // pass
    }
    this.setState({ running: false });
  }
  render() {
    return (
      <Card sx={{ width: 600, margin: "auto" }}>
        <section>
          <Editor onChange={(code) => this.setState({ code: code })} />
        </section>
        <section>
          <input
            type="number"
            value={this.state.arg}
            onChange={(e) => this.setState({ arg: e.target.value })}
          />
          {this.state.running ? (
            <button onClick={this.terminateWorker}>停止</button>
          ) : (
            <button onClick={this.execute}>実行</button>
          )}
          {this.state.running ? "running..." : "stopping"}
        </section>
        <section>
          <AceEditor
            readOnly={true}
            mode="text"
            height="100px"
            value={this.state.result}
            showGutter={false}
          />
        </section>
      </Card>
    );
  }
}
