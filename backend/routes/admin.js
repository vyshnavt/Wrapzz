var express = require('express');
var router = express.Router();
const adminRouter=require('../controllers/adminRoutinghelpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
 
router.post('/',adminRouter.adminLogin)
router.post('/addCategory',adminRouter.addCategory) 
router.get('/getCategory',adminRouter.getCategory)
router.post('/addPlan',adminRouter.addPlan)
router.get('/getPlans',adminRouter.getPlans)
router.get('/getPayments',adminRouter.getPayments)
router.get('/normalUser',adminRouter.getNormalUser)
router.get("/businessUser",adminRouter.getBusinessUser)
router.put("/editPlan",adminRouter.editPlan)
router.patch("/deletePlan",adminRouter.deletePlan)
router.patch("/blockUser",adminRouter.blockUser)
router.patch("/unblockUser",adminRouter.unblockUser)
router.post('/deletePayment',adminRouter.deletePayment)
 
module.exports = router;
