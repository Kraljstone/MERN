import { Form, Button } from 'react-bootstrap';
import classes from './Form.module.css';
import { useEffect, useState } from 'react';
import FileBase from 'react-file-base64';
import {
  useSendPostsMutation,
  useUpdatePostMutation,
} from '../../slices/postsApiSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { updatePostStore, createPostStore } from '../../slices/postSlice';
import { FormEvent } from 'react';
import { PostType } from '../types/post.types';

interface PostFormProps {
  currentID: string | null;
  setCurrentID: React.Dispatch<React.SetStateAction<string | null>>;
}

interface RootState {
  post?: {
      postInfo?: {
          data?: PostType;
      };
  };
}

const PostForm: React.FC<PostFormProps> = ({ currentID, setCurrentID }) => {
  const [postData, setPostData] = useState({
    creator: '',
    title: '',
    message: '',
    tags: [],
    selectedFile: '',
  });

  const [sendPosts] = useSendPostsMutation();
  const [updatePost] = useUpdatePostMutation();
  const dispatch = useDispatch();
  const post = useSelector((state: RootState) =>
    currentID
      ? Array.isArray(state.post?.postInfo?.data) &&
        state.post.postInfo.data.find(
          (message: PostType) => message._id === currentID
        )
      : null
  );

  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (currentID) {
      try {
        const res = await updatePost({
          id: currentID,
          data: postData,
        }).unwrap();

        dispatch(updatePostStore({ ...res, likeCount: post.likeCount }));
      } catch (err: any) {
        toast.error(err?.data?.message || err?.error);
      }

      return;
    }

    try {
      const res = await sendPosts(postData).unwrap();
      dispatch(createPostStore(res));
    } catch (err: any) {
      toast.error(err?.data?.message || err?.error);
    }

    clear();
  };

  const clear = () => {
    setCurrentID(null);
    setPostData({
      creator: '',
      title: '',
      message: '',
      tags: [],
      selectedFile: '',
    });
  };

  return (
    <Form className={`${classes.paper} mt-5`} onSubmit={submitHandler}>
      <Form.Group controlId='creator' className='my-2'>
        <Form.Label>Creator</Form.Label>
        <Form.Control
          type='text'
          name='creator'
          value={postData?.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e?.target?.value })
          }
        />
      </Form.Group>

      <Form.Group controlId='title' className='my-2'>
        <Form.Label>Title</Form.Label>
        <Form.Control
          type='text'
          name='title'
          value={postData?.title}
          onChange={(e) =>
            setPostData({ ...postData, title: e?.target?.value })
          }
        />
      </Form.Group>

      <Form.Group controlId='message' className='my-2'>
        <Form.Label>Message</Form.Label>
        <Form.Control
          as='textarea'
          name='message'
          value={postData?.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e?.target?.value })
          }
        />
      </Form.Group>

      <Form.Group controlId='tags' className='my-2'>
        <Form.Label>Tags</Form.Label>
        <Form.Control
          type='text'
          name='tags'
          value={postData?.tags}
          onChange={(e) =>
            setPostData({
              ...postData,
              tags: e?.target?.value.split(',') as never[],
            })
          }
        />
      </Form.Group>

      <div className='mt-3 '>
        <FileBase
          type='file'
          multiple={false}
          onDone={({ base64 }: { base64: string }) =>
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
};

export default PostForm;
