import "../sass/Message.scss"
function Message(props){
    console.log(props)
    return(
        <div className={`message ${props.myMessage === true? "myMessage": ""}`}>
            <div className={`message_sender ${props.myMessage === true ? "disNone" : ""}`}>
                {props.name}
            </div>
            <div className={`message_value
            `}>
                <label>
                    {props.message}
                </label>
            </div>
        </div>);
}
export default Message;