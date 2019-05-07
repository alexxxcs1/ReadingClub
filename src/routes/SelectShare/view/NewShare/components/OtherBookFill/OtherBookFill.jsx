import React, { Component } from 'react'
import style from './OtherBookFill.scss'
import flowericon from 'assets/flowericon.png'
import book from 'assets/book.jpg'
  
export class OtherBookFill extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
render() {
  return (
    <div className={style.ContentBox}>
        <div className={[style.Title,'childcenter childcontentstart'].join(' ')}>
            <img src={flowericon} className={style.TitleFlower} alt=""/>
            <div className={style.TitleValue}>请填写书籍基本信息</div>
        </div>
        <div className={style.InputBox}>
            <div className={style.Inputs}>
                <input type="text" placeholder='请输入书籍名称'/>
            </div>
        </div>
        <div className={style.InputBox}>
            <div className={style.Inputs}>
                <input type="text" placeholder='请输入作者姓名'/>
            </div>
        </div>
        <div className={style.TextAreadBox}>
            <div className={style.Textareas}>
                <textarea type="text" placeholder='内容简介，不超过300字'/>
            </div>
        </div>
        <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
            <div className={[style.NextButton,'childcenter'].join(' ')} onClick={this.Nextstep}>下一步</div>
        </div>
    </div>
   )
   }
}
export default OtherBookFill