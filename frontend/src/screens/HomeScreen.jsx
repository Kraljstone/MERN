import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';
import { useState } from 'react';

const HomeScreen = () => {
  const [currentID, setCurrentID] = useState(null);
  
  return (
    <Container fluid>
      <Container>
        <Row>
          <Col xs={12} sm={7}>
            <Posts setCurrentID={setCurrentID} />
          </Col>
          <Col xs={12} sm={4}>
            <Form currentID={currentID} setCurrentID={setCurrentID} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomeScreen;
