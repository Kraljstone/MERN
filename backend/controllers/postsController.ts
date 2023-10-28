import mongoose from 'mongoose';
import { Request, Response } from 'express';
import PostMessage from '../models/postMessage';
import asyncHandler from 'express-async-handler';

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Private

export const getPosts = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { page } = req.query;

    if (page) {
      const LIMIT = 4;
      const startIndex = (Number(page) - 1) * LIMIT; 

      const total = await PostMessage.countDocuments({});
      const posts = await PostMessage.find()
        .sort({ _id: -1 })
        .limit(LIMIT)
        .skip(startIndex);

      res.json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / LIMIT),
      });
    } else {
      res.status(404);
      throw new Error('Posts not found');
    }
  }
);

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Private

export const getPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;

    if (id) {
      const post = await PostMessage.findById(id);

      res.status(200).json(post);
    } else {
      res.status(404);
      throw new Error('Post not found');
    }
  }
);

// @desc    Creating Post
// @route   POST /api/posts
// @access  Private

export const createPost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const post = req.body;

    const newPost = new PostMessage(post);

    if (newPost) {
      await newPost.save();
      res.status(201).json(newPost);
    } else {
      res.status(409);
      throw new Error('Invalid post data');
    }
  }
);

// @desc    Update post by editing
// @route   PATCH /api/posts/:id
// @access  Private

export const updatePost = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, message, creator, selectedFile, tags } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send(`No post with id: ${id}`);
    } else {
      const updatedPost = {
        creator,
        title,
        message,
        tags,
        selectedFile,
        _id: id,
      };

      await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

      res.status(200).json(updatedPost);
    }
  }
);

// @desc    Delete post
// @route   DELETE /api/posts/id
// @access  Private

export const deletePost = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send(`No post with id: ${id}`);
  } else {
    await PostMessage.findByIdAndRemove(id);

    res.status(202).json({ message: 'Post deleted successfully.' });
  }
};

// @desc    Post likes
// @route   PUT /api/posts/:id/likePost
// @access  Private

export const likePost = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(404).send(`No post with id: ${id}`);
  } else {
    const post = await PostMessage.findById(id);

    if (!post) {
      res.status(404).send(`No post with id: ${id}`);
      return;
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );

    res.status(200).json(updatedPost);
  }
};
