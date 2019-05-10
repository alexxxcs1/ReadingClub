import React, { Component } from 'react'
import style from './NoticeView.scss'

import processicon1 from 'assets/processicon1.png'
import processicon2 from 'assets/processicon2.png'
import processicon3 from 'assets/processicon3.png'
import processicon4 from 'assets/processicon4.png'
import processicon5 from 'assets/processicon5.png'
  
export class NoticeView extends Component {
constructor(props) {
  super(props);
  this.state = {
      onShow:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleDropBox = this.HandleDropBox.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
HandleDropBox(type){
    if (this.state.onShow == type) {
        this.setState({
            onShow:null,
        })
    }else{
        this.setState({
            onShow:type,
        })
    }
}
render() {
  return (
    <div className={style.ViewBox}>
        <div className={style.NoticeBox}>
            <div className={style.ItemBox}>
                <div className={[style.ItemValue,'childcenter childcontentstart'].join(' ')} onClick={this.HandleDropBox.bind(this,'rule')}>
                    <div className={style.Value}>比赛规则</div>
                    <div className={[style.HandleButton,'childcenter'].join(' ')}> <span>{this.state.onShow == 'rule'?'收起':'展开'}</span><span className={this.state.onShow=='rule'?style.arrowroate:''}></span></div>
                </div>
                <div className={[style.DropBox,this.state.onShow == 'rule'?style.onShow:''].join(' ')}>
                    <div className={style.RuleContent}>
                        <p><span className={style.UnderLine}>参赛时间</span>：2019年5月10日至6月10日</p> 
                        <p><span className={style.UnderLine}>评选方式</span>：人气投票(30%)+有效评论数量及质量(70%)</p> 
                        <p><span className={style.UnderLine}>人气投票</span>：视频上传完成后，可通过转发获得观看者点赞。每个微信ID每天可点赞一次。</p> 
                        <p><span className={style.UnderLine}>线上有效评论</span>：观看者在已上传好的视频后跟帖，字数不少于50字，可以配图进行说明。每个微信ID对同一视频只可评论一次。</p> 
                        <p><span className={style.UnderLine}>奖项设置(7个参赛组，给定6本书+自由上传)</span>：一等奖1名，二等奖2名；三等奖3名</p> 
                        <p><span className={style.UnderLine}>视频参数要求</span>：演说时长小于3分钟，大于1分钟，大小不超过100Mb</p> 
                        <p><span className={style.UnderLine}>其他要求</span>：请在投稿时附上投稿者的单位信息和联系方式，方便工作人员与您联系。</p> 
                        <p><span className={style.UnderLine}>参赛次数</span>：每一个微信ID可参加三次比赛，不限组别</p> 
                    </div>
                </div>
            </div>
            <div className={style.ItemBox}>
                <div className={[style.ItemValue,'childcenter childcontentstart'].join(' ')} onClick={this.HandleDropBox.bind(this,'process')}>
                    <div className={style.Value}>参赛流程</div>
                    <div className={[style.HandleButton,'childcenter'].join(' ')}> <span>{this.state.onShow == 'process'?'收起':'展开'}</span><span className={this.state.onShow=='process'?style.arrowroate:''}></span></div>
                </div>
                <div className={[style.DropBox,this.state.onShow == 'process'?style.onShow:''].join(' ')}>
                    <div className={style.ProcessBox}>
                        <div className={[style.ProcessItem,'childcenter'].join(' ')}>
                            <div className={style.ProcessIcon}>
                                <img src={processicon1} alt=""/>
                            </div>
                            <div className={style.ProcessText}>
                                <p><span className={style.UnderLine}>选择阅读书籍</span></p> 
                                <p>根据参赛页面给定的六本书籍或自由上传您想推荐给同仁的与护理有关书籍；</p> 
                            </div>
                        </div>
                        <div className={[style.ProcessItem,'childcenter'].join(' ')}>
                            <div className={style.ProcessIcon}>
                                <img src={processicon2} alt=""/>
                            </div>
                            <div className={style.ProcessText}>
                                <p><span className={style.UnderLine}>上传文字或图片</span></p> 
                                <p>摘取该书其中一段或章节的文字或者上传书籍内页图片；</p> 
                            </div>
                        </div>
                        <div className={[style.ProcessItem,'childcenter'].join(' ')}>
                            <div className={style.ProcessIcon}>
                                <img src={processicon3} alt=""/>
                            </div>
                            <div className={style.ProcessText}>
                                <p><span className={style.UnderLine}>分享经验</span></p> 
                                <p>分享与所选内容有关的临床宝贵经验，真实案例讨论或护患真情故事，拍摄录制其中任意一个题材的演说视频；</p> 
                            </div>
                        </div>
                        <div className={[style.ProcessItem,'childcenter'].join(' ')}>
                            <div className={style.ProcessIcon}>
                                <img src={processicon4} alt=""/>
                            </div>
                            <div className={style.ProcessText}>
                                <p><span className={style.UnderLine}>相册上传</span></p> 
                                <p>分享视频通过手机录制好后，存在相册里，参与活动时，直接从手机相册上传。上传完成后，可通过分享的方式，获得观看者的点赞及有效评论。</p> 
                            </div>
                        </div>
                        <div className={[style.ProcessItem,'childcenter'].join(' ')}>
                            <div className={style.ProcessIcon}>
                                <img src={processicon5} alt=""/>
                            </div>
                            <div className={style.ProcessText}>
                                <p><span className={style.UnderLine}>评论参与</span></p> 
                                <p>观看者也可通过上传50字以上的有效评论参与活动，我们会从评论中评选出优秀评论，进行评奖奖励。</p> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.ItemBox}>
                <div className={[style.ItemValue,'childcenter childcontentstart'].join(' ')} onClick={this.HandleDropBox.bind(this,'awards')}>
                    <div className={style.Value}>奖项设置</div>
                    <div className={[style.HandleButton,'childcenter'].join(' ')}> <span>{this.state.onShow == 'awards'?'收起':'展开'}</span><span className={this.state.onShow=='awards'?style.arrowroate:''}></span></div>
                </div>
                <div className={[style.DropBox,this.state.onShow == 'awards'?style.onShow:''].join(' ')}>
                    <div className={style.RuleContent}>
                        <p><span className={style.UnderLine}>参赛时间</span>：2019年5月10日至6月12日</p> 
                        <p><span className={style.UnderLine}>评选方式</span>：人气投票(30%)+有效评论数量及质量(70%)</p> 
                        <p><span className={style.UnderLine}>人气投票</span>：视频上传完成后，可通过转发获得观看者点赞。每个微信ID每天可点赞一次。</p> 
                        <p><span className={style.UnderLine}>线上有效评论</span>：观看者在已上传好的视频后跟帖，字数不少于50字，可以配图进行说明。每个微信ID对同一视频只可评论一次。</p> 
                        <p><span className={style.UnderLine}>奖项设置(7个参赛组，给定6本书+自由上传)</span>：一等奖1名，二等奖2名；三等奖3名</p> 
                        <p><span className={style.UnderLine}>视频参数要求</span>：演说时长小于3分钟，大于1分钟，大小不超过100Mb</p> 
                        <p><span className={style.UnderLine}>其他要求</span>：请在投稿时附上投稿者的单位信息和联系方式，方便工作人员与您联系。</p> 
                        <p><span className={style.UnderLine}>参赛次数</span>：每一个微信ID可参加三次比赛，不限组别</p> 
                    </div>
                </div>
            </div>
        </div>
    </div>
   )
   }
}
export default NoticeView