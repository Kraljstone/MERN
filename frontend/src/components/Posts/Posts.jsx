import PropTypes from 'prop-types';
import Post from './Post/Post';
import { useGetPostsQuery } from '../../slices/postsApiSlice';
import { Row, Col } from 'react-bootstrap';
import classes from './Posts.module.css';
import Loader from '../Loader';
import { useEffect } from 'react';

const Posts = ({ setCurrentID }) => {
  const { data } = useGetPostsQuery();

  useEffect(() => {}, []);

  return !data?.length ? (
    <Loader />
  ) : (
    <Row className={classes.container} xs={12}>
      {data.map((post) => (
        <Col key={post?._id} className='mt-5'>
          <Post post={post} setCurrentID={setCurrentID} />
        </Col>
      ))}
    </Row>
  );
};

export default Posts;

Posts.propTypes = {
  setCurrentID: PropTypes.func,
};
