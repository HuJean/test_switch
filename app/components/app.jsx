import React from 'react';
import SwitchList from './switchList';

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {"listIndex": 0};
    this.preHandler = this.preHandler.bind(this);
    this.nextHandler = this.nextHandler.bind(this);
  }

  preHandler(index){
    this.setState({"type": 0});
  }
  nextHandler(index){
    this.setState({"type": 1});
  }
  render() {
    return (
      <div>
        <div className="introContainer">
          <p>绿色(正常):expected=0,predicted&lt;0.5</p>
          <p>红色(误判):expected=1,predected&gt;0.5</p>
          <p>黄色(误判):expected=1,predicted&lt;0.5</p>
          <p>蓝色(误判):expected=0,predicted&gt;0.55</p>
        </div>
        <div className="btnContainer">
          <button onClick={this.preHandler}>上一轮</button>
          <button onClick={this.nextHandler}>下一轮</button>
        </div>
        <div className="container">
          <SwitchList type={this.state.type}/>
        </div>
        
      </div>
    );
  }
}

