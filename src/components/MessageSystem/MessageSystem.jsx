import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import style from './MessageSystem.scss'
  
export class MessageSystem extends Component {
constructor(props) {
  super(props);
  this.state = {};
     this.refreshProps = this.refreshProps.bind(this);
     this.createBox = this.createBox.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
  
}
refreshProps(props) {
//   console.log(props);
}
createBox(props){
    if (props.message==undefined) {
        props.onClose();
        return;
    }else{
        switch (props.type) {
            default:
            case 'message':
                return <MessageBox message={props.message} onClose={props.onClose}/>
            case 'confirm':
                return <ConfirmBox {...props}/>
        }
    }
    
}
render() {
  return (
    <div className={style.FixedBox}>
        {this.createBox(this.props)}
    </div>
   )
   }
}

let destoryTimeout;
class MessageBox extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    componentDidMount(){
        let self = this;
        destoryTimeout = setTimeout(() => {
            self.props.onClose();
        }, 2000);
    }
    componentWillUnmount(){
        this.props.onClose();
    }
    render(){
        return (
            <div className={[style.MessageBox,'childcenter'].join(' ')}>

                <p>{this.props.message}</p>

            </div>
        )
    }
}

class ConfirmBox extends Component{
    constructor(props){
        super(props);
        this.state = {};
    }
    render(){
        return (
            <div className={style.ConfirmBox}>
                {this.props.title?<div className={[style.TitleBox,'childcenter'].join(' ')}>
                    {this.props.title}
                </div>:''}
                <div className={[style.ConfirmMessageBox,'childcenter'].join(' ')}>
                    {this.props.message}
                </div>
                <div className={style.Line}></div>
                <div className={[style.ConfirmButton,'childcenter'].join(' ')}>
                    <span onClick={this.props.onClose}>{this.props.buttontext?this.props.buttontext:'确定'}</span>
                </div>
            </div>
        )
    }
}

function GetView(props){
    return <MessageSystem {...props}/>
}

const View = ({...props})=>{
    return (
        ReactDOM.createPortal(GetView({...props}),document.querySelector('body'))
    )
}
['message','confirm'].forEach(item => {
    View[item] = ({...props})=>{
        let div = document.createElement('div');
        const destroy = () => {
            const unmountResult = ReactDOM.unmountComponentAtNode(div);
            if (unmountResult && div.parentNode) {
                div.parentNode.removeChild(div); 
            }
        }
        const render = () => {
            ReactDOM.render(<View onClose={destroy} {...props} type={item} />, div);
        }
        render();
        return {
            destroy: destroy,
        }
    }
});
// const _ViewFunc = (url)=>{
//     let div = document.createElement('div');
//     const destroy = () => {
//         const unmountResult = ReactDOM.unmountComponentAtNode(div);
//         if (unmountResult && div.parentNode) {
//             div.parentNode.removeChild(div); 
//         }
//     }
//     const render = () => {
//         ReactDOM.render(<View url={url} onClose={destroy}/>, div);
//     }
//     render();
//     return {
//         destroy: destroy,
//     }
// }

export default View