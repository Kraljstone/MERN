import { Form, Button } from 'react-bootstrap';
import classes from './Form.module.css';
import { useState } from 'react';
import FileBase from 'react-file-base64';
import { useSendPostsMutation } from '../../slices/postsApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function PostForm() {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const [sendPosts] = useSendPostsMutation();
  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await sendPosts({ ...postData }).unwrap();
      dispatch(setCredentials({ ...res }));
      clear();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const clear = () => {
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  return (
    <Form className={`${classes.paper} mt-5`} onSubmit={submitHandler}>
      <Form.Group controlId='creator' className='my-2'>
        <Form.Label>Creator</Form.Label>
        <Form.Control
          type='text'
          variant='outlined'
          name='creator'
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId='title' className='my-2'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          name='title'
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group controlId='message' className='my-2'>
        <Form.Label>Message</Form.Label>
        <Form.Control
          as='textarea'
          name='message'
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group controlId='tags' className='my-2'>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type='text'
          name='tags'
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(',') })
          }
        />
      </Form.Group>

      <div className='mt-3 '>
        <FileBase
          type='file'
          multiple={false}
          onDone={({ base64 }) =>
            setPostData({ ...postData, selectedFile: base64 })
          }
        />
      </div>

      <Button className='w-100 my-3' variant='primary' type='submit'>
        Submit
      </Button>

      <Button className='w-100 ' variant='danger' type='button' onClick={clear}>
        Clear
      </Button>
    </Form>
  );
}

export default PostForm;
