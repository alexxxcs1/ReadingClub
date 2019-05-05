import React, { Component } from 'react'
import ReactDOM from 'react-dom';
import style from './LongImageView.scss'

const requireContext = require.context("./imgs", true, /^\.\/.*\.jpg$/);
const images = requireContext.keys().map(requireContext);

let startPos;
let speed = 0;
export class LongImageView extends Component {
constructor(props) {
  super(props);
  this.state = {
    url:'',
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
  this.setState({
      url:props.url,
  })
}
render() {
  return (
    <div className={style.FixedBox}>
        <div className={style.LongImageBox} ref='scrollbox'>
            <div className={style.OutBox}>
                <img src={this.state.url} alt=""/>
            </div>
        </div>
        <div className={style.CloseButton} onClick={this.props.onClose}></div>
    </div >
   )
   }
}

function GetView(url,onClose){
    return <LongImageView onClose={onClose} url={url}/>
}

const View = ({url,onClose})=>{
    return (
        ReactDOM.createPortal(GetView(url,onClose),document.querySelector('body'))
    )
}

const _ViewFunc = (url)=>{
    let div = document.createElement('div');
    const destroy = () => {
        const unmountResult = ReactDOM.unmountComponentAtNode(div);
        if (unmountResult && div.parentNode) {
            div.parentNode.removeChild(div); 
        }
    }
    const render = () => {
        ReactDOM.render(<View url={url} onClose={destroy}/>, div);
    }
    render();
    return {
        destroy: destroy,
    }
}

export default _ViewFunc