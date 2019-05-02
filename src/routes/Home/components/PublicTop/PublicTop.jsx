import React, { Component } from "react";
import style from "./PublicTop.scss";
import KV from "assets/KV.png";

import GuestVideo from './components/GuestVideo'
import BookList from './components/BookList'

export class PublicTop extends Component {
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
  refreshProps(props) {}
  render() {
    return (
      <div className={style.OutBox} >
        <div className={style.CoverBox}>
          <img src={KV} alt="" />
        </div>
        <div className={style.Introduce}>
          <span className={style.FontBold}>"护士：引领之声-人人享有健康"</span>
          <span>，为响应2019年512国际护士节主题，中护在线推出</span>
          <span className={style.FontBold}>主题读书会活动</span>
          <span>
            ，特别选取了较受护士们欢迎的6本书籍作为分享蓝本，或自由上传您想推荐给同仁的与护理有关书籍，摘取该书其中一段或章节，分享所选内容的临床宝贵经验，真实案例讨论或护患真情故事，并上传其中任意一个题材的演说视频。
          </span>
        </div>
        <GuestVideo />
        <BookList />
      </div>
    );
  }
}
export default PublicTop;
