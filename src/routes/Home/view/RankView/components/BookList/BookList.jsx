import React, { Component } from 'react'
import style from './BookList.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import readbook from 'assets/readbook.gif'
import { Route, Switch ,Link ,Redirect} from "react-router-dom";
import {api} from 'common/app'
  
export class BookList extends Component {
constructor(props) {
  super(props);
  this.state = {
    bookdata:[],
    select:0,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createBook = this.createBook.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.props.onChnage(this.state.select);
  this.refreshProps(this.props);
  this.getData();
}
refreshProps(props) {
  
}
HandleSelect(id){
  this.props.onChnage(id);
  this.setState({
    select:id
  })
}
getData(){
  api.getBookList().then(res=>{
    if (res.code === 200) {
      this.state.bookdata = res.data;
      this.props.onChnage(res.data[0].id);
      this.setState({
        select:res.data[0].id,
        bookdata:this.state.bookdata,
      })
    }
  },err=>{
    console.log(err);
    
  })
}
createBook(){
  let result = [];
  for (let z = 0; z < this.state.bookdata.length; z++) {
    const book = this.state.bookdata[z];
    result.push(
        <div className={[style.BookOut,book.id==this.state.select?style.FocusBottom:'','childcenter'].join(' ')}>
          <div className={[style.Book,book.id==this.state.select?style.Selected:''].join(' ')} onClick={this.HandleSelect.bind(this,book.id)}>
              <img src={book.img}/>
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
      {this.state.bookdata.length<=0?<div className={[style.LoadingBox,'childcenter'].join(' ')}><img src={readbook} alt=""/></div>:
      <div className={[style.BookScroll,'childcenter childcontentstart'].join(' ')}>
          {this.createBook()}
        </div>
      }
      </div>
    </div>
   )
   }
}
export default BookList