const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const {
    register,
    login,
    users,
} = require('../controllers/user');
const { post, postlist, update } = require('../controllers/post');

router.route('/').get((ree,res) =>{
    res.send("kumar")
});
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(users);
router.route('/post').post(post);
router.route('/postlist').get(postlist);
router.route('/update').put(update);

//use verified path middle ware
router.use(verifyToken)

module.exports = router