import React, { Component } from 'react';
import { Link} from 'react-router-dom';
import style from './Book.scss';
import book from 'assets/book.jpg'
import flowericon from 'assets/flowericon.png'
import {api} from 'common/app'
import shareconfig from 'common/shareconfig'

import readbook from 'assets/readbook.gif'
    
export class Book extends Component {
constructor(props) {
   super(props);
   this.state = {
        bookid:null,
        bookdata:null,
   };
   this.refreshProps = this.refreshProps.bind(this);
   this.createBookContent = this.createBookContent.bind(this);
   this.getBookData = this.getBookData.bind(this);
}
componentWillReceiveProps(nextprops) {
   this.refreshProps(nextprops);
}
componentDidMount() {
   this.refreshProps(this.props);
   shareconfig(window.location.origin + '' + window.location.pathname);
}
refreshProps(props) {
    this.setState({
        bookid:props.match.params.id
    });
    this.getBookData(props.match.params.id);
}
getBookData(id){
    api.getBookDetail(id).then(res=>{
        console.log(res);
        if (res.code===200) {
            this.setState({
                bookdata:res.data
            })
        }
    },err=>{
        console.log(err);
        
    })
}
createBookContent(){
    if (this.state.bookdata) {
        let bookdata = this.state.bookdata;
        console.log(bookdata);
        return (
            [<div className={[style.BookInfoTitle,'childcenter'].join(' ')}>
                    <div className={[style.BookCoverBox,'childcenter'].join(' ')}>
                        <div className={style.Cover}>
                            <img src={bookdata.img} alt=""/>
                        </div>
                    </div>
                    <div className={[style.InfoContent,'childcenter childcolumn childalignstart childcontentstart'].join(' ')}>
                        <div className={style.BookName}>{bookdata.name}</div>
                        <div className={style.BookAuthor}>作者： {bookdata.author} </div>
                    </div>
                    <div className={style.RankButton}><span>查看该组排行榜单></span></div>
            </div>,
            <div className={style.BookIntroduce}>
                    <div className={[style.IntroduceTitle,'childcenter childcontentstart'].join(' ')}>
                        <img src={flowericon} alt=""/>
                        <span>书籍介绍</span>
                    </div>
                    <div className={style.Content}>
                        {bookdata.content}
                    </div>
                    <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
                        <Link to={'/newshare/book/'+bookdata.id}><div className={[style.Button,'childcenter'].join(' ')}>分享心得</div></Link>
                        <a href={bookdata.buy_address}><div className={[style.Button,'childcenter'].join(' ')} >购买书籍</div></a> 
                    </div>
            </div>]
        )
    }
}
render() {
   return (
   <div className={style.BookView}>
       {this.state.bookdata?this.createBookContent(): <div className={[style.Loading,'childcenter'].join(' ')}><img src={readbook}/></div> }
   </div>
   );
}
}
export default Book;