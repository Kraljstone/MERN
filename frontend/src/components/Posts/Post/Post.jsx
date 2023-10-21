import { Card } from 'react-bootstrap';
import classes from './Post.module.css';
import PropTypes from 'prop-types';
import moment from 'moment';

function Post({ post }) {
  const { createdAt, creator, likeCount, message, selectedFile, tags, title } =
    post;

  return (
    <Card style={{ width: '18rem' }}>
      <div className={classes.creator}>
        <h5>{creator}</h5>
        <p>{moment(createdAt).fromNow()}</p>
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
          <a className='text-decoration-none' href='#'>LIKE {likeCount}</a>
          <a className='text-decoration-none' href='#'>DELETE</a>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    creator: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    selectedFile: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    likeCount: PropTypes.number.isRequired,
  }).isRequired,
};
