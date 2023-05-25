import "../sass/Login.scss"
import {Link, useNavigate} from "react-router-dom";
import {useEffect, useState } from "react";
import SocketSingleton from "../Dao/SocketSingleton";
import {useDispatch, useSelector} from "react-redux";

function Login(props){
    const isLogOut = useSelector(props => props.app.isLogOut);
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const socketSingleton = new SocketSingleton();
    const [messErr,setmessErr] = useState("");
    const [userName,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const  name = localStorage.getItem("name");
    const  code = localStorage.getItem("code");

    const setchangeValue = (value,type) =>{
        if(type === "userName"){
            setUserName(value)
        }
        if(type === "password"){
            setPassword(value)
        }
    }
    useEffect(() =>{
        socketSingleton.setSocket();
    },[])

    const  handleLogin= async () =>{
        socketSingleton.sendLogin(userName,password);

        socketSingleton.socket.addEventListener("message", function (event) {
            let result = JSON.parse(event.data);

            if(result.status === 'error' ){
                setmessErr(result.mes);
            }
            if(result.status === 'success' && result.data["RE_LOGIN_CODE"] !== undefined ){
                localStorage.setItem("code",JSON.stringify(result.data["RE_LOGIN_CODE"]))
                localStorage.setItem("name",userName )
                navigate('/Chat');
            }
        });
    }
    console.log(isLogOut);
    return(<div className="login-background">
        <div className="login-container">
            <div className="login-content row">
                <div className="col-12 text-center login-title">Login</div>
                <div className="col-12 form-group magrin-input">
                    <label>Username: </label>
                    <input
                        value={userName}
                        type="text"
                        className="login-input "
                        placeholder="Enter your user name"
                        onChange={(e) => setchangeValue(e.target.value,"userName")}
                    />
                </div>
                <div className="col-12 form-group magrin-input " >
                    <label>Password: </label>
                    <input
                        value={password}
                        type="text"
                        className="login-input "
                        placeholder="Enter your password"
                        onChange={(e) => setchangeValue(e.target.value,"password")}
                    />

                </div>

                <div className="col-12 message-err">
                    {messErr}
                </div>
                <div className="col-12" >
                    <button onClick={() => handleLogin()}
                            className="btn-login"
                    >
                        Login
                    </button>
                </div>


                <div className="col-12">
                    <span className="forgot-password"> <Link to="/SignUp">  Sign up</Link> for an account?</span>
                </div>
                <div className="col-12 text-center login-with mt-3">
                    <span className="">Or login with:</span>
                </div>
                <div className="col-12 social-login">
                    <i className="fab fa-facebook social-icon fb"></i>
                    <i className="fab fa-google-plus social-icon gg"></i>
                </div>
            </div>
        </div>
    </div>);
}
export default Login;