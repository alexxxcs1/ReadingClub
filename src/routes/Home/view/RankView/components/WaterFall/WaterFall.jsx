import React, { Component } from 'react'
import style from './WaterFall.scss'
import commenticon2 from 'assets/commenticon2.png'
import wechaticon from 'assets/wechaticon.png'
  
export class WaterFall extends Component {
constructor(props) {
  super(props);
  this.state = {
      data:[],
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createVideoCard = this.createVideoCard.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  console.log(props.data);
    
  this.setState({
    data:props.data?props.data:this.state.data,
  })
}
createVideoCard(index){
    let result = [];
    for (let z = 0; z < this.state.data.length; z++) {
        let DataObj = this.state.data[z];
        if ((z%2==0)==index) {
            result.push(
                <div className={[style.VideoCard,'childcenter childcolumn'].join(' ')}>
                    <div className={style.PosterBox}>
                        <img src={DataObj.posterurl} alt=""/>
                    </div>
                    <div className={style.InfoBox}>
                        <div className={style.TitleBox}>{DataObj.sharename}</div>
                        <div className={[style.UserBox,'childcenter'].join(' ')}>
                            <div className={[style.UserName,'childcenter childcontentstart'].join(' ')}>
                                <img src={wechaticon} alt=""/>
                                <span>{DataObj.username}</span>
                            </div>
                            <div className={[style.VideoComment,'childcenter childcontentend'].join(' ')}>
                                <img src={commenticon2} alt=""/>
                                <span>{DataObj.countcomment}</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }  
    }
    return result;
}
render() {
  return (
    <div className={[style.WaterFall,'childcenter childalignstart'].join(' ')}>
        <div className={[style.FallRoad,'childcenter childcolumn childcontentstart'].join(' ')}>
            {this.createVideoCard(false)}
        </div>
        <div className={[style.FallRoad,'childcenter childcolumn childcontentstart'].join(' ')}>
            {this.createVideoCard(true)}
        </div>
    </div>
   )
   }
}
export default WaterFall