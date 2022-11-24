import {Container,Navbar,Nav,NavDropdown,Row,Col} from 'react-bootstrap';
import './App.css';
import './font/Jalnan.ttf';

function App() {
  return (
    <div className="App">
      <div className='App-Nav'>
           <Navbar bg="light" expand="lg">
          <Container>
            <Navbar.Brand className='home-button' href="#home">MBTISOUR</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className='Nav-link-font1' href="#home">About</Nav.Link>
                <Nav.Link className='Nav-link-font2'href="#link">MBTI</Nav.Link>
                <Nav.Link className='Nav-link-font3'href="#link">게시판</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">내 정보</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    MBTI 설명
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">메시지 함</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    고객 소리함
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    </div>
    <div className='warp_main_body'>
      <div className='warp_body_Mainfont'>
      <p>나는 이런 사람과 어울려요!</p>
      </div>
      <div className='warp_body'>
      <div className='warp_body1'>
      내 MBTI프로필
      </div>
      <div className='warp_body2'>
      상대 MBTI프로필
      </div>
      <div className='warp_body3'>
        상대2 MBTI프로필
      </div>
      </div>
      </div>
      </div>
  );
}

export default App;
