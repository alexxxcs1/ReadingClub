import React, { Component } from 'react'
import style from './NewShare.scss'
import {api} from 'common/app'

import FillShareInfo from './components/FillShareInfo'
import UploadVideo from './components/UploadVideo'
import OtherBookFill from './components/OtherBookFill'
  
export class NewShare extends Component {
constructor(props) {
  super(props);
  this.state = {
    step:0,
    bookdata:null,
    formdata:{
      
    }
  };
  this.refreshProps = this.refreshProps.bind(this);
  this.onStepChange = this.onStepChange.bind(this);
  this.getBookDetail = this.getBookDetail.bind(this);
  this.createArray = this.createArray.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);  
}
refreshProps(props) {
  let bookid  = props.match.params.id;
  
  this.getBookDetail(bookid);
}
onStepChange(type,data){
  Object.assign(this.state.formdata, data);
  this.setState({
    step:Math.min(Math.max(this.state.step + type,0),this.state.bookdata.type==2?3:2),
    formdata:this.state.formdata
  })
}
getBookDetail(id){
  api.getBookDetail(id).then(res=>{
      if (res.code === 200) {
        let _formdata = {
          bookid:res.data.id,
          bookname:res.data.name,
          bookauthor:res.data.author,
          bookcontent:res.data.content,
          bookimage:res.data.img,
        }
        this.setState({
          bookdata:res.data,
          formdata:_formdata,
        })
      }
      
  },err=>{
    console.log(err);
    
  })
}
createArray(){
  if (!this.state.bookdata) return;
  let steparrayOther = [
    <OtherBookFill index={0} onStepChange={this.onStepChange} data={this.state.formdata}/>,
    <FillShareInfo index={1} onStepChange={this.onStepChange} data={this.state.formdata}/>,
    <UploadVideo index={2} onStepChange={this.onStepChange} data={this.state.formdata}/>
  ]
  let steparray = [
    <FillShareInfo index={0} onStepChange={this.onStepChange} data={this.state.formdata}/>,
    <UploadVideo index={1} onStepChange={this.onStepChange} data={this.state.formdata}/>
  ]
  if (this.state.bookdata.type=='2') {
    return steparrayOther[this.state.step]
  }else{
    return steparray[this.state.step]
  }
}
render() {
  return (
    <div className={style.NewShare}>
        {this.createArray()}
    </div>
   )
   }
}
export default NewShare