const adminControl=require('../controllers/adminControl')
module.exports={

    adminLogin:(req,res)=>{
        adminControl.adminlogin(req.body).then((data)=>{
                res.json(data)
        })
    },

    addCategory:(req,res)=>{
        console.log("llkkk");
        adminControl.addCategory(req.body).then((data)=>{
            res.json(data)
        })
    },

    editCategory:(req,res)=>{
        adminControl.editCategory(req.body).then((data)=>{
            res.json(data)
        })
    },

    getCategory:(req,res)=>{
        adminControl.getCategory().then((data)=>{
            res.json(data)
        })
    },

    addPlan:(req,res)=>{
        adminControl.addPlan(req.body).then((data)=>{
            res.json(data)
        })
    },

    getPlans:(req,res)=>{
        adminControl.getPlans().then((data)=>{
            res.json(data)
        })
    },

    getPayments:(req,res)=>{
        adminControl.getPayments().then((data)=>{
            res.json(data)
        })
    },

    getNormalUser:(req,res)=>{
        adminControl.getNormalUser().then((data)=>{
            res.json(data)
        })
    },

    getBusinessUser:(req,res)=>{
        adminControl.getBusinessUser().then((data)=>{
            res.json(data)
        })
    },

    editPlan:(req,res)=>{

        adminControl.editPlan(req.body).then((data)=>{
            res.json(data)
        })
    },

    deletePlan:(req,res)=>{
        adminControl.deletePlan(req.body).then((data)=>{
            res.json(data)
        })
    },

    blockUser:(req,res)=>{
        adminControl.blockUser(req.body).then((data)=>{
            res.json(data)
        })
    },

    unblockUser:(req,res)=>{
        adminControl.unblockUser(req.body).then((data)=>{
            res.json(data)
        })
    },

    deletePayment:(req,res)=>{
        adminControl.deletePayment(req.body).then((data)=>{
            res.json(data)
        })
    },

}