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
        <div className='App-Nav'>
             <Navbar bg="light" expand="lg">
            <Container>
              <Link to="/"><Navbar.Brand className='home-button' href="#home">MBTISOUR</Navbar.Brand></Link>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <Nav.Link className='Nav-link-font1' href="#home">About</Nav.Link>
                  <Link to="/MBTI"><Nav.Link className='Nav-link-font2'href="#link">MBTI</Nav.Link></Link>
                  <Nav.Link className='Nav-link-font3'href="#link">게시판</Nav.Link>
                  <NavDropdown title="더 보기" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">내 정보</NavDropdown.Item>
                    <Link to="MBTITypes"><NavDropdown.Item href="#action/3.2">
                      MBTI 설명
                    </NavDropdown.Item></Link>
                    <NavDropdown.Item href="#action/3.3">메시지 함</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                      고객 소리함
                    </NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.5">
                    <Logout />
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>
    )
    }
    export default Navber;