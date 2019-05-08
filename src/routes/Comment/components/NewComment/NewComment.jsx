import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import style from './NewComment.scss'
import MessageSystem from 'components/MessageSystem'

import {api} from 'common/app'
  
export class NewComment extends Component {
constructor(props) {
  super(props);
  this.state = {
    onAjax:false,
    commentdata:{},
    comment:''
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleClose = this.HandleClose.bind(this);
     this.HandleStateValue = this.HandleStateValue.bind(this);
     this.submitComment = this.submitComment.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
//   MessageSystem.message({
//      message:'回复成功'
//   })
}
refreshProps(props) {
  console.log(props);
  this.state.commentdata = props.data;
  this.setState(this.state);
}
HandleClose(e){
    let type = e.target.getAttribute('data-type');
    if (type=='dangerbody') {
        this.props.onClose();
    }
}
HandleStateValue(e){
    this.setState({
        comment:e.target.value,
    })
}
submitComment(){
    console.log(this.state.comment);
    if (!this.state.comment||this.state.onAjax) return;
    this.setState({
        onAjax:true,
    })
    api.replyComment(this.state.commentdata.id,this.state.comment).then(res=>{
        console.log(res);
        if (res.code === 200) {
            this.props.onUpdate(res.data);
            this.props.onClose();
        }
        MessageSystem.message({
            message:res.msg
        })
        this.setState({
            onAjax:false,
        })
    },err=>{
        console.log(err);
        
    })
}
render() {
  return (
    <div className={style.FixedBox} onClick={this.HandleClose} data-type='dangerbody'>
        <div className={[style.CommentBox,'childcenter'].join(' ')} >
            <div className={[style.ContentBox,'childcenter'].join(' ')} >
                <div className={style.InputBox} >
                    <input type="text" value={this.state.comment} onChange={this.HandleStateValue}/>
                </div>
                <div className={[style.SendButton,'childcenter'].join(' ')} onClick={this.submitComment}>
                    {this.state.onAjax?'发送中..':'评论'}
                </div>
            </div>
        </div>
    </div>
   )
   }
}

function GetView(onClose,data,onUpdate){
    return <NewComment onClose={onClose} data={data} onUpdate={onUpdate}/>
}

const View = ({onClose,data,onUpdate})=>{
    return (
        ReactDOM.createPortal(GetView(onClose,data,onUpdate),document.querySelector('body'))
    )
}

const _ViewFunc = (data,onUpdate)=>{
    let div = document.createElement('div');
    const destroy = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div); 
        }
    }
    const render = () => {
        ReactDOM.render(<View onClose={destroy} data={data} onUpdate={onUpdate}/>, div);
    }
    render();
    return {
        destroy: destroy,
    }
}

export default _ViewFunc