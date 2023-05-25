import  "../sass/Room.scss"
import imgTeam from "../assets/img/Hinhnhom.jpg"
import imgUser from "../assets/img/anhuser.png"

function Room(props){
    const item = props.item
    return(<div  className={`room  ${props.action}`}>
        <div className={`room-image`}><img className="image" src={item.type===0?imgUser:imgTeam} /></div>
        <div className="room-name">{item.name}</div>
    </div>)
}
export default Room;