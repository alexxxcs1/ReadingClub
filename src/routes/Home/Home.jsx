import React, { Component } from "react";
import { Route, Switch ,Link ,Redirect} from "react-router-dom";
import style from "./Home.scss";
import PublicTop from './components/PublicTop'

import NoticeView from './view/NoticeView'
import RankView from './view/RankView'
import MeView from './view/MeView'

export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hash:null,
    };
    this.refreshProps = this.refreshProps.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }
  componentDidMount() {
    this.refreshProps(this.props);
  }
  componentWillReceiveProps(nextprops){
    this.refreshProps(nextprops);
  }
  refreshProps(props){
    this.getLocation();
  }
  getLocation(){
    let hash = window.location.hash.split('/')
    hash = hash[hash.length-1];
    this.setState({
      hash:hash,
    })
  }
  render() {
    return (
      <div className={style.Box}>
        <PublicTop />
        <div className={[style.NavBox,'childcenter'].join(' ')}>
          <Link to='notice'><div className={[style.NavButton,this.state.hash == 'notice'?style.act:'','childcenter'].join(' ')}>比赛须知</div></Link>
          <Link to='rank'><div className={[style.NavButton,this.state.hash == 'rank'?style.act:'','childcenter'].join(' ')}>排行榜</div></Link>
          <Link to='me'><div className={[style.NavButton,this.state.hash == 'me'?style.act:'','childcenter'].join(' ')}>我的</div></Link>
        </div>
        <Switch>
                  
            <Route path='/notice' component={NoticeView} />
            <Route path='/rank' component={RankView} />
            <Route path='/me' component={MeView} />
            <Redirect to="/notice" />
        </Switch>
      </div>
    );
  }
}

export default Home;
