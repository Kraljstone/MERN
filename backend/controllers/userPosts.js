import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import asyncHandler from 'express-async-handler';

export const getPosts = asyncHandler(async (req, res) => {
  const postMessage = await PostMessage.find();
  if (postMessage) {
    return res.status(200).json(postMessage);
  }

  res.status(404);
  throw new Error('Post not found');
});

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

export const updatePost = asyncHandler(async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send('No post with that id');

  const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
    new: true,
  });

  res.json(updatedPost);
});
