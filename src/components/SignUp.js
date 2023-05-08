import {Link} from "react-router-dom";
import "../sass/Sign.scss"
function SignUP(){
    return(<div className="login-background">
        <div className="login-container">
            <div className="login-content row">
                <div className="col-12 text-center login-title">Sign Up</div>
                <div className="col-12 form-group magrin-input margin-sign">
                    <label className="label-title">Username: </label>
                    <input

                        type="text"
                        className="login-input "
                        placeholder="Enter your user name"
                    />
                </div>
                <div className="col-12 form-group magrin-input margin-sign "  >
                    <label className="label-title">Password: </label>
                    <input
                        type="text"
                        className="login-input "
                        placeholder="Enter your password"
                    />

                </div>
                <div className="col-12 form-group magrin-input margin-sign "  >
                    <label className="label-title">Repeat Password: </label>
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
                     Sign Up
                    </button>
                </div>
                <div className="col-12">
                    <span className="forgot-password"> <Link to="/SignUp"> Log in  </Link> to your account</span>
                </div>
            </div>
        </div>
    </div>);
}
export default SignUP;