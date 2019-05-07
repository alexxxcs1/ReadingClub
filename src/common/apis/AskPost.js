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
    return router
  }
  
  export default AskPost