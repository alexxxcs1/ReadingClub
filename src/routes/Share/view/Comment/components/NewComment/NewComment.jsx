import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import style from './NewComment.scss'

import flowericon from 'assets/flowericon.png'
import mountainicon from 'assets/mountainicon.png'
import moreflowericon from 'assets/moreflowericon.png'
  
export class NewComment extends Component {
constructor(props) {
  super(props);
  this.state = {
      data:null,
  };
     this.refreshProps = this.refreshProps.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  console.log(props.data);
  this.setState({
      data:props.data?props.data:this.state.data,
  })
}
render() {
  return (
    <div className={style.FixedBox}>
        <div className={style.ContentBox}>
            <div className={[style.TitleBox,'childcenter childcontentstart'].join(' ')}>
                <div className={[style.TitleValue,'childcenter'].join(' ')}>
                    <img src={flowericon} alt=""/>
                    <span>评论TA的读书笔记</span>
                </div>
                <div className={[style.CloseButton,'childcenter childcontentend'].join(' ')}>
                    <span onClick={this.props.onClose}>取消</span>
                </div>
            </div>
            <div className={style.InfoBox}>

            </div>
            <div className={style.Line}></div>
            <div className={style.MyComment}>
                <div className={style.TipsTitle}>我的评论</div>
                <div className={style.CommentBox}>
                    <textarea className={style.textaresbox} rows="10" placeholder='请在此输入您的评论，字数50+才我们才为你发布噢'></textarea>
                    <div className={[style.ImageGroup,'childcenter childcontentstart'].join(' ')}>
                        <div className={[style.ImageBox,'childcenter'].join(' ')}>
                            <div className={style.box}>
                                <img src={'https://source.unsplash.com/500x500?panda'} alt=""/>
                            </div>
                            <span className={style.DeleteButton}></span>
                        </div>
                        <div className={style.NewImageButto}>
                            <img src={mountainicon} alt=""/>
                            <span>插入图片</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.ImageTips}>
                只可以插入一张图片噢，如果有多张图片建议先拼合图片再进行上传
            </div>
            <div className={style.Line}></div>
            <div className={style.SubmitButton}>
                <div className={[style.ButtonValue,'childcenter'].join(' ')}>
                    发布
                </div>
                <img className={style.ButtonBackground} src={moreflowericon} alt=""/>
            </div>
        </div>
    </div>
   )
   }
}

function GetView(data,onClose){
    return <NewComment data={data} onClose={onClose}/>
}

const View = ({data,onClose})=>{
    return (
        ReactDOM.createPortal(GetView(data,onClose),document.querySelector('body'))
    )
}

const _ViewFunc = (userdata)=>{
    let div = document.createElement('div');
    const destroy = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div); 
        }
    }
    const render = () => {
        ReactDOM.render(<View data={userdata} onClose={destroy}/>, div);
    }
    render();
    return {
        destroy: destroy,
    }
}

export default _ViewFunc