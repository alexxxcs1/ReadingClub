import React, { Component } from 'react'
import style from './TextBox.scss'
import mountainicon from 'assets/mountainicon.png'
import LongImageView from 'components/LongImageView'
  
export class TextBox extends Component {
constructor(props) {
  super(props);
  this.state = {
      data:null,
      hideall:true,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.createTextContent = this.createTextContent.bind(this);
     this.HandleHideAll = this.HandleHideAll.bind(this);
     this.ShowImage = this.ShowImage.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  this.setState({
    data:props.data.text,
    image:props.data.image
  });
}
HandleHideAll(boolean){
    this.setState({
        hideall:boolean,
    })
}
ShowImage(){
  if (!this.state.image) return;
  LongImageView(this.state.image);
}
createTextContent(){
    if (this.state.data===null) return;
    const maxlength = 150;
    switch (this.state.hideall) {
        case true:
            if (this.state.data.length<maxlength) {
              return this.state.image?[
                this.state.data,
                <div className={[style.HandleGroup,'childcenter childcontentstart'].join(' ')} >
                  <div className={[style.ImageButton,'childcenter childcontentstart'].join(' ')} onClick={this.ShowImage}>
                    <span data-safebody='true'><img src={mountainicon} className={style.commentimages} alt="" data-safebody='true'/>评论配图</span>
                  </div>
                </div>
              ]:this.state.data;
            }else{
                return [
                this.state.data.slice(0,maxlength),
                '...',
                <div className={[style.HandleGroup,'childcenter childcontentstart'].join(' ')} >
                  {this.state.image?
                  <div className={[style.ImageButton,'childcenter childcontentstart'].join(' ')} onClick={this.ShowImage}>
                    <span data-safebody='true'><img src={mountainicon} className={style.commentimages} alt="" data-safebody='true'/>评论配图</span>
                  </div>:''}
                  <div className={[style.ShowallButton,'childcenter childcontentend'].join(' ')}>
                    <span onClick={this.HandleHideAll.bind(this,false)} data-safebody='true'>(展开)</span>
                  </div>
                </div>
                ];
            }
        default:
        case false:
            return this.state.image?[
              this.state.data,
              <div className={[style.HandleGroup,'childcenter childcontentstart'].join(' ')} >
                <div className={[style.ImageButton,'childcenter childcontentstart'].join(' ')} onClick={this.ShowImage}>
                  <span data-safebody='true'><img src={mountainicon} className={style.commentimages} alt="" data-safebody='true'/>评论配图</span>
                </div>
              </div>
            ]:this.state.data;
    }
}
render() {
  return (
    <div className={[style.TextBox,this.state.hideall?'':style.showall].join(' ')}>
        {this.createTextContent()}
    </div>
   )
   }
}
export default TextBox