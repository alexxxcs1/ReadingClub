import React, { Component } from 'react'
import style from './MeView.scss'
import readbook from 'assets/readbook.gif'
import BookList from './components/BookList'  
import {api} from 'common/app'

import ShareBox from 'components/ShareBox'

import commenticon2 from 'assets/commenticon2.png'
import wechaticon from 'assets/wechaticon.png'
import forwardicon2 from 'assets/forwardicon2.png'
import forwardicon3 from 'assets/forwardicon3.png'

export class MeView extends Component {
constructor(props) {
  super(props);
  this.state = {
    bookdata:{},
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onBookChange = this.onBookChange.bind(this);
     this.jumptoShareDetail = this.jumptoShareDetail.bind(this);
     this.onShare = this.onShare.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
onBookChange(book){
  if(this.state.unmount) return;
  this.state.bookdata = book?book:this.state.bookdata;
  this.setState(this.state)
}
jumptoShareDetail(id,e){
  if(!e.target.getAttribute('data-safebody')){
    window.location.hash = '#/share/' + id;
  }
}
onShare(id){
  ShareBox(window.location.origin + '' + window.location.pathname + '/#/share/' + id,{
    type:'notes',
    id:id
  })
}
componentWillUnmount(){//注销异步操作导致的错误导致的内存泄漏
  this.setState = (state, callback) => {
    return
  }
}
render() {
  return (
    <div className={style.ViewBox}>
      <BookList onChnage={this.onBookChange}/>
      {JSON.stringify(this.state.bookdata) === '{}'?'':(
      <div className={[style.BookContent,'childcenter childcolumn'].join(' ')} onClick={this.jumptoShareDetail.bind(this,this.state.bookdata.id)}>
        <div className={[style.VideoCard,'childcenter childcolumn'].join(' ')}>
            <div className={style.PosterBox} >
                <img src={this.state.bookdata.cover} alt=""/>
            </div>
            <div className={style.InfoBox}>
                <div className={style.TitleBox}>{'DataObj.title'}</div>
                <div className={[style.UserBox,'childcenter'].join(' ')}>
                    <div className={[style.UserName,'childcenter '].join(' ')}>
                        <img src={wechaticon} alt=""/>
                        <span>{this.state.bookdata.nickname}</span>
                    </div>
                    <div className={[style.VideoComment,'childcenter '].join(' ')}>
                        <img src={commenticon2} alt=""/>
                        <span>{this.state.bookdata.commentNum}</span>
                    </div>
                    <div className={[style.VideoShare,'childcenter '].join(' ')}>
                        <img src={forwardicon2} alt=""/>
                        <span>{this.state.bookdata.shareNum}</span>
                    </div>
                </div>
            </div>
            <div onClick={this.onShare.bind(this,this.state.bookdata.id)} data-safebody='true' className={[style.ShareButton,'childcenter'].join(' ')}><img src={forwardicon3} alt=""/>分享给朋友</div>
        </div>
      </div>
      )}
      
      {/* <div className={[style.NotFound,'childcenter childcolumn'].join(' ')}>
        <p>等你带我们开启一本好书</p>
        <p>点击上方“报名成为读书笔记分享者”即刻参赛</p>
        <img src={readbook} className={style.readIcon} alt=""/>
      </div> */}

    </div>
   )
   }
}
export default MeView