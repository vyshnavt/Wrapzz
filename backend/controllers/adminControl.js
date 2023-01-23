const { ObjectId } = require('mongodb')
const db=require('../config/connection')
const constants = require('../config/constants')
module.exports={

    adminlogin:(admindata)=>{
        return new Promise(async(resolve,reject)=>{
            let admin=await db.get().collection(constants.ADMIN).findOne({email:admindata.email})
            if(admin){
                if(admin.password==admindata.password){
                    resolve({data:true})
                }else{
                    resolve({data:false})
                }
            }else{
                resolve({data:false})
            }
        })
    },
    
    addCategory:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let category=await db.get().collection(constants.CATEGORY).findOne({name:data.name})
            if(category){
                resolve({data:false})
            }else{
                db.get().collection(constants.CATEGORY).insertOne(data).then(()=>{
                    resolve({data:true})
                })
            }
        })

    },

    getCategory:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(constants.CATEGORY).find().toArray().then((data)=>{
                resolve(data)
            })
        })
    },

    editCategory:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let category=await db.get().collection(constants.USER).findOne({category:data.name})
            if(category){
                resolve({data:false})
            }else{
                db.get().collection(constants.CATEGORY)
                .updateOne({_id:ObjectId(data.id)},
                {$set:{name:data.name}}).then((data)=>{
                    resolve({data:true})
                })
            }
        })
    },

    addPlan:(data)=>{
        return new Promise(async(resolve,reject)=>{
            let plan=await db.get().collection(constants.PLANS).findOne({name:data.name})
            if(plan)  resolve({data:false})
            else{
            db.get().collection(constants.PLANS).insertOne(data).then((data)=>{
                resolve(data)
            })
        }
        })
    },

    editPlan:(planData)=>{
        return new Promise(async(resolve,reject)=>{
            let plan= await db.get().collection(constants.PLANS).findOne({name:planData.name})
            if(plan&&plan._id!=planData.id)
            resolve({data:false})
            else{
                db.get().collection(constants.PLANS).updateOne({_id:planData},{
                    $set:{
                        name:planData.name,
                        amount:planData.amount,
                        days:planData.days
                    }
                }).then((data)=>{
                    resolve(data)
                })
            }
            
        })
    },

    deletePlan:(planData)=>{
        return new Promise((resolve,reject)=>{
            console.log(planData);
            db.get().collection(constants.PLANS).updateOne({_id:ObjectId(planData.data)},{
                $set:{
                    status:false
                }
            }).then((data)=>{
                resolve(data)
            })
        })
    },

    getPlans:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(constants.PLANS).find().toArray().then((data)=>{
                resolve(data)
            })
        })
    },

    getPayments:()=>{
        return new Promise(async(resolve,reject)=>{
            let payments=await db.get().collection(constants.PAYMENT).aggregate([
                {
                    $lookup:{
                        from:constants.BUSINESSUSER,
                        localField:'id',
                        foreignField:'_id',
                        as:'user'
                    }
                }
            ]).toArray()
        resolve(payments)
        console.log(payments[0]);
        })
    },

    getNormalUser:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(constants.NORMALUSER).find().toArray().then((data)=>{
                resolve(data)
            })     
        })
    },

    getBusinessUser:()=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(constants.BUSINESSUSER).find().toArray().then((data)=>{
                resolve(data)
            })     
        })
    },

    blockUser:(userData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(userData.data)},{
                $set:{
                    status:false
                }
            }).then((data)=>{
                resolve(data)
            })
        })
    },

    unblockUser:(userData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(userData.data)},{
                $set:{
                    status:true
                }
            }).then((data)=>{
                resolve(data)
            })
        })
    },

    deletePayment:(paymentData)=>{
        return new Promise((resolve,reject)=>{
            db.get().collection(constants.PAYMENT).deleteOne({_id:ObjectId(paymentData.data)}).then((data)=>{
                resolve;
            })
        })
    }

    

}