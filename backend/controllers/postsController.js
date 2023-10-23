import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Private

export const getPosts = asyncHandler(async (req, res) => {
  const postMessage = await PostMessage.find();
  if (postMessage) {
    return res.status(200).json(postMessage);
  }

  res.status(404);
  throw new Error('Posts not found');
});

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Private

export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (id) {
    const post = await PostMessage.findById(id);

    res.status(200).json(post);
  }
  res.status(404);
  throw new Error('Post not found');
});

// @desc    Creating Post
// @route   POST /api/posts
// @access  Private

export const createPost = asyncHandler(async (req, res) => {
  const post = req.body;

  const newPost = new PostMessage(post);

  if (newPost) {
    await newPost.save();
    return res.status(201).json(newPost);
  }

  res.status(409);
  throw new Error('Invalid post data');
});

// @desc    Update post by editing
// @route   PATCH /api/posts/:id
// @access  Private

export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, message, creator, selectedFile, tags } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const updatedPost = { creator, title, message, tags, selectedFile, _id: id };

  await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

  res.status(200).json(updatedPost);
});

// @desc    Delete post
// @route   DELETE /api/posts/id
// @access  Private

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  await PostMessage.findByIdAndRemove(id);

  res.status(202).json({ message: 'Post deleted successfully.' });
};

// @desc    Post likes
// @route   PUT /api/posts/:id/likePost
// @access  Private

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const post = await PostMessage.findById(id);

  const updatedPost = await PostMessage.findByIdAndUpdate(
    id,
    { likeCount: post.likeCount + 1 },
    { new: true }
  );

  res.status(200).json(updatedPost);
};