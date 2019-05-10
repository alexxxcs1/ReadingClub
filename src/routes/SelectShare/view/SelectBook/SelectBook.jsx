import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import style from './SelectBook.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import readbook from 'assets/readbook.gif'
import MessageSystem from 'components/MessageSystem'
import getIsRegister from 'common/getIsRegister'

import {api} from 'common/app'
  
export class SelectBook extends Component {
constructor(props) {
  super(props);
  this.state = {
      bookdata:[
          
      ]
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createBook = this.createBook.bind(this);
     this.getBookList = this.getBookList.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
  
}
componentDidMount() {
  this.refreshProps(this.props);
  
  this.getBookList();
  getIsRegister(window.location.href);
}
refreshProps(props) {
  
}
getBookList(){
    api.getBookList().then(res=>{
        console.log(res);
        if (res.code === 200) {
            this.setState({
                bookdata:res.data
            })
        }
    },err=>{
        console.log(err);
        
    })
}
createBook(){
    let result = [];
    for (let z = 0; z < this.state.bookdata.length; z++) {
        const bookdata = this.state.bookdata[z];
        result.push(
            <Link to={'/newshare/book/'+bookdata.id}>
                <div className={[style.BookItem,'childcenter'].join(' ')} >
                    <div className={[style.CoverBox,'childcenter'].join(' ')}>
                        <img src={bookdata.img} className={style.Cover} alt=""/>
                    </div>
                    <div className={[style.BookInfo,'childcenter childcolumn childalignstart'].join(' ')}>
                        <div className={style.BookName}>{bookdata.name}</div>
                        {bookdata.author? <div className={style.BookAuthor}>作者： {bookdata.author} </div>:''}
                    </div>
                </div>
            </Link>
        );
    }
    return result;
}
render() {
  return (
    <div className={style.SelectBook}>
        {this.state.bookdata.length>0?<div className={style.ContentBox}>
            <div className={[style.Title,'childcenter childcontentstart'].join(' ')}>
                <img src={flowericon} className={style.TitleFlower} alt=""/>
                <div className={style.TitleValue}>请选择您阅读的书籍</div>
            </div>
            <div className={[style.BookList,'childcenter childcolumn'].join(' ')}>
                {this.createBook()}
            </div>
        </div>:<div className={[style.LoadingBox,'childcenter'].join(' ')}>
            <img src={readbook} alt=""/>
        </div>}
    </div>
   )
   }
}
export default SelectBook