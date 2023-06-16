import "../sass/Message.scss"
import {useEffect, useState} from "react";
import {Emoji, EmojiStyle} from "emoji-picker-react";
import {fomatDate} from "../Dao/Fomat";
import {formatArrayBufferDeCode} from "../Dao/Fomat";
import {isImageLink} from "../Dao/Fomat";
function Message(props){
    const [isIcon,setIsIcon] = useState( false);
    const [listIcon,setListIcon] = useState([]);
    const [messChat,setMessChat] = useState("");
    const [isImg,setIsImg] = useState(false)
    const [listImg,setListImg] = useState([]);
    useEffect(()=>{
        if(props.message.charAt(0)==='['){
            const copyList = JSON.parse(props.message);

            if(isImageLink(copyList[0])){
                console.log(copyList.length)
                setIsImg(true)
                setListImg([...copyList])
            }else {
                setIsIcon(true)
                setListIcon([...copyList]);
            }
        }
        if(props.message.charAt(0)==='{'){
            const copyList = JSON.parse(props.message);
            const  value = formatArrayBufferDeCode(copyList)
            setMessChat(value);
        }
    },[
    ])

    const date = fomatDate(props.createAt);

    return(
        <div className={`message ${props.myMessage === true ? "myMessage": ""}`}>
            <div className={`message_sender`}>
                <div className={` ${props.myMessage === true ? "disNone" : ""}`}>{props.name}-</div>
                <div className={`send_date ${props.myMessage === true ? "dateMessage" : ""}`}>{date}</div>
            </div>

            <div className={`message_value  ${props.myMessage === true ? "message_right": ""}
            `}>
                {isIcon===true&&listIcon.length>0?<div> {listIcon.map((item,index)=>{
                    return( <Emoji key={index}
                                   unified={item}
                                   emojiStyle={EmojiStyle.APPLE}
                                   size={22}
                    /> )
                })}</div>:<>
                    {isImg===true && listImg.length>0?<div> {listImg.map((item,index)=>{
                        return(
                            <img  className={"sendImg"} src={item} key={index}/>)
                    })}</div>:   <label>{messChat === ""?props.message:messChat}</label>}
                </>}
            </div>
        </div>);
}
export default Message;