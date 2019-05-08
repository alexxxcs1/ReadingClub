import React, { Component } from "react";
import style from "./Comment.scss";
import CommentItem from "./components/CommentItem";
import BottomHandle from "./components/BottomHandle";
import readbook from 'assets/readbook.gif'

import { api } from "common/app";

let loadTimeOut;

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onAjax:false,
      id:null,
      data:[],
      userinfo:{},
      sharedata: {},
      page: 1,
      maxpage:1,
      pageSize: 10
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.createCommentList = this.createCommentList.bind(this);
    this.ListenScroll = this.ListenScroll.bind(this);
    this.PushData = this.PushData.bind(this);
    this.onReplyUpdate = this.onReplyUpdate.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
    this.refs.commentlist.addEventListener('scroll',this.ListenScroll);
  }
  refreshProps(props) {
    let shareid = props.match.params.id;
    if (shareid == this.state.id) return;
    this.getData(shareid);
    this.state.id = shareid;
    this.setState({
      id: this.state.id
    });
  }
  getData(id) {
    if (this.state.onAjax) return;
    this.setState({
        onAjax:true,
    })
    api.getCommentList(id, this.state.page, this.state.pageSize).then(
      res => {
        if (res.code === 200) {
          this.state.sharedata = res.data;
          this.state.userinfo = res.data.userinfo;
          this.state.page = res.data.page;
          this.state.maxpage = res.data.page_count;
          this.state.data = res.data.list;
          this.state.onAjax = false;
          this.setState(this.state);
        }
      },
      err => {
        console.log(err);
      }
    );
  }
  PushData(id){
    let nextpage = this.state.page+1;
    if (nextpage>this.state.maxpage||this.state.onAjax) return;
    this.setState({
        onAjax:true,
    })
    api.getCommentList(id,nextpage, this.state.pageSize).then(
        res => {
          if (res.code === 200) {
            this.state.page = res.data.page;
            this.state.maxpage = res.data.page_count;
            this.state.data = this.state.data.concat(res.data.list);
            this.state.onAjax = false;
            this.setState(this.state);
          }
        },
        err => {
          console.log(err);
        }
    );
  }
  createCommentList() {
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
      const comment = this.state.data[z];
      result.push(<CommentItem key={comment.content.id} data={comment} />);
    }
    return result;
  }
  ListenScroll(e){
    let scrollbody = e.currentTarget;
    if ((scrollbody.scrollTop+scrollbody.clientHeight +50) > scrollbody.scrollHeight) {
        clearTimeout(loadTimeOut);
        loadTimeOut = setTimeout(() => {
            this.PushData(this.state.id)
        }, 300);
    }
  }
  onReplyUpdate(reply){
    this.state.data.unshift(reply);
    this.setState({
        data:this.state.data
    })
  }
  render() {
    return (
      <div className={[style.ViewBox].join(" ")} >
        {JSON.stringify(this.state.sharedata) === "{}" ? (
          <div className={[style.CommentBox,'childcenter'].join(' ')} ref={'commentlist'}>
            <img src={readbook} className={style.LoadingImage} alt=""/>
          </div>
        ) : (
          <div className={style.CommentBox} ref={'commentlist'}>
          {this.createCommentList()}
          {this.state.onAjax?<div className={[style.TipsBox,'childcenter'].join(' ')}>-加载中-</div>:''}
          {this.state.page>=this.state.maxpage?<div className={[style.TipsBox,'childcenter'].join(' ')}>-没有更多了-</div>:''}
          </div>
        )}
        <BottomHandle data={this.state.userinfo} onUpdate={this.onReplyUpdate}/>
      </div>
    );
  }
}
export default Comment;
