import React, { Component } from 'react'
import style from './SelectBook.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
import MessageSystem from 'components/MessageSystem'
  
export class SelectBook extends Component {
constructor(props) {
  super(props);
  this.state = {
      selected:null,
      bookdata:[
          {
              id:1,
              name:'肿瘤姑息护理实践指导',
              author:'李二狗'
          },
          {
              id:2,
              name:'肿瘤姑息护理实践指导',
              author:'李三狗'
          },
          {
              id:3,
              name:'肿瘤姑息护理实践指导',
              author:'李四狗'
          },
          {
              id:4,
              name:'李氏家族族谱',
              author:'李五狗'
          },
          {
              id:5,
              name:'李氏家族族谱',
              author:'李五狗'
          },
          {
              id:6,
              name:'李氏家族族谱',
              author:'李五狗'
          },
          {
              id:7,
              name:'李氏家族族谱',
              author:'李五狗'
          },
          {
              id:8,
              name:'其他',
            //   author:'李五狗'
          },
      ]
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.selectBook = this.selectBook.bind(this);
     this.createBook = this.createBook.bind(this);
     this.Nextstep = this.Nextstep.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
selectBook(id){
    this.setState({
        selected:id,
    })
}
createBook(){
    let result = [];
    for (let z = 0; z < this.state.bookdata.length; z++) {
        const bookdata = this.state.bookdata[z];
        result.push(
            <div className={[style.BookItem,this.state.selected == bookdata.id?style.Focus:'','childcenter'].join(' ')} onClick={this.selectBook.bind(this,bookdata.id)}>
                <div className={[style.CoverBox,'childcenter'].join(' ')}>
                    <img src={book} className={style.Cover} alt=""/>
                </div>
                <div className={[style.BookInfo,'childcenter childcolumn childalignstart'].join(' ')}>
                    <div className={style.BookName}>{bookdata.name}</div>
                    {bookdata.author? <div className={style.BookAuthor}>作者： {bookdata.author} </div>:''}
                </div>
            </div>
        );
    }
    return result;
}
Nextstep(){
    if (!this.state.selected) {
        MessageSystem.message({
            message:'请先选择一本书！'
        });
        return;
    }
    window.location.hash = '#/newshare/book/'+this.state.selected;
}
render() {
  return (
    <div className={style.SelectBook}>
        <div className={style.ContentBox}>
            <div className={[style.Title,'childcenter childcontentstart'].join(' ')}>
                <img src={flowericon} className={style.TitleFlower} alt=""/>
                <div className={style.TitleValue}>请选择您阅读的书籍</div>
            </div>
            <div className={[style.BookList,'childcenter childcolumn'].join(' ')}>
                {this.createBook()}
            </div>
            <div className={[style.NextButton,'childcenter'].join(' ')} onClick={this.Nextstep}>下一步</div>
        </div>
    </div>
   )
   }
}
export default SelectBook