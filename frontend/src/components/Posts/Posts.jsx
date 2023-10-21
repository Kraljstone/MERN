import { useEffect } from 'react';
import Post from './Post/Post';
import { useGetPostsQuery } from '../../slices/postsApiSlice';
import { Row, Col } from 'react-bootstrap';
import classes from './Posts.module.css';
import Loader from '../Loader';

const Posts = () => {
  const { data } = useGetPostsQuery();

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return !data?.length ? (
    <Loader />
  ) : (
    <Row className={classes.container} xs={12}>
      {data.map((post) => (
        <Col key={post._id} className='mt-5'>
          <Post post={post} />
        </Col>
      ))}
    </Row>
  );
};

export default Posts;
