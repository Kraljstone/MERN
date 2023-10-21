import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';

const HomeScreen = () => {
  return (
    <Container fluid>
      <Container>
        <Row >
          <Col xs={12} sm={7}>
            <Posts />
          </Col>
          <Col xs={12} sm={4}>
            <Form />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomeScreen;
