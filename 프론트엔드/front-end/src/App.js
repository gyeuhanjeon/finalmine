import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './1. Main/Main';
import Login from './2. Login/Login';
import SignUp from './3. SignUp/SignUp';
import MBTI from './6. MBTI/MBTI';
import MbtiTypes from './6. MBTI/MbtiTypes';
import MessageList from './7. PostBOX/MessageList';
import Home from './4. Home/Home';
import Logout from './other/Logout';
import Postbox from './7. PostBOX/Postbox';
import FindInfo from './2. Login/FindInfo';
import Chat from './9.Chat/Chatting';
import SocketTest from './9.Chat/ChatTest';
import Matching from './8.Matching/Matching_원본';
import Mypage from './5. MyPage/Mypage';
import Navber from './Navber/Nav';
import Test from './test/test';
import '../src/App.css';


function App() {
  return (
    <Router>
      <Navber/>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/MBTI' element={<MBTI />} />
        <Route path='/MbtiTypes' element={<MbtiTypes />} />
        <Route path='/MessageList' element={<MessageList />} />
        <Route path='/Postbox' element={<Postbox />} />
        <Route path='/FindInfo' element={<FindInfo />} />
        <Route path='/Chat' element={<Chat/>}/>
        <Route path='/Socket' element={<SocketTest/>}/>
        <Route path='/Matching' element={<Matching/>}/>
        <Route path='/test' element={<Test/>}/>
      </Routes>
    </Router>
  );
}

export default App;
