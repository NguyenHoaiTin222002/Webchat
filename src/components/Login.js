import "../sass/Login.scss"
import {Link} from "react-router-dom";
function Login(){
    return(     <div className="login-background">
        <div className="login-container">
                <div className="login-content row">
                    <div className="col-12 text-center login-title">Login</div>
                    <div className="col-12 form-group magrin-input">
                        <label>Username: </label>
                        <input

                            type="text"
                            className="login-input "
                            placeholder="Enter your user name"
                        />
                    </div>
                    <div className="col-12 form-group magrin-input " >
                        <label>Password: </label>
                        <input
                            type="text"
                            className="login-input "
                            placeholder="Enter your password"
                        />

                    </div>
                    {/*<div className="col-12" style={{ color: "red" }}>*/}
                    {/*    {this.state.errorMessage}*/}
                    {/*</div>*/}
                    <div className="col-12">
                        <button
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