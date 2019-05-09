import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import style from './ShareBox.scss'


import arrowicon from 'assets/arrowicon.png'
import sharetitle from 'assets/sharetitle.png'
import flowericon2 from 'assets/flowericon2.png'

import shareconfig from 'common/shareconfig'
  
export class ShareBox extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.setShare = this.setShare.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  this.setShare();
}
setShare(){
    shareconfig(this.props.url,this.props.sharedata);
}
refreshProps(props) {
  console.log(props);
}
render() {
  return (
    <div className={[style.FixedBox,'childcenter childcolumn childcontentstart'].join(' ')} >
        <div className={style.ArrowBox}>
            <img src={arrowicon} alt=""/>
        </div>
        <div className={style.ShareBox}>
            <div className={style.TitleImage}>
                <img src={sharetitle} alt=""/>
            </div>
            <div className={[style.TextContent,'childcenter childcolumn childalignstart'].join(' ')}>
                <span>快点击右上角</span>
                <span>发送给好友或分享到朋友圈</span>
                <span>让书本知识带来更多可能</span>
            </div>
            <div className={[style.CloseButton,'childcenter'].join(' ')} onClick={this.props.onClose}>我知道了</div>
            <div className={style.BackgroundImage}>
                <img src={flowericon2} alt=""/>
            </div>
        </div>
    </div>
   )
   }
}

function GetView(url,onClose,sharedata){
    return <ShareBox onClose={onClose} sharedata={sharedata} url={url}/>
}

const View = ({url,onClose,sharedata})=>{
    return (
        ReactDOM.createPortal(GetView(url,onClose,sharedata),document.querySelector('body'))
    )
}

const _ViewFunc = (url,sharedata)=>{
    let div = document.createElement('div');
    const destroy = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div); 
        }
    }
    const render = () => {
        ReactDOM.render(<View url={url} sharedata={sharedata} onClose={destroy}/>, div);
    }
    render();
    return {
        destroy: destroy,
    }
}

export default _ViewFunc