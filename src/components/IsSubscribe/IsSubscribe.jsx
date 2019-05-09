import React, { Component } from 'react'
import style from './IsSubscribe.scss'
import DarkMask from 'components/DarkMask'
import {api} from 'common/app'  
import subscribetips from 'assets/subscribetips.png'
export class IsSubscribe extends Component {
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
    this.state.qrcode = props.qrcode;
    this.setState(this.state);
}
composeQRcode(){

}

render() {
  return (
    <DarkMask>
        <div className={style.Box}>
            <img src={subscribetips} className={style.subimg} alt=""/>
            <img src={this.state.qrcode} className={style.qrcode} alt=""/>
        </div>
    </DarkMask>
   )
   }
}
export default IsSubscribe