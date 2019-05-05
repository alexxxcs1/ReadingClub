import React, { Component } from 'react'
import style from './ShareIndex.scss'
import book from 'assets/book.jpg'
import BottomHandle from './components/BottomHandle'

import TextBox from './components/TextBox'

import doublepointicon from 'assets/doublepointicon.png'
import flowericon from 'assets/flowericon.png'

const data = '《肿瘤治疗血管通道安全指南》旨在通过规范化《肿瘤治疗血管通道安全指南》静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程《肿瘤治疗血管通道安全指南》及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，《肿瘤治疗血管通道安全指南》在改善患者生活《肿瘤治疗血管通道安全指南》质量的同时还能《肿瘤治疗血管通道安全指南》降低治疗理行为，《肿瘤治疗血管通道安全指南》可以统一不同医院、不同护理人员的操作习惯，提高护率；再者通过医师和护士合作，共同选择适合患提高静治疗综合水平'
  
export class ShareIndex extends Component {
constructor(props) {
  super(props);
  this.state = {
      id:null,
      shareType:'text',
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createContent = this.createContent.bind(this);
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
createContent(){
    switch (this.state.shareType) {
        default:
        case 'text':
            return <TextBox data={data}/>
        case 'img':
            return <img className={style.ContentImage} src='https://source.unsplash.com/400x800?panda' />
    }
}
render() {
  return (
    <div className={style.ViewBox}>
        <div className={style.ShareInfo}>
            <div className={[style.UserInfo,'childcenter'].join(' ')}>
                <div className={[style.UserHead,'childcenter'].join(' ')}>
                    <div className={[style.HeadShot].join(' ')}>
                        <img src="https://source.unsplash.com/150x150?panda" alt=""/>
                    </div>
                </div>
                <div className={[style.UserName,'childcenter childcontentstart'].join(' ')}>
                    昵称（姓名）
                </div>
            </div>
            <div className={[style.BookCover,'childcenter'].join(' ')}>
                
                <div className={[style.Content,'childcenter'].join(' ')}>
                    <div className={[style.ShareTips,'childcenter'].join(' ')}>给我们分享了这本书</div>
                    <div className={[style.Cover,'childcenter'].join(' ')}>
                        <div className={style.ImageBox}><img src={book} alt=""/></div>
                    </div>
                    <div className={style.BookName}>
                        肿瘤治疗血管通道安全指南肿瘤治疗血管通道安全指南
                    </div>
                    <div className={style.BookPage}>
                        P{Math.round(Math.random() * 100)}
                    </div>
                </div>
                <img src={doublepointicon} className={style.doublebackground} alt=""/>
                <img src={flowericon} className={style.flowerbackground} alt=""/>
            </div>
            <div className={style.BookShareContent}>
                {this.createContent()}
            </div>
        </div>
        <BottomHandle />
    </div>
   )
   }
}
export default ShareIndex