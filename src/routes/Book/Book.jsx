import React, { Component } from 'react';
import style from './Book.scss';
import book from 'assets/book.jpg'
import flowericon from 'assets/flowericon.png'
    
const bookdata = [
    {
        name:'肿瘤治疗血管通道安全指南0',
        cover:book,
        author:'徐波 耿翠芝  陆箴琦',
        content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。'
    },
    {
        name:'肿瘤治疗血管通道安全指南1',
        cover:book,
        author:'徐波 耿翠芝  陆箴琦',
        content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。'
    },
    {
        name:'肿瘤治疗血管通道安全指南2',
        cover:book,
        author:'徐波 耿翠芝  陆箴琦',
        content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。'
    },
    {
        name:'肿瘤治疗血管通道安全指南3',
        cover:book,
        author:'徐波 耿翠芝  陆箴琦',
        content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。'
    },
    {
        name:'肿瘤治疗血管通道安全指南4',
        cover:book,
        author:'徐波 耿翠芝  陆箴琦',
        content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。'
    },
    {
        name:'肿瘤治疗血管通道安全指南5',
        cover:book,
        author:'徐波 耿翠芝  陆箴琦',
        content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。'
    },
    {
        name:'肿瘤治疗血管通道安全指南6',
        cover:book,
        author:'徐波 耿翠芝  陆箴琦',
        content:'《肿瘤治疗血管通道安全指南》旨在通过规范化静脉治疗过程及操作步骤，使得患者、护理人员、治疗过程及水平达到多方面的收获。例如：减少反复穿刺，能够基本杜绝静脉炎的发生，在改善患者生活质量的同时还能降低治疗总费用；其次，通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。通过规范护理行为，可以统一不同医院、不同护理人员的操作习惯，提高护理人员知识技能、加快输液速度、降低静疗总时间、提高工作效率；再者通过医师和护士合作，共同选择适合患者的输液方式，提高静脉治疗综合水平。'
    },
];

export class Book extends Component {
constructor(props) {
   super(props);
   this.state = {
        bookid:null,
   };
   this.refreshProps = this.refreshProps.bind(this);
   this.createBookContent = this.createBookContent.bind(this);
}
componentWillReceiveProps(nextprops) {
   this.refreshProps(nextprops);
}
componentDidMount() {
   this.refreshProps(this.props);
}
refreshProps(props) {
    this.setState({
        bookid:props.match.params.id
    })
}
createBookContent(){
    let num = parseInt(this.state.bookid);
    if (!isNaN(this.state.bookid)&&num>=0&&num<bookdata.length) {
        return [
            <div className={[style.BookInfoTitle,'childcenter'].join(' ')}>
                    <div className={[style.BookCoverBox,'childcenter'].join(' ')}>
                        <div className={style.Cover}>
                            <img src={bookdata[num].cover} alt=""/>
                        </div>
                    </div>
                    <div className={[style.InfoContent,'childcenter childcolumn childalignstart childcontentstart'].join(' ')}>
                        <div className={style.BookName}>{bookdata[num].name}</div>
                        <div className={style.BookAuthor}>作者： {bookdata[num].author} </div>
                    </div>
                    <div className={style.RankButton}><span>查看该组排行榜单 ></span></div>
            </div>,
            <div className={style.BookIntroduce}>
                    <div className={[style.IntroduceTitle,'childcenter childcontentstart'].join(' ')}>
                        <img src={flowericon} alt=""/>
                        <span>书籍介绍</span>
                    </div>
                    <div className={style.Content}>
                        {bookdata[num].content}
                    </div>
                    <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
                        <div className={[style.Button,'childcenter'].join(' ')}>分享心得</div>
                        <div className={[style.Button,'childcenter'].join(' ')}>购买书籍</div>
                    </div>
            </div>
        ]
    }else{
        return [
            <div className={[style.BookInfoTitle,'childcenter'].join(' ')}>
                    <div className={[style.BookCoverBox,'childcenter'].join(' ')}>
                        <div className={style.Cover}>
                            <img src={bookdata[0].cover} alt=""/>
                        </div>
                    </div>
                    <div className={[style.InfoContent,'childcenter childcolumn childalignstart childcontentstart'].join(' ')}>
                        <div className={style.BookName}>{bookdata[0].name}</div>
                        <div className={style.BookAuthor}>作者： {bookdata[0].author} </div>
                    </div>
                    <div className={style.RankButton}><span>查看该组排行榜单 ></span></div>
            </div>,
            <div className={style.BookIntroduce}>
                    <div className={[style.IntroduceTitle,'childcenter childcontentstart'].join(' ')}>
                        <img src={flowericon} alt=""/>
                        <span>书籍介绍</span>
                    </div>
                    <div className={style.Content}>
                        {bookdata[0].content}
                    </div>
                    <div className={[style.ButtonGroup,'childcenter'].join(' ')}>
                        <div className={[style.Button,'childcenter'].join(' ')}>分享心得</div>
                        <div className={[style.Button,'childcenter'].join(' ')}>购买书籍</div>
                    </div>
            </div>
        ]
    }
}
render() {
   return (
   <div className={style.BookView}>
       {this.createBookContent()}
   </div>
   );
}
}
export default Book;