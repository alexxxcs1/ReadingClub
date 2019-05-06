import React, { Component } from 'react'
import style from './ChildComment.scss'
  
export class ChildComment extends Component {
constructor(props) {
  super(props);
  this.state = {
      child:[],
      showall:false,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createChildComment = this.createChildComment.bind(this);
     this.HandleShowall = this.HandleShowall.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.setState({
    child:props.data,
  });
}
createChildComment(comment){
    if (!comment) return;
    let result = [];
    let max = this.state.showall?this.state.child.length:3;
    for (let z = 0; z < max; z++) {
        const commentobj = comment[z];
        if (commentobj) {
            result.push(
                <div className={style.comment}>
                    <span>{commentobj.username}</span> <span>说:</span> <span className={style.childcommentcontent}>{commentobj.content}</span>
                </div>
            )
        }
    }
    return result;
}
HandleShowall(boolean){
  this.setState({
    showall:boolean,
  })
}
render() {
  return (
    <div className={[style.ChildComment,this.state.child.length<=0?style.unshow:'','childcenter childcolumn'].join(' ')}>
        <div className={[style.CommentList,'childcenter childcolumn'].join(' ')}>
            {this.createChildComment(this.state.child)}
        </div>
        {this.state.showall?'':<div className={style.AllCommentButton}>
          <span onClick={this.HandleShowall}>查看所有评论></span>
        </div>}
    </div>
   )
   }
}
export default ChildComment