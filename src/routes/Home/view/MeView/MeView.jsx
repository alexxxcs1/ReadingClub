import React, { Component } from 'react'
import style from './MeView.scss'
import readbook from 'assets/readbook.gif'
  
export class MeView extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={style.ViewBox}>
      <div className={[style.NotFound,'childcenter childcolumn'].join(' ')}>
        <p>等你带我们开启一本好书</p>
        <p>点击上方“报名成为读书笔记分享者”即刻参赛</p>
        <img src={readbook} className={style.readIcon} alt=""/>
      </div>
    </div>
   )
   }
}
export default MeView