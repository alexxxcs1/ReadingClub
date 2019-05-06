import React, { Component } from "react";
import style from "./Comment.scss";
import TextBox from "./components/TextBox";
import ChildComment from "./components/ChildComment";
import BottomHandle from "./components/BottomHandle";

export class Comment extends Component {
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
  refreshProps(props) {}
  render() {
    return (
      <div className={style.CommentView}>
        <div className={style.CommentContent}>
          <div className={[style.UserInfo, "childcenter"].join(" ")}>
            <div
              className={[style.HeadShot, "childcenter childcontentstart"].join(
                " "
              )}>
              <div className={style.HeadShotImage}>
                <img src={"https://source.unsplash.com/150x150?panda"} alt="" />
              </div>
            </div>
            <div
              className={[style.UserName, "childcenter childcontentstart"].join(
                " "
              )}>
              芬芬（李丽芬）
            </div>
          </div>
          <div className={style.ContentBox}>
            <TextBox
              data={{
                text:
                  "《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通过医师和护士合作，共同选择适合患者的输液方式，及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同再者通过医师和护士合作，共同选择适选适合合",
                image: "https://source.unsplash.com/1500x1500?panda"
              }}
            />
          </div>
          <div className={style.ChildComment}>
            <ChildComment
              data={[
                {
                  username: "李大钊",
                  content:
                    "老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒老师老师你真棒"
                },
                {
                  username: "王二狗",
                  content: "客气客气"
                },
                {
                  username: "李大狗",
                  content: "已转"
                },
                {
                  username: "赵六狗",
                  content: "已转"
                },
                {
                  username: "钱五狗",
                  content: "已转"
                }
              ]}
            />
          </div>
          <div className={style.BottomHandle}>
              <BottomHandle />
          </div>
        </div>
      </div>
    );
  }
}
export default Comment;
