var express = require('express');
var router = express.Router();
const userRoutinghealper =require("../controllers/userRoutinghealpers")
const middleware = require('../controllers/middleware')

/* GET home page. */

router.post('/', userRoutinghealper.userlogin);
router.post('/Signup', userRoutinghealper.Signup);
router.get('/profile', middleware.jwtautenticate,userRoutinghealper.userProfile)
router.get('/verification',userRoutinghealper.userVerification)
router.post('/postUpload',middleware.decodeid,userRoutinghealper.postUpload)
router.get('/getPost',userRoutinghealper.getPost)
router.get('/getPostuser',middleware.decodeid,userRoutinghealper.getPostuser)
router.get('/getLoginUser',middleware.decodeid,userRoutinghealper.getLoginUser)
router.post('/likePost',middleware.decodeid,userRoutinghealper.likePost)
router.post('/addComment',middleware.decodeid,userRoutinghealper.addComment)
router.post('/doPayment',middleware.decodeid,userRoutinghealper.doPayment)
router.post('/verifyPayment',middleware.decodeid,userRoutinghealper.verifyPayment)
router.get("/getPayment",middleware.decodeid,userRoutinghealper.getPayment)
router.post('/followUser',middleware.decodeid,userRoutinghealper.followUser)
router.post('/editProfile',middleware.decodeid,userRoutinghealper.editProfile)
router.post('/addHighlights',userRoutinghealper.addHighlights)
router.post('/googleLogin',userRoutinghealper.googleLogin)
router.get('/getUserDetails',middleware.decodeid,userRoutinghealper.getUserDetails)
router.get('/getPlans',userRoutinghealper.getPlans)
router.post('/search',userRoutinghealper.search)
router.delete('/deletePost/:Id',userRoutinghealper.removePost)
router.delete('/deleteComment/:Id',userRoutinghealper.deleteComment)
router.patch('/editCommentPost',userRoutinghealper.editCommentPost)
router.get('/getComments/:Id',userRoutinghealper.getComments)
router.post('/addMessages',middleware.decodeid,userRoutinghealper.addMessages)
router.get('/getConversations',middleware.decodeid,userRoutinghealper.getConversations)
router.get('/getSingleCoversations/:id',middleware.decodeid,userRoutinghealper.getSingleCoversations)
router.get('/getMessages/:Id',userRoutinghealper.getMessages)
router.get('/getFollowers',middleware.decodeid,userRoutinghealper.getFollowers)
module.exports = router;
   