import "../sass/Chat.scss"
import { Scrollbars } from 'react-custom-scrollbars';
import Room from "./Room";
import img from "../assets/img/Hinhnhom.jpg"
import imgTeam from "../assets/img/Hinhnhom.jpg"
import imgUser from "../assets/img/anhuser.png"
import Message from "./Message";
import SocketSingleton from "../Dao/SocketSingleton";
import {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {enCoder} from "../Dao/Fomat";
import InputEmoji from "react-input-emoji";
import {useNavigate} from "react-router-dom";

function Chat(){
    const socketSingleton = new SocketSingleton();
    const [rooms,setRooms] = useState([]);
    const [room,setRoom] = useState({});
    const [isCheckUser,setIsCheckUser] = useState(false);
    const [roomName,setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const  name = localStorage.getItem("name");
    const  code = localStorage.getItem("code");
    const [inputMessage,setInputMessage] = useState("");
    let navigate = useNavigate();



    const [valueImg,setValueImg] = useState([]);
    const [isSendImg,setIsSendImg] = useState(false)
    // gởi ảnh
    const sendImg = async (e) =>{
         await  uploadToImbb(e,async (value) =>{
             await setValueImg([...valueImg,...value])
        })
        setIsSendImg(true);
    }
    const uploadToImbb = async (e, callback = false) => {
        let files = e.target.files
        var listLink = [];
        if (files) {
            for (const file of [...files]) {
                console.log('Đang upload hình ảnh lên imgbb...')
                let apiUrl = 'https://Hoaitin70.imgbb.com/json'
                let auth_token = 'e721864fb61ac30573759a0e9f792a9ff4e08a36'
                let options = {
                    async: false,
                    crossDomain: true,
                    processData: false,
                    contentType: false,
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                    },
                    mimeType: 'multipart/form-data',
                }
                let formData = new FormData()
                formData.append('source', file)
                formData.append('type', 'file')
                formData.append('action', 'upload')
                formData.append('timestamp', (+new Date()) * 1)
                formData.append('auth_token', auth_token)
                options.body = formData
                await fetch(apiUrl, options)
                    .then((response) => {
                        return response.json()
                    })
                    .then((response) => {
                        let obj = response
                        let linkRS = obj.image.display_url
                        console.log("Link: " + linkRS)
                        listLink.push(linkRS);
                    })
            }
            if(callback != false) {
                callback(listLink)
            }
        }

    }

    // lấy ra mess trong phòng đó
    const handleGetRoom = (item) =>{
        setRoom(item)
        socketSingleton.getMessByNameRoom(item.name,item.type)
    }
    const setchangeValue = (e,type) =>{
        if(type === "roomName"){
            setRoomName(e.target.value)
        }
        if(type === "inputMessage"){
            setInputMessage(e.target.value)
        }
    }
    // join phòng
    const handleJoinRoom = async ()=>{
        await socketSingleton.sendJoinRoom(roomName);
        await socketSingleton.sendGetUserList();
        setRoomName("");
    }
    //tạo phong
    const handleCreatRoom = async () =>{
        await socketSingleton.sendCreateRoom(roomName);
        await socketSingleton.sendGetUserList();
        setRoomName("");

    }
    const hanleLogout = () =>{
        socketSingleton.sendLogOut();
        localStorage.clear();
        navigate('/');
    }
    const handleCheckUser = async () =>{
        await  socketSingleton.sendCheckUser(roomName);
    }
    // nhấn tính phòng
    const handleSendMessageChat = async () =>{
        if(isSendImg){
            const value =  JSON.stringify(valueImg);
            socketSingleton.sendMessage(room.type,value, room.name)
            setValueImg([])
            setIsSendImg(false);
        }
        if(!isSendImg){
            const encode = enCoder(inputMessage);
            const value =   JSON.stringify(encode);
            await socketSingleton.sendMessage(room.type,value, room.name)
            setInputMessage("")
        }
        await socketSingleton.getMessByNameRoom(room.name,room.type)
    }
    const deleteImg = (value)=>{
        const new_arr = valueImg.filter(item => item !== value);
        setValueImg([...new_arr]);
    }
    useEffect(() =>{
        if(isCheckUser){
            toast.success('Successful user search', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            const createRoom = {name: roomName, type: 0, actionTime: '2023-05-21 14:46:17'}
            setRooms([createRoom,...rooms])
            setRoomName("");
            setIsCheckUser(false);
        }

    },[isCheckUser])
    useEffect(  () =>{
        socketSingleton.sendGetUserList();
    },[])
    //load phong hay tao mới phòng điều lây ra tn
    useEffect(  () =>{
        if(rooms.length > 0){
            setRoom(rooms[0])
            socketSingleton.getMessByNameRoom(rooms[0].name,rooms[0].type)
        }
    },[rooms])

    useEffect(() =>{
        socketSingleton.socket.addEventListener("message", function (event) {
            let result = JSON.parse(event.data);
            const data = result.data;
            switch (result.event){
                case "GET_USER_LIST":
                    setRooms(data)
                    break;
                case "GET_PEOPLE_CHAT_MES":
                    setMessages(data)
                    break;
                case "GET_ROOM_CHAT_MES":
                    setMessages(data.chatData)
                    break;
                case "CHECK_USER":
                    if(result.status === "success"){
                        setIsCheckUser(true);
                    }else {
                        toast.error(
                            'Error, please check again', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }
                    break;
                case "CREATE_ROOM":
                    if(result.status === "success"){
                        toast.success('Successful create room', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                    }else {
                        toast.error(
                            'Error, please check again', {
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                    }
                    break;
                case "JOIN_ROOM":
                    if(result.status === "success"){
                    toast.success('Successful join room', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                }else {
                    toast.error(
                        'Error, please check again', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                        });
                }
                    break;
                default:
                // code block
            }
        });
    },[socketSingleton.socket])
    console.log(inputMessage)
    return(<div className="content">
        <ToastContainer />
        <div className="content-left">
            <div className="content-left-header">
                <div className="left-header">
                    <div className="left-header-title">Chats</div>
                </div>
                <div className={"list-btn-main"}>

                    <div className={"list-btn"}>
                        <button className="add-room btn" onClick={() => handleCreatRoom()}><i className="fa-solid fa-plus"></i></button>
                        <button className="add-room btn" onClick={() => handleJoinRoom()} ><i
                            className="fa-solid fa-arrow-right-to-bracket"></i></button>
                        <button className="add-room btn" onClick={() => handleCheckUser()} ><i
                            className="fa-solid fa-user-plus"></i></button>
                    </div>
                    <button onClick={() => hanleLogout()} className="left-header-btn-logout btn">Logout</button>
                </div>
                <div className="left-header-add-room" style={{display:"flex"}}>
                    <input placeholder={"Search"} value={roomName} onChange={(e) => setchangeValue(e,"roomName")}/>
                </div>
            </div>
            <div className="content-left-list">
                <div className="left-list-title">
                    List room
                </div>
                <div className="left-list">
                    <Scrollbars style={{ width: "100%", height: "100%" }}>
                        {rooms.map((item,index) => {
                                return( <Room key={index} item={item} handleGetRoom ={handleGetRoom} action={room.name===item.name?"action":""} />)
                            }
                        )}
                    </Scrollbars>
                </div>


            </div>
            <div className="content-left-footer">
                <div>App chat nhóm 9</div>
                <div>Giáo Viên: Phan Đình Long</div>
            </div>
        </div>
        <div className="content-right">
            <div className="content-right-header">
                <div className="right-header-left" >
                    <div className="right-header-image"><img className="image" src={room.type===0?imgUser:imgTeam} /></div>
                    <div className="right-header-name">{room.name}</div>
                </div>
                <div className="right-header-right">
                    <i className="fa-solid fa-phone"></i>
                    <i className="fa-solid fa-video"></i>
                </div>

            </div>
            <div className="content-right-seem">
                <Scrollbars style={{ width: "100%", height: "100%" }}>
                    {[...messages].reverse().map((item,index) =>{
                        return( <Message key ={item.id} myMessage={item.name === name?true:false} name={item.name} message={item.mes} createAt={item.createAt}/>
                        )
                    })}
                </Scrollbars>
            </div>
            <div className="content-right-send">
                <div className={"right-send-icon-img"}>
                    <div className={"send-img btn-icon"} > <label htmlFor={"sendImg"}><i  className="fa-solid fa-image"></i></label>
                        <input style={{display:"none"}}  className={"inputImg"} type={"file"} id={"sendImg"}  onChange={(e) => sendImg(e)}/>
                    </div>


                </div>
                <div className={"right-send-input"}>
                    {isSendImg===true?<div className={"container-file"}>
                        {valueImg&&valueImg.length>0?valueImg.map((item,index) =>{
                            return(<div className={"show-img"} key={index}>
                                <div className={"delete-img"}  onClick={()=>deleteImg(item)}><i
                                    className="fa-solid fa-xmark"></i></div>
                                <img  src={item} alt=""/>
                            </div>)
                        }):""}
                    </div>:<div className={"group"}> <InputEmoji
                        value={inputMessage}
                        onChange={setInputMessage}
                        placeholder="Type a message"
                    />
                    </div>
                    }
                    <button onClick={ ()=> handleSendMessageChat()} className={"btn btn-send"}><i className="fa-solid fa-paper-plane"></i></button>
                </div>
            </div>
        </div>
    </div>);
}
export default Chat;