import qs from 'qs';
const AskPost = (ajaxinstance) => {
    const router = {}
    router.getBookAndVideo = () => {
        return ajaxinstance.post('readbook/index');
    }
    router.getBookDetail = (id) => {
        return ajaxinstance.post('readbook/bookdetails',qs.stringify({
          id
      }));
    }
    router.getBookList = () => {
      return ajaxinstance.post('readbook/booklist');
    }
    router.uploadFile = (formdata,progress) => {
      return ajaxinstance.post('readbook/uploadqiniu',formdata,{
        onUploadProgress: progressEvent => {
          if (progress) {
            progress(progressEvent)
          }
        }
      });
    }
    router.SubmitBookShare = (data) => {
      return ajaxinstance.post('/readbook/addbooknotes',qs.stringify({
        ...data
      }));
      
    }
    router.getShareDetail = (id) => {
      return ajaxinstance.post('readbook/notesdetails',qs.stringify({
        id
      }));
    }
    router.getShareDetail_Video = (id) => {
      return ajaxinstance.post('readbook/getnotesvideo',qs.stringify({
        id
      }))
    };
    router.setShareLike = (nid) => {
      return ajaxinstance.post('readbook/noteslike',qs.stringify({
        nid
      }))
    };
    router.getCommentList = (nid,page,pageNum) => {
      return ajaxinstance.post('readbook/commentlist',qs.stringify({
        nid,page,pageNum
      }))
    };  
    router.CommentToShare = (nid,content,img) => {
      return ajaxinstance.post('readbook/setcomment',qs.stringify({
        nid,content,img
      }))
    };  
    router.getCommentDetail = (id) => {
      return ajaxinstance.post('readbook/getcomment',qs.stringify({
        id
      }))
    };  
    router.setCommentLike = (cid) => {
      return ajaxinstance.post('readbook/commentlike',qs.stringify({
        cid
      }))
    };
    router.replyComment = (id,content) => {
      return ajaxinstance.post('readbook/replycomment',qs.stringify({
        id,content
      }))
    };
    router.getWechatAuth = (url) => {
      return ajaxinstance.post('readbook/weixin',qs.stringify({
        url
      }))
    };
    router.getRankList = (bookid,page,pageNum) => {
      return ajaxinstance.post('readbook/rankingList',qs.stringify({
        bookid,page,pageNum
      }))
    };
    router.getMyShare = () => {
      return ajaxinstance.post('readbook/myNotes');
    }
    router.IsSubscribe = () => {
      return ajaxinstance.post('readbook/is_subscribe');
    }
    router.getShare = (url) => {
      return ajaxinstance.post('readbook/getConfig',qs.stringify({
        url
      }));
    }
    router.SharePost = (type,id) => {
      return ajaxinstance.post('readbook/setshare',qs.stringify({
        type,id
      }));
    }
    router.isRegister = (url) => {
      return ajaxinstance.post('readbook/is_register',qs.stringify({
        url
      }));
    }
    
    
    
    return router
  }
  
  export default AskPost