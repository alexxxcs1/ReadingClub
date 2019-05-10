import React, { Component } from 'react'
import style from './BookList.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import readbook from 'assets/readbook.gif'
import { Route, Switch ,Link ,Redirect} from "react-router-dom";
import {api} from 'common/app'


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
  this.state = {
    bookdata:[],
    select:0,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createBook = this.createBook.bind(this);
     this.getData = this.getData.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.props.onChnage(this.state.bookdata[this.state.select]);
  this.refreshProps(this.props);
  this.getData();
}
refreshProps(props) {
  
}
getData(){
  api.getMyShare().then(res=>{
    console.log(res);
    if (res.code === 200) {
      this.state.bookdata = res.data?res.data:this.state.bookdata;
      this.props.onChnage(res.data[0]);
      this.setState({
        select:res.data[0]?res.data[0].id:this.state.select,
        bookdata:this.state.bookdata,
      })
    }
  },err=>{
    console.log(err);
    
  })
}
HandleSelect(index){
  let book = this.state.bookdata[index];
  this.props.onChnage(book);
  this.setState({
    select:book.id
  })
}
createBook(){
  let result = [];
  for (let z = 0; z < this.state.bookdata.length; z++) {
    const book = this.state.bookdata[z];
    result.push(
        <div className={[style.BookOut,book.id==this.state.select?style.FocusBottom:'','childcenter'].join(' ')}>
          <div className={[style.Book,book.id==this.state.select?style.Selected:''].join(' ')} onClick={this.HandleSelect.bind(this,z)}>
              <img src={book.bookimg}/>
          </div>
        </div>
    )
  }
  return result;
}
componentWillUnmount(){//注销异步操作导致的错误导致的内存泄漏
  this.setState = (state, callback) => {
    return
  }
}
render() {
  return (
    <div className={[style.BookList,'childcenter childcolumn'].join(' ')}>
      <div className={[style.List,'childcenter childcontentstart'].join(' ')}>
      {this.state.bookdata.length<=0? (
        <div className={[style.NotFound,'childcenter childcolumn'].join(' ')}>
          <p>等你带我们开启一本好书</p>
          <p>点击上方“报名成为读书笔记分享者”即刻参赛</p>
          <img src={readbook} className={style.readIcon} alt=""/>
        </div>
      ) :<div className={[style.BookScroll,'childcenter childcontentstart'].join(' ')}>
          {this.createBook()}
        </div>}
      </div>
    </div>
   )
   }
}
export default BookList