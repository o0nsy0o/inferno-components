import * as React from "react";

export default class Hello extends React.Component<null, { count: number; }> {

  public state = { count: 0 }

  public addCount = () => {
    this.setState({ count: ++this.state.count });
  }

  public reduceCount = () => {
    this.setState({ count: --this.state.count });
  }

  public render() {
    return (
      <div className="index">
        <div className="text">{this.state.count}</div>
        <div>
          <div className="btn">+</div>
          <div className="btn">-</div>
        </div>
      </div>
    );
  }
}