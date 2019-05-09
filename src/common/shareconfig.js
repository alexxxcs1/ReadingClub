import shareicon from 'assets/shareicon.png'
import {api} from 'common/app'

let shareConfig = (url,data) => {
  var share_img =
    "http://wechat.crnonline.cn/readbook/html/static/media/" +
    shareicon.split("/")[shareicon.split("/").length - 1];
  var share_title = "书落实出才是真";
  var share_content = "“5·12”国际护士节主题读书会活动";
  window.wx.onMenuShareAppMessage({
    title: share_title, // 分享标题
    desc: share_content, // 分享描述
    link: url, // 分享链接
    imgUrl: share_img, // 分享图标
    type: "link", // 分享类型,music、video或link，不填默认为link
    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
    success: function() {
      // 用户确认分享后执行的回调函数
      if (data) {
          api.SharePost(data.type,data.id).then(res=>{
              console.log(res);
              
          },err=>{
              console.log(err);
              
          })
      }
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
    }
  });

  window.wx.onMenuShareTimeline({
    title: share_title, // 分享标题
    desc: share_content, // 分享描述
    link: url, // 分享链接
    imgUrl: share_img, // 分享图标
    type: "link", // 分享类型,music、video或link，不填默认为link
    dataUrl: "", // 如果type是music或video，则要提供数据链接，默认为空
    success: function() {
      // 用户确认分享后执行的回调函数
      if (data) {
            api.SharePost(data.type,data.id).then(res=>{
            console.log(res);
            
            },err=>{
                console.log(err);
                
            })
        }
    },
    cancel: function() {
      // 用户取消分享后执行的回调函数
    }
  });
};

export default shareConfig
