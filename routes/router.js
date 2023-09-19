const router = require('express').Router();
const { verifyToken } = require('../middleware/jwtToken');
const {
    register,
    login,
    users,
} = require('../controllers/user');

router.route('/').get((ree,res) =>{
    res.send("kumar")
});
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/user').get(users)

//use verified path middle ware
router.use(verifyToken)

module.exports = router