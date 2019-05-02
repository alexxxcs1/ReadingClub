import React, { Component } from 'react'
import style from './GuestVideo.scss'
import flowericon from 'assets/flowericon.png'
import SlideBox from 'components/SlideBox'
import VideoBox from './components/VideoBox'
import KV from 'assets/KV.png'

const MockVideo = [
  {
    url:'http://file.crnonline.cn/catheter_155330946040',
    kv:KV,
    id:'1',
  },
  {
    url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    kv:KV,
    id:'2',
  },
  {
    url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    kv:KV,
    id:'3',
  },
  {
    url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    kv:KV,
    id:'4',
  },
  {
    url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    kv:KV,
    id:'5',
  },
  {
    url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    kv:KV,
    id:'6',
  },
  {
    url:'http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4',
    kv:KV,
    id:'7',
  }
]

export class GuestVideo extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.createVideo = this.createVideo.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
createVideo(){
  let result = [];
  for (let z = 0; z < MockVideo.length; z++) {
    const video = MockVideo[z];
    result.push(<VideoBox key={'video'+z} data={video}/>)
  }
  return result;
}
render() {
  return (
    <div className={[style.GuestVideo,'childcenter childcolumn'].join(' ')}>
      <div className={style.TitleBox} style={{'--data-icon':'url('+flowericon+')'}}>
        大咖观察团
      </div>
      <div className={style.TipsContent}>
        看看行业大咖为我们加油打气
      </div>
      <div className={style.VideoList}>
        <SlideBox boxwidth={312}>
          {this.createVideo()}
        </SlideBox>
      </div>
    </div>
   )
   }
}
export default GuestVideo