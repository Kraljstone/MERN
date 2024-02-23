import { Card } from 'react-bootstrap';
import classes from './Post.module.css';
import moment from 'moment';
import {
  useDeletePostMutation,
  useLikePostMutation,
} from '../../../slices/postsApiSlice';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { likePostStore, deletePostStore } from '../../../slices/postSlice';
import { PostType } from 'src/types/post.types';
import { useSelector } from 'react-redux';
import { UserInfo } from 'src/types/auth.types';

interface PostProps {
  setCurrentID: (id: string) => void;
  post: PostType;
}

const Post: React.FC<PostProps> = ({ post, setCurrentID }) => {
  const {
    createdAt,
    creator,
    likeCount,
    message,
    selectedFile,
    tags,
    title,
    _id,
    userId,
  } = post;

  const [deletePost] = useDeletePostMutation();
  const [likePost] = useLikePostMutation();
  const dispatch = useDispatch();

  const { userInfo } = useSelector(
    (state: { auth?: { userInfo?: UserInfo } }) => state?.auth || {}
  );

  const deletePostHandler = async () => {
    if (userInfo?._id === userId) {
      try {
        await deletePost(_id).unwrap();
        return dispatch(deletePostStore(_id));
      } catch (err: any) {
        return toast.error(err?.data?.message || err?.error);
      }
    }

    toast.error(
      'You are not authorized to delete this post as it belongs to another user.'
    );
  };

  const likePostHandler = async () => {
    if (_id) {
      try {
        const res = await likePost({
          id: _id,
          data: likeCount,
        }).unwrap();

        const isPostType = (obj: any): obj is PostType => {
          return (
            obj &&
            typeof obj === 'object' &&
            'createdAt' in obj &&
            'creator' in obj &&
            'likeCount' in obj &&
            'selectedFile' in obj
          );
        };

        if (isPostType(res)) {
          return dispatch(likePostStore(res));
        }
      } catch (err: any) {
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
};

export default Post;
