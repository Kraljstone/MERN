import { Card } from 'react-bootstrap';
import classes from './Post.module.css';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  useDeletePostMutation,
  useLikePostMutation,
} from '../../../slices/postsApiSlice';
import { toast } from 'react-toastify';
import { useDispatch,  } from 'react-redux';
import { setCredentials } from '../../../slices/authSlice';


function Post({ post, setCurrentID }) {
  const {
    createdAt,
    creator,
    likeCount,
    message,
    selectedFile,
    tags,
    title,
    _id,
  } = post;

  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const dispatch = useDispatch();



  const deletePostHandler = async () => {
    try {
      const res = await deletePost(_id).unwrap();
      return dispatch(setCredentials({ ...res }));
    } catch (err) {
      return toast.error(err?.data?.message || err?.error);
    }
  };

  const likePostHandler = async (e) => {
    e.preventDefault();

    if (_id) {
      try {
        const res = await likePost({
          id: _id,
          data: likeCount,
        }).unwrap();
        return dispatch(setCredentials({ ...res }));
      } catch (err) {
        return toast.error(err?.data?.message || err?.error);
      }
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <div className={classes.creator}>
        <div>
          <h5>{creator}</h5>
          <p>{moment(createdAt)?.fromNow()}</p>
        </div>
        <p
          className={classes.moreBtn}
          onClick={() => {
            setCurrentID(_id);
          }}
        >
          ...
        </p>
      </div>

      <Card.Img
        className={classes.img}
        variant='top'
        src={selectedFile}
        alt='img'
      />
      <Card.Body>
        <Card.Text className={classes.details}>
          {tags.map((tag) => `#${tag} `)}
        </Card.Text>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{message}</Card.Text>
        <div className='d-flex justify-content-between '>
          <p className={classes.deleteBtn} onClick={likePostHandler}>
            LIKE {likeCount}
          </p>
          <p className={classes.deleteBtn} onClick={deletePostHandler}>
            DELETE
          </p>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    creator: PropTypes.string,
    createdAt: PropTypes.string,
    message: PropTypes.string,
    _id: PropTypes.string,
    selectedFile: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    likeCount: PropTypes.number,
  }),
  setCurrentID: PropTypes.func,
};
