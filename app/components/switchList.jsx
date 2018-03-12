import React from 'react';

export default class SwitchList extends React.Component {

  constructor(props) {
    super(props);
    var url = 'app/components/result.txt';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send(null);
    var that = this;
    xhr.addEventListener('readystatechange', function() {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var all = data.all;
        that.state = {"all": all,"list":[],"index":-1};
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    var type = nextProps.type;
    var all = this.state.all;
    var index = this.state.index;
    if(type==1){
      index += 1;
    }else if(type==0){
      if(index==-1){
        index = 0;
        this.setState({"list": all[index],"index":index});
      }else{
        index -= 1;
      }
      
    } 
    if(index<0){
      alert("当前已经是第一轮！");
      this.setState({"index": 0});
    }else if(index>=all.length){
      alert("当前已经是最后一轮！");
      this.setState({"index": all.length-1});
    }else{
      this.setState({"list": all[index],"index":index});
    }  
  }

  render() {
    var list = !!this.state && this.state.list || [];
    if(list.length === 0) {
      return (
        <h2>No switch，点击任意按钮开始！</h2>
      );
    }else {
      var imgs = [];
      for(var i=0;i<list.length;i++){
        var sw = list[i];
        var expected = sw.expected;
        var predicted = sw.predicted;
        var imgUrl = require('../images/green.png');
        if(expected==0 && predicted>0.5){
          imgUrl = require('../images/blue.png');
        }else if(expected==1 && predicted>0.5){
          imgUrl = require('../images/red.png');
        }else if(expected==1 && predicted<=0.5){
          imgUrl = require('../images/yellow.png');
        }
        imgs.push(
          <div className='item' id={'it_'+i} >
            <img src={imgUrl}/>
            <span className='des' id={'des_'+i}>
              {'S'+i}<br/>{'expected:'+expected}<br/>{'predicted:'+predicted}
            </span>
          </div>
        );
      }
      return (
        <div>
          {imgs}
        </div>
      );
    }
  }
}
