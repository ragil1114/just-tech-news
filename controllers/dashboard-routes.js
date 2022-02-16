const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// Route for main Dashboard page
router.get('/', (req, res) => {
    res.render('dashboard', { loggedIn: true });
});

module.exports = router;