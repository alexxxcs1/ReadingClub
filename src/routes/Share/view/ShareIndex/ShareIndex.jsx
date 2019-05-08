import React, { Component } from 'react'
import style from './ShareIndex.scss'
import book from 'assets/book.jpg'
import readbook from 'assets/readbook.gif'
import BottomHandle from './components/BottomHandle'
import {api} from 'common/app'

import TextBox from './components/TextBox'

import doublepointicon from 'assets/doublepointicon.png'
import flowericon from 'assets/flowericon.png'

const data = '《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通过医师和护士合作，共同选择适合患者的输液方式，及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通过医师和护士合作，共同选择适选适合合'
  
export class ShareIndex extends Component {
constructor(props) {
  super(props);
  this.state = {
      id:null,
      shareType:null,
      sharedata:{},
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
  let shareid = props.match.params.id;
  if (shareid == this.state.id) return;
  this.getData(shareid);
  this.state.id = shareid;
  this.setState({
      id:this.state.id,
  })
}
createContent(){
    switch (this.state.sharedata.type) {
        case '1':
            return <TextBox data={this.state.sharedata.content}/>
        case '2':
            return <img className={style.ContentImage} src={this.state.sharedata.content} />
    }
}
getData(id){
    api.getShareDetail(id).then(res=>{
        if (res.code === 200) {
            this.setState({
                sharedata:res.data,
            })    
        }
    },err=>{
        console.log(err);
        
    })
}
render() {
  return (
    <div className={style.ViewBox}>
        {JSON.stringify(this.state.sharedata) === '{}'?
        <div className={[style.LoadingBox,'childcenter'].join(' ')}>
            <img src={readbook} alt=""/>
        </div>
        :<div className={style.ShareInfo} >
            <div className={[style.UserInfo,'childcenter'].join(' ')}>
                <div className={[style.UserHead,'childcenter'].join(' ')}>
                    <div className={[style.HeadShot].join(' ')}>
                        <img src={this.state.sharedata.headimgurl?this.state.sharedata.headimgurl:''} alt=""/>
                    </div>
                </div>
                <div className={[style.UserName,'childcenter childcontentstart'].join(' ')}>
                    {this.state.sharedata.nickname?this.state.sharedata.nickname:''}
                    {this.state.sharedata.uname?'('+this.state.sharedata.uname+')':''}
                </div>
            </div>
            <div className={[style.BookCover,'childcenter'].join(' ')}>
                
                <div className={[style.Content,'childcenter'].join(' ')}>
                    <div className={[style.ShareTips,'childcenter'].join(' ')}>给我们分享了这本书</div>
                    <div className={[style.Cover,'childcenter'].join(' ')}>
                        <div className={[style.ImageBox,'childcenter'].join(' ')}><img src={this.state.sharedata.bookimg?this.state.sharedata.bookimg:''} alt=""/></div>
                    </div>
                    <div className={style.BookName}>
                        {this.state.sharedata.bookname?this.state.sharedata.bookname:''}
                    </div>
                    <div className={style.BookPage}>
                        P{this.state.sharedata.pageNum?this.state.sharedata.pageNum:''}
                    </div>
                </div>
                <img src={doublepointicon} className={style.doublebackground} alt=""/>
                <img src={flowericon} className={style.flowerbackground} alt=""/>
            </div>
            <div className={style.BookShareContent}>
                {this.createContent()}
            </div>
        </div>}
        <BottomHandle data={this.state.sharedata}/>
    </div>
   )
   }
}
export default ShareIndex