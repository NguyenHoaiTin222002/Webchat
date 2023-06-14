import "../sass/Message.scss"
import {useEffect, useState} from "react";
import {Emoji, EmojiStyle} from "emoji-picker-react";
import {fomatDate} from "../Dao/Fomat";

function Message(props){
    const [isIcon,setIsIcon] = useState( false);
    const [listIcon,setListIcon] = useState([]);
    useEffect(()=>{

        if(props.message.charAt(0)==='['){
            setIsIcon(true)
            const copyList = JSON.parse(props.message);
            setListIcon([...copyList]);
        }
    },[
    ])
    const date = fomatDate(props.createAt);
    return(

        <div className={`message ${props.myMessage === true ? "myMessage": ""}`}>
            <div className={`message_sender ${props.myMessage === true ? "disNone" : ""}`}>
                {props.name}-<div>{date}</div>
            </div>
            <div className={`message_value  ${props.myMessage === true ? "message_right": ""}
            `}> {isIcon===true&&listIcon.length>0?<div> {listIcon.map((item,index)=>{
                return( <Emoji key={index}
                               unified={item}
                               emojiStyle={EmojiStyle.APPLE}
                               size={22}
                /> )
            })}</div>:<label>
                {props.message}
            </label>}

            </div>
        </div>);
}
export default Message;