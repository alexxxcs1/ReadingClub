import React, { Component } from 'react'
import style from './CommentItem.scss'

import TextBox from '../TextBox'

const data={
    content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉，提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗'
}
  
export class CommentItem extends Component {
constructor(props) {
  super(props);
  this.state = {
      data:null
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
      data:props.data,
  })
}
createChildComment(comment){
    if (!comment) return;
    let result = [];
    for (let z = 0; z < comment.length; z++) {
        const commentobj = comment[z];
        result.push(
            <div className={style.comment}>
                <span>{commentobj.username}</span> <span>说:</span> <span className={style.childcommentcontent}>{commentobj.content}</span>
            </div>
        )
    }
    return result;
}
render() {
  return (
    <div className={style.CommentItem}>
        {this.state.data?[
            <div className={[style.UserInfo,'childcenter'].join(' ')}>
                <div className={[style.HeadShot,'childcenter childcontentstart'].join(' ')}>
                    <div className={style.HeadShotBox}>
                        <img src={this.state.data.user.headshot} alt=""/>
                    </div>
                </div>
                <div className={[style.UserName,'childcenter childcontentstart'].join(' ')}>
                    {this.state.data.user.name}
                </div>
            </div>,
            <div className={style.CommentContent}>
                <TextBox data={this.state.data.content}/>
            </div>,
            <div className={[style.ChildComment,this.state.data.child.length<=0?style.unshow:'','childcenter'].join(' ')}>
                <div className={[style.CommentList,'childcenter childcolumn'].join(' ')}>
                    {this.createChildComment(this.state.data.child)}
                </div>
            </div>
        ]:''}
    </div>
   )
   }
}
export default CommentItem