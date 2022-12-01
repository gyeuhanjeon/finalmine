import {Container,Navbar,Nav,NavDropdown} from 'react-bootstrap';
import '../Navber/Nav.css';
import '../font/Jalnan.ttf';
import { Link } from 'react-router-dom';
import Logout from '../other/Logout';

/* 1.아직 미완성임!! 
   2. 전체적인 분위기 및 카테고리 정리 
   3. 네비바 모든 페이지 연결 */
function Navber() {
    return (
        <nav className='App-Nav'>
             <Navbar bg="light" expand="lg">
            <Container>
              <Navbar.Brand className='home-button' href="/">MBTISOUR</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                <Nav.Link className='Nav-link-font1' href="/home">HOME</Nav.Link>

                  <NavDropdown className='Nav-link-font2' title="MBTI">
                    <NavDropdown.Item href="/MBTI">MBTI 검사하기</NavDropdown.Item>
                    <NavDropdown.Item href="/MBTITypes">MBTI 설명</NavDropdown.Item>
                  </NavDropdown>
                  <Nav.Link className='Nav-link-font3'href="/Socket">(임시)채팅방</Nav.Link>

                  <NavDropdown title="더 보기" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/mypage">내 정보</NavDropdown.Item>
                    <NavDropdown.Item href="/Postbox">메시지 함</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">고객 소리함</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.5">
                      <Logout />
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      </nav>
    )
    }
    export default Navber;