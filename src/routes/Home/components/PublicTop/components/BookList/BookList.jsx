import React, { Component } from 'react'
import style from './BookList.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import { Route, Switch ,Link ,Redirect} from "react-router-dom";

const bookdata=[
  {
    url:book,
    id:0,
  },
  {
    url:book,
    id:1,
  },
  {
    url:book,
    id:2,
  },
  {
    url:book,
    id:3,
  },
  {
    url:book,
    id:4,
  },
  {
    url:book,
    id:5,
  },
  {
    url:book,
    id:6,
  },
];
  
export class BookList extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.createBook = this.createBook.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
createBook(){
  let result = [];
  for (let z = 0; z < bookdata.length; z++) {
    const book = bookdata[z];
    result.push(
        <div className={style.Book} onClick={()=>{window.location.hash = '#/book/'+book.id}}>
            <img src={book.url}/>
        </div>
    )
  }
  return result;
}
render() {
  return (
    <div className={[style.BookList,'childcenter childcolumn'].join(' ')}>
      <div className={style.TitleBox} style={{'--data-icon':'url('+flowericon+')'}}>
        参与的书籍
      </div>
      <div className={style.TipsContent}>
        精选6本书籍为蓝本
      </div>
      <div className={[style.BookList,'childcenter childcontentstart'].join(' ')}>
        <div className={[style.BookScroll,'childcenter childcontentstart'].join(' ')}>
          {this.createBook()}
        </div>
      </div>
      <Link to={'/newshare/select'}><div className={[style.SignUpButton,'childcenter'].join(' ')}>报名成为读书笔记分享者</div></Link>
      <div className={style.TimeTips}>截止时间：2019年6月10日</div>
    </div>
   )
   }
}
export default BookList