import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';
import { useState } from 'react';
import Paginate from '../components/Pagination';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation()?.search);
}

const HomeScreen = () => {
  const [currentID, setCurrentID] = useState(null);
  const query = useQuery();
  const page = query?.get('page') || '1';

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
          <Col xs={12} sm={7}>
            <Paginate page={page} />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomeScreen;
