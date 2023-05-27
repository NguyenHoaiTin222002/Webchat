import "../sass/Message.scss"
function Message(props){
    return(
        <div className={`message ${props.myMessage === true ? "myMessage": ""}`}>
            <div className={`message_sender ${props.myMessage === true ? "disNone" : ""}`}>
                {props.name}
            </div>
            <div className={`message_value  ${props.myMessage === true ? "message_right": ""}
            `}>
                <label>
                    {props.message}
                </label>
            </div>
        </div>);
}
export default Message;