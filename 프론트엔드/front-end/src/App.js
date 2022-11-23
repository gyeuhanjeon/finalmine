import {Container,Navbar,Nav,NavDropdown,Row,Col} from 'react-bootstrap';
import './App.css';

function App() {
  return (
    <div className="App">
           <Navbar bg="light" expand="lg">
          <Container className=''>
            <Navbar.Brand href="#home">MBTISOUR</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link  href="#home">About</Nav.Link>
                <Nav.Link href="#link">MBTI</Nav.Link>
                <Nav.Link href="#link">게시판</Nav.Link>
                <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div className='App-Matching'>
        <Row>
        <Col className='App-Matching-effct'xs>검사 결과</Col>
        <Col className='App-Matching-someone1' xs={{ order: 12 }}>매칭 상대</Col>
        <Col className='App-Matching-someone1' xs={{ order: 12 }}>매칭 상대2</Col>
      </Row>
      </div>
    </div>
  );
}

export default App;
