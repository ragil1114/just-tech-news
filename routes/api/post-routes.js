const router = require('express').Router();
const { Post, User } = require('../../models');

// get all posts in db
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
      // Query configuration
    })
  
  });