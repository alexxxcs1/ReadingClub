import React, { Component } from "react";
import style from "./Comment.scss";
import TextBox from "./components/TextBox";
import ChildComment from "./components/ChildComment";
import BottomHandle from "./components/BottomHandle";
import {api} from 'common/app'

export class Comment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id:null,
      data:{},
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.onUpdataComment = this.onUpdataComment.bind(this);
  }
  componentWillReceiveProps(nextprops) {
    this.refreshProps(nextprops);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  refreshProps(props) {
    let commentid  = props.match.params.id;
    this.setState({
      id:commentid
    })
    this.getData(commentid);
  }
  getData(id){
    api.getCommentDetail(id).then(res=>{
      if (res.code === 200) {
        this.state.data=res.data;
        this.setState(this.state);
      }
    },err=>{
      console.log(err);
      
    })
  }
  onUpdataComment(value){
    console.log(value);
    this.state.data.child.unshift(value);
    this.setState({
        data:this.state.data
    })
  }
  render() {
    return (
      <div className={style.CommentView}>
        <div className={style.CommentContent}>
          <div className={style.Content}>
            <div className={[style.UserInfo, "childcenter"].join(" ")}>
              <div
                className={[style.HeadShot, "childcenter childcontentstart"].join(
                  " "
                )}>
                <div className={style.HeadShotImage}>
                  <img src={this.state.data.headshot} alt="" />
                </div>
              </div>
              <div
                className={[style.UserName, "childcenter childcontentstart"].join(
                  " "
                )}>
                {this.state.data.name}
              </div>
            </div>
            <div className={style.ContentBox}>
              <TextBox
                data={{
                  text:this.state.data.content?this.state.data.content+'':'', /** 需要加''转成string类型，否则是浅拷贝的object */
                  image: this.state.data.img
                }}
              />
            </div>
            <div className={style.ChildComment}>
              <ChildComment
                data={this.state.data.child?this.state.data.child:[]}
              />
            </div>
          </div>
          <div className={style.BottomHandle}>
              <BottomHandle data={this.state.data} onUpdata={this.onUpdataComment}/>
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
