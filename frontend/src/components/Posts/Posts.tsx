import Post from './Post/Post';
import { Row, Col } from 'react-bootstrap';
import classes from './Posts.module.css';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import { CurrentPagePosts } from '../../types/post.types';

interface PostsProps {
  setCurrentID: (id: string) => void;
}

const Posts: React.FC<PostsProps> = ({ setCurrentID }) => {
  const { postInfo } = useSelector(
    (state: { post?: { postInfo?: CurrentPagePosts } }) => state?.post || {}
  );

  return !postInfo?.data?.length ? (
    <div className={classes.loader}>
      <Loader />
    </div>
  ) : (
    <Row className={classes.container} xs={12}>
      {postInfo?.data?.map((post) => (
        <Col key={post?._id} className='mt-5'>
          <Post post={post} setCurrentID={setCurrentID} />
        </Col>
      ))}
    </Row>
  );
};

export default Posts;
