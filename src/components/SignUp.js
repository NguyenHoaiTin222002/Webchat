import {useNavigate,Link} from "react-router-dom";
import "../sass/Login.scss"
import {useEffect, useState} from "react";



function SignUP(){
    let navigate = useNavigate();
    const socket = new WebSocket("ws://140.238.54.136:8080/chat/chat");
    const [messErr,setmessErr] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const setchangeValue = (value,type) =>{
        if(type === "userName"){
            setUserName(value)
        }
        if(type === "password"){
            setPassword(value)
        }
    }
    const  handleSignUp = async () =>{

        const registerData = {
            action: "onchat",
            data: {
                event: "REGISTER",
                data: {
                    user: userName,
                    pass: password,
                },
            },
        };
        socket.send(JSON.stringify(registerData));
        socket.onmessage()
        socket.addEventListener("message", function (event) {
            // Nhận một tin nhắn từ WebSocket
                console.log(event.data)
            const  data = JSON.parse(event.data);
                if(data.status === 'error' ){
                    setmessErr(data.mes);
                }else {
                    navigate('/')

                }
        });


    }



    return(<div className="login-background">
        <div className="login-container">
            <div className="login-content row">
                <div className="col-12 text-center login-title">Sign Up</div>
                <div className="col-12 form-group magrin-input margin-sign">
                    <label className="label-title">Username: </label>
                    <input
                        value={userName}
                        type="text"
                        className="login-input "
                        placeholder="Enter your user name"
                        onChange={(e) => setchangeValue(e.target.value,"userName")}
                    />
                </div>
                <div className="col-12 form-group magrin-input margin-sign "  >
                    <label className="label-title">Password: </label>
                    <input
                        value={password}
                        type="text"
                        className="login-input "
                        placeholder="Enter your password"
                        onChange={(e) => setchangeValue(e.target.value,"password")}
                    />

                </div>

                {/*<div className="col-12" style={{ color: "red" }}>*/}
                {/*    {this.state.errorMessage}*/}
                {/*</div>*/}
                <div className="col-12 message-err">
                    {messErr}
                </div>
                <div className="col-12 ">
                    <button onClick={() => handleSignUp()}
                        className="btn-login"
                    >
                     Sign Up
                    </button>
                </div>
                <div className="col-12">
                    <span className="forgot-password"> <Link to="/"> Log in  </Link> to your account</span>
                </div>
            </div>
        </div>
    </div>);
}
export default SignUP;