import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Posts from '../components/Posts/Posts';
import Form from '../components/Form/Form';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostStore } from '../slices/postSlice';
import { useGetPostsQuery } from '../slices/postsApiSlice';

const HomeScreen = () => {
  const [currentID, setCurrentID] = useState(null);
  const { postInfo } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const { data } = useGetPostsQuery();

  useEffect(() => {
    if (data) {
      dispatch(fetchPostStore(data));
    }
  }, [currentID, dispatch, data]);

  return (
    <Container fluid>
      <Container>
        <Row>
          <Col xs={12} sm={7}>
            <Posts data={postInfo} setCurrentID={setCurrentID} />
          </Col>
          <Col xs={12} sm={4}>
            <Form
              currentID={currentID}
              setCurrentID={setCurrentID}
              data={postInfo}
            />
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomeScreen;
