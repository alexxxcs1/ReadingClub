import React, { Component } from 'react'
import style from './SlideBox.scss'
  
let touchstarPos = [0,0];
export class SlideBox extends Component {
constructor(props) {
  super(props);
  this.state = {
      index:0,
      slideratio:0.8,
      pos_shift:[0,0],
      press:false,
  };
     this.refreshProps = this.refreshProps.bind(this);
     this.wrapChild = this.wrapChild.bind(this);
     this.onTouch = this.onTouch.bind(this);
}
componentWillReceiveProps(nextprops) {
  this.refreshProps(nextprops);
}
componentDidMount() {
  this.refreshProps(this.props);
}
refreshProps(props) {
  
}
wrapChild() {
    if (!this.props.children||this.props.children.length == 0) return;
    var cont = this;
    let itemNodes = [];
    React.Children.forEach(this.props.children,function(itemBase, index) {
        let _component = React.cloneElement(itemBase, 
            {
                onFocus:cont.state.index == index? true:false,
            }
          );
        itemNodes.push(
            <div key={'item'+index} className={[style.ChildBox,'childcenter childcolumn'].join(' ')}>
                {_component}
            </div>
        );
    });
    return itemNodes;
}
onTouch(type,e){
    switch (type) {
        case 'start':
            touchstarPos = [e.touches[0].clientX, e.touches[0].clientY];
            this.setState({
                press:true,
            })
            break;
        case 'move':
            
            this.setState({
                pos_shift:[
                    (e.touches[0].clientX - touchstarPos[0])*this.state.slideratio,
                    (e.touches[0].clientY - touchstarPos[1])*this.state.slideratio,
                ],
                press: true
            })
            break;
        case 'end':
            switch (true) {
                case this.state.pos_shift[0] > 20:
                    this.state.index = Math.min(Math.max(this.state.index-1,0),this.props.children.length-1); 
                    break;
                case this.state.pos_shift[0] < -20:
                    this.state.index = Math.min(Math.max(this.state.index+1,0),this.props.children.length-1); 
                    break;
            }
            this.setState({
                pos_shift: [0, 0],
                press: false,
                index:this.state.index
            })
            break;
    }
}
render() {
  return (
    <div className={style.SlideBox} 
        onTouchStart={this.onTouch.bind(this,'start')}
        onTouchMove={this.onTouch.bind(this,'move')}
        onTouchEnd={this.onTouch.bind(this,'end')}
        ref='listenbox'
    >
        <div className={[style.WarpBox,this.state.press ? "" : style.unpress,'childcenter'].join(' ')} 
         ref='warpbox'
         style={{
             transform:'translateX(calc('+(-(this.state.index * (100/this.props.children.length)-((100/this.props.children.length)/2)))+'% + '+this.state.pos_shift[0]+'px))'
         }}>
            {this.wrapChild()}
        </div>
    </div>
   )
   }
}
export default SlideBox