const router = require('express').Router();
const { Post, User, Vote } = require('../../models');

// get all posts in db
router.get('/', (req, res) => {
    // console.log('======================');
    Post.findAll({
      // Query configuration
      attributes: ['id', 'post_url', 'title', 'created_at'],
      // to return order of posts from newest to oldest
      order: [['created_at', 'DESC']], 
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      // Promise that captures the response from the db Call
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// get single post by id
router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: ['id', 'post_url', 'title', 'created_at'],
      include: [
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Create a post
router.post('/', (req, res) => {
    // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
    Post.create({
      title: req.body.title,
      post_url: req.body.post_url,
      user_id: req.body.user_id
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// PUT /api/posts/upvote
router.put('/upvote', (req, res) => {
  Vote.create({
    user_id: req.body.user_id,
    post_id: req.body.post_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => res.json(err));
});

// Update a post
router.put('/:id', (req, res) => {
    Post.update(
      {
        title: req.body.title
      },
      {
        where: {
          id: req.params.id
        }
      }
    )
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});

// Delete a post
router.delete('/:id', (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
});


module.exports = router;