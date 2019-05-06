import React, { Component } from 'react'
import style from './ChildComment.scss'
  
export class ChildComment extends Component {
constructor(props) {
  super(props);
  this.state = {
      child:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createChildComment = this.createChildComment.bind(this);
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
    for (let z = 0; z < 3; z++) {
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
render() {
  return (
    <div className={[style.ChildComment,this.state.child.length<=0?style.unshow:'','childcenter'].join(' ')}>
        <div className={[style.CommentList,'childcenter childcolumn'].join(' ')}>
            {this.createChildComment(this.state.child)}
        </div>
    </div>
   )
   }
}
export default ChildComment