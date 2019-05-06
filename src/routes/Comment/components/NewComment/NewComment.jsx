import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import style from './NewComment.scss'
import MessageSystem from 'components/MessageSystem'
  
export class NewComment extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.HandleClose = this.HandleClose.bind(this);
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
  
}
HandleClose(e){
    let type = e.target.getAttribute('data-type');
    if (type=='dangerbody') {
        this.props.onClose();
    }
}
render() {
  return (
    <div className={style.FixedBox} onClick={this.HandleClose} data-type='dangerbody'>
        <div className={[style.CommentBox,'childcenter'].join(' ')} >
            <div className={[style.ContentBox,'childcenter'].join(' ')} >
                <div className={style.InputBox} >
                    <input type="text"/>
                </div>
                <div className={[style.SendButton,'childcenter'].join(' ')} >
                    评论
                </div>
            </div>
        </div>
    </div>
   )
   }
}

function GetView(onClose){
    return <NewComment onClose={onClose} />
}

const View = ({onClose})=>{
    return (
        ReactDOM.createPortal(GetView(onClose),document.querySelector('body'))
    )
}

const _ViewFunc = ()=>{
    let div = document.createElement('div');
    const destroy = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div); 
        }
    }
    const render = () => {
        ReactDOM.render(<View onClose={destroy}/>, div);
    }
    render();
    return {
        destroy: destroy,
    }
}

export default _ViewFunc