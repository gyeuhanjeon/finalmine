import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Main from './1. Main/Main';
import Login from './2. Login/Login';
import MyPage from './5. MyPage/MyPage';
import MemberDrop from './5. MyPage/MemberDrop';
import SignUp from './3. SignUp/SignUp';
import MemberUpdate from './5. MyPage/MemberUpdate';
import MBTI from './6. MBTI/MBTI';
import MbtiTypes from './6. MBTI/MbtiTypes';
import MessageList from './7. PostBOX/MessageList';
import Home from './4. Home/Home';
import Logout from './other/Logout';
import Postbox from './7. PostBOX/Postbox';
import FindInfo from './2. Login/FindInfo';

function App() {
  return (
    <Router>
      <Logout />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/home' element={<Home />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/MemberDrop' element={<MemberDrop />} />
        <Route path='/MBTI' element={<MBTI />} />
        <Route path='/MemberUpdate' element={<MemberUpdate />} />
        <Route path='/MbtiTypes' element={<MbtiTypes />} />
        <Route path='/MessageList' element={<MessageList />} />
        <Route path='/Postbox' element={<Postbox />} />
        <Route path='/FindInfo' element={<FindInfo />} />
      </Routes>
    </Router>
  );
}

export default App;
