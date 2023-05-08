import  "../sass/Room.scss"
import img from "../assets/img/Hinhnhom.jpg"

function Room(props){
    return(<div className={`room  ${props.action}`}>
        <div className={`room-image`}><img className="image" src={img} /></div>
        <div className="room-name">Nguyễn Hoài Tín</div>
    </div>)
}
export default Room;