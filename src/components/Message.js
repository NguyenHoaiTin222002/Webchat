import "../sass/Message.scss"
import {useEffect, useState} from "react";
import {Emoji, EmojiStyle} from "emoji-picker-react";
import {fomatDate} from "../Dao/Fomat";
import {formatArrayBufferDeCode} from "../Dao/Fomat";
import {isImageLink} from "../Dao/Fomat";
function Message(props){

    const [isVideo,setIsVideo] = useState(false)
    const [listVideo,setListVideo] = useState([]);
    const [messChat,setMessChat] = useState("");
    const [isImg,setIsImg] = useState(false)
    const [listImg,setListImg] = useState([]);
    useEffect(()=>{
        if(props.message.charAt(0)==='['){
            const copyList = JSON.parse(props.message);
            const item  =  new String(copyList[0]);
            if(isImageLink(copyList[0])){

                setIsImg(true)
                setListImg([...copyList])
            }

            if(item.includes(".mp4")){
                setIsVideo(true)
                setListVideo([...copyList])
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
                {isVideo===true&&listVideo.length>0?<div> {listVideo.map((item,index)=>{
                    return( <video controls style={{width:"200px",height:"auto"}} src={item} ></video> )
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