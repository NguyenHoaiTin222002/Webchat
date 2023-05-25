import "../sass/Chat.scss"
import { Scrollbars } from 'react-custom-scrollbars';
import Room from "./Room";
import img from "../assets/img/Hinhnhom.jpg"
import Message from "./Message";
import SocketSingleton from "../Dao/SocketSingleton";
import {useEffect, useState} from "react";
function Chat(){
    const socketSingleton = new SocketSingleton();
    const [rooms,setRooms] = useState([]);


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
                                return( <Room key={index} item={item}  />)
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
                    <div className="right-header-image"><img className="image" src={img} /></div>
                    <div className="right-header-name">Nguyễn Hoài Tín</div>
                </div>
                <div className="right-header-right">
                    <i className="fa-solid fa-phone"></i>
                    <i className="fa-solid fa-video"></i>
                </div>

            </div>
            <div className="content-right-seem">
                <Scrollbars style={{ width: "100%", height: "100%" }}>
                  <Message name={"Hoài Tín"} message={"Cách hiểu này khiến cho cách phân đoạn thiếu tính khách quan." +
                      " Với cách hiểu này, diện mạo đoạn văn không được xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                      "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                      "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
                    <Message name={"Hoài Tín"} myMessage={true} message={"Cách hiểu này xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                        "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                        "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
                    <Message name={"Hoài Tín"} message={"Cách hiểu này khiến cho cách phân đoạn thiếu tính khách quan." +
                        " Với cách hiểu này, diện mạo đoạn văn không được xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                        "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                        "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
                    <Message name={"Hoài Tín"} myMessage={true} message={"Cách hiểu này xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                        "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                        "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
                    <Message name={"Hoài Tín"} message={"Cách hiểu này khiến cho cách phân đoạn thiếu tính khách quan." +
                        " Với cách hiểu này, diện mạo đoạn văn không được xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                        "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                        "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
                    <Message name={"Hoài Tín"} myMessage={true} message={"Cách hiểu này xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                        "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                        "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
                    <Message name={"Hoài Tín"} message={"Cách hiểu này khiến cho cách phân đoạn thiếu tính khách quan." +
                        " Với cách hiểu này, diện mạo đoạn văn không được xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                        "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                        "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
                    <Message name={"Hoài Tín"} myMessage={true} message={"Cách hiểu này xác định (đoạn văn bắt đầu từ đâu, như thế nào, " +
                        "các câu văn trong đoạn có mối liên kết với nhau như thế nào,…) cho nên việc xây dựng đoạn văn trở nên " +
                        "khó khăn, phức tạp, khó rèn luyện các thao tác để trở thành kĩ năng kĩ xảo."}/>
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