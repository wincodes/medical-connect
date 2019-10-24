const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Post = require('../../models/Post');
const validatePostInput = require('../../validation/post');

const Profile = require('../../models/Profile');

// @route GET api/posts
// @desc GET get all posts
// @access public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then(posts => res.json(posts))
		.catch(() => res.status(404).json('No Posts unavailable'));
});

// @route GET api/posts/:id
// @desc GET get post by id
// @access public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then(post => res.json(post))
		.catch(() => res.status(404).json('No post available'));
});

// @route DELETE api/posts/:id
// @desc delete post
// @access private
router.delete(
	'/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.user.toString() !== profile.user.toString()) {
						return res
							.status(401)
							.json({ notauthorized: 'user is not authorized' });
					}
					post
						.remove()
						.then(() => res.json({ success: 'post deleted successfully' }));
				})
				.catch(() => res.json({ error: 'Post not found' }));
		});
	}
);

// @route GET api/posts
// @desc GET create post
// @access private
router.post(
	'/',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		const newPost = new Post({
			text: req.body.text,
			name: req.body.name,
			avatar: req.body.avatar,
			user: req.user.id
		});

		newPost.save().then(post => res.json(post));
	}
);

// @route POST api/posts/like/:id
// @desc POST create post Like
// @access private
router.post(
	'/like/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.likes) {
						const postLikes = post.likes;
						if (
							postLikes.filter(like => like.user.toString() === req.user.id)
								.length > 0
						) {
							return res
								.status(400)
								.json({ alreadyliked: 'User already liked this post' });
						}
					}

					post.likes.unshift({ user: req.user.id });

					post.save().then(post => res.json(post));
				})
				.catch(err => {
					console.log(err);
					res.json({ error: 'An error occurred please try again' });
				});
		});
	}
);

// @route POST api/posts/unlike/:id
// @desc POST unlike a post
// @access private
router.post(
	'/unlike/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		Profile.findOne({ user: req.user.id }).then(profile => {
			Post.findById(req.params.id)
				.then(post => {
					if (post.likes) {
						const postLikes = post.likes;
						if (
							postLikes.filter(like => like.user.toString() === req.user.id)
								.length === 0
						) {
							return res
								.status(400)
								.json({ alreadyliked: 'You have not yet liked this post' });
						}
					}

					const removeIndex = post.likes
						.map(item => item.user.toString())
						.indexOf(req.user.id);

					post.likes.splice(removeIndex, 1);

					post.save().then(post => res.json(post));
				})
				.catch(err => {
					console.log(err);
					res.json({ error: 'An error occurred please try again' });
				});
		});
	}
);

// @route POST api/posts/coomment/:id
// @desc POST a comment
// @access private
router.post(
	'/comment/:id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {
		const { errors, isValid } = validatePostInput(req.body);

		if (!isValid) {
			return res.status(400).json(errors);
		}

		Post.findById(req.params.id)
			.then(post => {
				const newComment = {
					text: req.body.text,
					name: req.body.name,
					avatar: req.body.avatar,
					user: req.user.id
				};

				post.comments.unshift(newComment);

				post.save().then(post => res.json(post));
			})
			.catch(err => {
				res.status(404).json({ postnotfound: 'post not found' });
			});
	}
);

// @route DELETE api/posts/coomment/:id
// @desc DELETE a comment
// @access private
router.delete(
	'/comment/:id/:comment_id',
	passport.authenticate('jwt', { session: false }),
	(req, res) => {

		Post.findById(req.params.id)
			.then(post => {
        if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length = 0){
          return res.status(404).json({ commentnotexist: 'comment does not exist'})
        }

        const removeIndex = post.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id)

				post.comments.splice(removeIndex, 1);

				post.save().then(post => res.json(post));
			})
			.catch(err => {
        console.log(err)
				res.status(404).json({ postnotfound: 'post not found' });
			});
	}
);

module.exports = router;
