import logo from './logo.svg';
import './App.css';
import {useSelector} from "react-redux";
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Chat from "./components/Chat";
function App() {
  const count = useSelector((state) => state.app.value)
  console.log(count)
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={ <Login/>}>

        </Route>
        <Route path="/SignUp" element={<SignUp/>}>

        </Route>
        <Route path="/Chat" element={  <Chat/>}>

        </Route>

        <Route path="/SignUp">

        </Route>


      </Routes>
    </div>
  );
}

export default App;
