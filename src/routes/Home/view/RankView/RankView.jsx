import React, { Component } from 'react'
import style from './RankView.scss'
import BookList from './components/BookList'
import WaterFall from './components/WaterFall'
import readbook from 'assets/readbook.gif'
import notfoundrank from 'assets/notfoundrank.png'

import {api} from 'common/app'

const DATA = [
  {
    posterurl:'https://source.unsplash.com/'+(Math.round(Math.random()*450+300))+'x'+(Math.round(Math.random()*450+300))+'?panda',
    sharename:'肿瘤专科护理观后感及一点点随笔想法',
    username:'李二狗',
    countcomment:Math.round(Math.random()*1000)
  },
  {
    posterurl:'https://source.unsplash.com/'+(Math.round(Math.random()*450+300))+'x'+(Math.round(Math.random()*450+300))+'?panda',
    sharename:'肿瘤专科护理观后感及一点点随笔想法',
    username:'李二狗',
    countcomment:Math.round(Math.random()*1000)
  },
  {
    posterurl:'https://source.unsplash.com/'+(Math.round(Math.random()*450+300))+'x'+(Math.round(Math.random()*450+300))+'?panda',
    sharename:'肿瘤专科护理观后感及一点点随笔想法',
    username:'李二狗',
    countcomment:Math.round(Math.random()*1000)
  },
  {
    posterurl:'https://source.unsplash.com/'+(Math.round(Math.random()*450+300))+'x'+(Math.round(Math.random()*450+300))+'?panda',
    sharename:'肿瘤专科护理观后感及一点点随笔想法',
    username:'李二狗',
    countcomment:Math.round(Math.random()*1000)
  }
]

export class RankView extends Component {
constructor(props) {
  super(props);
  this.state = {
    selectbook:null,
    RankData:[],
    page:1,
    maxpage:1,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.onBookChange = this.onBookChange.bind(this);
     this.getData = this.getData.bind(this);
     this.pushData = this.pushData.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.getData();
}
refreshProps(props) {
  
}
onBookChange(id){
  if (id==this.state.selectbook) return;
  this.state.page=1;
  this.getData(id);
  this.setState({
    selectbook:id,
    page:this.state.page
  })
}
getData(id){
  let data = [];
  this.setState({
    RankData:[],
    onAjax:true,
  })
  api.getRankList(id,this.state.page,5).then(res=>{
    if (res.code === 200) {
      this.setState({
        page:res.data.page,
        maxpage:res.data.page_count,
        onAjax:false,
        RankData:res.data.list?res.data.list:[],
      })
    }
  },err=>{
    console.log(err);
  })

}
pushData(){
  this.setState({
    onAjax:true,
  })
  api.getRankList(this.state.selectbook,this.state.page+1,5).then(res=>{
    if (res.code === 200) {
      this.state.RankData = this.state.RankData.concat(res.data.list?res.data.list:[]);
      this.setState({
        page:res.data.page,
        maxpage:res.data.page_count,
        RankData:this.state.RankData,
        onAjax:false,
      })
    }
  },err=>{
    console.log(err);
  })
  this.setState({
    RankData:this.state.RankData,
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
      <div className={[style.WaterFallBox,'childcenter childcolumn'].join(' ')}>
        {this.state.selectbook!=null&&this.state.RankData.length<=0? (
          <div className={[style.NotFound,'childcenter childcolumn'].join(' ')}>
            <p>等你带我们开启一本好书</p>
            <p>点击上方“报名成为读书笔记分享者”即刻参赛</p>
            <img src={notfoundrank} className={style.readIcon} alt=""/>
          </div>
        ) :<WaterFall data={this.state.RankData?this.state.RankData:[]}/>}
        {this.state.onAjax&&this.state.RankData.length>0?<div className={[style.LoadingBox,'childcenter'].join(' ')}>加载中...</div>:''}
        {!this.state.onAjax&&this.state.page<this.state.maxpage?<div className={[style.LoadButton,'childcenter'].join(' ')} onClick={this.pushData}>点击加载更多</div>:''}
      </div>
      
    </div>
   )
   }
}
export default RankView