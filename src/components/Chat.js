import "../sass/Chat.scss"
import { Scrollbars } from 'react-custom-scrollbars';
import Room from "./Room";
import img from "../assets/img/Hinhnhom.jpg"
import imgTeam from "../assets/img/Hinhnhom.jpg"
import imgUser from "../assets/img/anhuser.png"
import Message from "./Message";
import SocketSingleton from "../Dao/SocketSingleton";
import {useEffect, useState} from "react";
function Chat(){
    const socketSingleton = new SocketSingleton();
    const [rooms,setRooms] = useState([]);
    const [room,setRoom] = useState({});
    const [roomName,setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const  name = localStorage.getItem("name");
    const  code = localStorage.getItem("code");
    // lấy ra mess trong phòng đó
    const handleGetRoom = (item) =>{
        setRoom(item)
        socketSingleton.getMessByNameRoom(item.name,item.type)
    }
    useEffect(  () =>{
        socketSingleton.sendGetUserList();
    },[])
    useEffect(() =>{
        socketSingleton.socket.addEventListener("message", function (event) {
            let result = JSON.parse(event.data);
            const data = result.data;
            console.log(result)
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
                        const item = {name: roomName, type: 0, actionTime: '2023-05-21 14:46:17'}
                        const copyRooms = [item,...rooms] ;
                        setRooms(copyRooms)
                    }
                    break;

                default:
                // code block
            }
        });
    },[socketSingleton.socket])
    return(<div className="content">
        <div className="content-left">
            <div className="content-left-header">
                <div className="left-header">
                    <div className="left-header-title">Chats</div>
                    <button className="left-header-btn-logout btn">Đăng xuất</button>
                </div>
                <div className="left-header-add-room">
                     <button className="add-room btn"><i className="fa-solid fa-plus"></i></button>
                </div>
            </div>
            <div className="content-left-list">
                <div className="left-list-title">
                     Danh sách các phòng
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
                    {messages.reverse().map((item,index) =>{
                        return( <Message key ={item.id} myMessage={item.name === name?true:false} name={item.name} message={item.mes}/>
                        )
                    })}
                </Scrollbars>
            </div>
            <div className="content-right-send">
                      <div className={"right-send-icon-img"}>
                           <div className={"send-icon btn-icon"}><i className="fa-solid fa-face-laugh"></i></div>
                           <div className={"send-img btn-icon"}><i className="fa-solid fa-image"></i></div>
                      </div>
                  <div className={"right-send-input"}>
                    <div className={"group"}><input className={"input-group"} placeholder={"Nhập tin nhấn vào đây"}/></div>
                     <button className={"btn btn-send"}><i className="fa-solid fa-paper-plane"></i></button>
                 </div>
            </div>
        </div>
    </div>);
}
export default Chat;