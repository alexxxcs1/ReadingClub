import React, { Component } from 'react'
import style from './Comment.scss'
import CommentItem from './components/CommentItem'
import BottomHandle from './components/BottomHandle'

const CommentData=[
    {
        user:{
            headshot:'https://source.unsplash.com/150x152?panda',
            name:'王二狗'
        },
        content:{
            text:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉，提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗',
            image:null,
        },
        child:[
            {
                username:'李大钊',
                content:'老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒'
            },
            {
                username:'王二狗',
                content:'客气客气'
            },
            {
                username:'李大狗',
                content:'已转'
            }
        ],
    },
    {
        user:{
            headshot:'https://source.unsplash.com/151x150?panda',
            name:'李大狗'
        },
        content:{
            text:'规范护理行为，可以统一不同医院、不同再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉，提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗',
            image:null,
            
        },
        child:[
            {
                username:'李大钊',
                content:'你为什么抄袭二狗老师的论文！'
            },
            {
                username:'李大狗',
                content:'嘘！小声点'
            }
        ],
    },
    {
        user:{
            headshot:'https://source.unsplash.com/153x150?panda',
            name:'张三狗'
        },
        content:{
            text:'提高静脉，提治疗提治疗，提高静脉，提治疗提治疗，提高静脉，提治疗',
            image:'https://source.unsplash.com/153x150?panda',
        },
        child:[
            {
                username:'李大钊',
                content:'你说的啥玩意啊？'
            },
            {
                username:'张三狗',
                content:'咋地，干架啊，我太极拳可不是吃素的'
            },
            {
                username:'李大钊',
                content:'没...大哥没事'
            },
        ],
    }
]
export class Comment extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.createCommentList = this.createCommentList.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  console.log(props);
}
createCommentList(){
    let result = [];
    for (let z = 0; z < CommentData.length; z++) {
        const comment = CommentData[z];
        result.push(
            <CommentItem data={comment}/>
        )
    }
    return result;
}
render() {
  return (
    <div className={style.ViewBox}>
        {this.createCommentList()}
        <BottomHandle />
    </div>
   )
   }
}
export default Comment