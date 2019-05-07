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
  this.state = {
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
}
refreshProps(props) {
  
}
HandleSelect(id){
  this.props.onChnage(id);
  this.setState({
    select:id
  })
}
createBook(){
  let result = [];
  for (let z = 0; z < bookdata.length; z++) {
    const book = bookdata[z];
    result.push(
        <div className={[style.BookOut,book.id==this.state.select?style.FocusBottom:'','childcenter'].join(' ')}>
          <div className={[style.Book,book.id==this.state.select?style.Selected:''].join(' ')} onClick={this.HandleSelect.bind(this,book.id)}>
              <img src={book.url}/>
          </div>
        </div>
    )
  }
  return result;
}
render() {
  return (
    <div className={[style.BookList,'childcenter childcolumn'].join(' ')}>
      <div className={[style.List,'childcenter childcontentstart'].join(' ')}>
        <div className={[style.BookScroll,'childcenter childcontentstart'].join(' ')}>
          {this.createBook()}
        </div>
      </div>
    </div>
   )
   }
}
export default BookList