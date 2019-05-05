import React, { Component } from 'react'
import style from './TextBox.scss'

import quotationmarksicon from 'assets/quotationmarksicon.png'
  
export class TextBox extends Component {
constructor(props) {
  super(props);
  this.state = {
      data:null,
      hideall:true,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createTextContent = this.createTextContent.bind(this);
     this.HandleHideAll = this.HandleHideAll.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.setState({
    data:props.data
  });
}
HandleHideAll(boolean){
    this.setState({
        hideall:boolean,
    })
}
createTextContent(){
    if (this.state.data===null) return;
    switch (this.state.hideall) {
        default:
        case true:
            if (this.state.data.length<150) {
                return this.state.data;
            }else{
                return [this.state.data.slice(0,150),<span onClick={this.HandleHideAll.bind(this,false)}>...(展开)</span>];
            }
        case false:
            return this.state.data;
    }
}
render() {
  return (
    <div className={[style.TextBox,this.state.hideall?'':style.showall].join(' ')}>
        <img src={quotationmarksicon} className={style.background} alt=""/>
        {this.createTextContent()}
    </div>
   )
   }
}
export default TextBox