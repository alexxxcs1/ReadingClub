import React, { Component } from 'react'
import style from './RankView.scss'
import BookList from './components/BookList'
import WaterFall from './components/WaterFall'

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
  this.setState({
    selectbook:id,
  })
}
getData(){
  let data = [];
  for (let z = 0; z < 10; z++) {
    data.push(
      {
        posterurl:'https://source.unsplash.com/'+(Math.round(Math.random()*450+300))+'x'+(Math.round(Math.random()*450+300))+'?panda',
        sharename:'肿瘤专科护理观后感及一点点随笔想法',
        username:'李二狗',
        countcomment:Math.round(Math.random()*1000)
      },
    );
  }
  this.setState({
    RankData:data,
  })
}
pushData(){
  for (let z = 0; z < 10; z++) {
    this.state.RankData.push(
      {
        posterurl:'https://source.unsplash.com/'+(Math.round(Math.random()*450+300))+'x'+(Math.round(Math.random()*450+300))+'?panda',
        sharename:'肿瘤专科护理观后感及一点点随笔想法',
        username:'李二狗',
        countcomment:Math.round(Math.random()*1000)
      },
    );
  }
  this.setState({
    RankData:this.state.RankData,
  })
}
render() {
  return (
    <div className={style.ViewBox}>
      <BookList onChnage={this.onBookChange}/>
      <div className={[style.WaterFallBox,'childcenter childcolumn'].join(' ')}>
        <WaterFall data={this.state.RankData}/>
        <div className={[style.LoadButton,'childcenter'].join(' ')} onClick={this.pushData}>点击加载更多</div>
      </div>
      
    </div>
   )
   }
}
export default RankView