import React, { Component } from 'react';
import { HashRouter,Route,Switch} from 'react-router-dom';
import style from './App.scss'
import {api} from 'common/app'

import Home from 'routes/Home'
import Book from 'routes/Book'
import Share from 'routes/Share'
import Comment from 'routes/Comment'
import SelectShare from 'routes/SelectShare'
import IsSubscribe from 'components/IsSubscribe'

import shareconfig from 'common/shareconfig'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      qrcode:null,
      isSubscribe:true,
    }
    this.getIsSubscribe = this.getIsSubscribe.bind(this);
  }
  componentDidMount(){
    this.getIsSubscribe();
    this.setShare();
  }
  getIsSubscribe(){
    api.IsSubscribe().then(res=>{
        if (res.code === 201) {
            this.setState({
                isSubscribe:false,
                qrcode:res.data.scan,
            })
        }else if (res.code === 200) {
          this.setState({
            isSubscribe:true,
          })
        }
    },err=>{
        console.log(err);
    })
  }
  setShare = () => {
    var share_url = window.location.href;
    api.getShare(share_url).then(
      response => {
        window.wx.config({
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
          appId: response.data.config.appId, // 必填，公众号的唯一标识
          timestamp: response.data.config.timestamp, // 必填，生成签名的时间戳
          nonceStr: response.data.config.nonceStr, // 必填，生成签名的随机串
          signature: response.data.config.signature, // 必填，签名，见附录1
          jsApiList: [
            "chooseImage",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "previewImage",
            "uploadImage",
            "checkJsApi",
            "onMenuShareTimeline",
            "onMenuShareAppMessage",
            "hideMenuItems",
            "startRecord",
            "stopRecord",
            "onVoiceRecordEnd",
            "playVoice",
            "pauseVoice",
            "onVoicePlayEnd",
            "uploadVoice",
            "downloadVoice"
          ]
        });
        window.wx.ready(function() {
          shareconfig(window.location.href)
        });
        window.wx.error(function(res) {});
      },
      err => {}
    );
  }
  render() {
    return (
      <div className={style.OutBox} >
        {
        !this.state.isSubscribe?<IsSubscribe qrcode={this.state.qrcode}/>:
        (<HashRouter >
              <Switch>
                  <Route path='/book/:id' component={Book} /> {/* id:书本id */}
                  <Route path='/share/:id' component={Share} /> {/* id:读书笔记id */}
                  <Route path='/comment/:id' component={Comment} /> {/* id:一级评论id */}
                  <Route path='/newshare' component={SelectShare} /> {/* */}
                  {/* 首页 */}
                  <Route path='/' component={Home} />
              </Switch>
        </HashRouter>)
        }
      </div>
    );
  }
}

export default App;
