const db=require("../config/connection")
const constants = require("../config/constants")
const bcrypt= require('bcrypt')
const ObjectId=require('mongodb').ObjectId
const Razorpay = require('razorpay');
require('dotenv').config()

var instance = new Razorpay({
    key_id:'rzp_test_5uPpdrMxeSFhjj',
    key_secret:"31x9YumqgWID2IKajNcbZUQe",
  });

module.exports ={
 signup : (userdata)=>{
    userdata.date=new Date()
    userdata.followers=[]
    userdata.following=[]
    userdata.user='normal'
    userdata.image='../../../assets/profilee.png'
    if(userdata.user=="business"){
    userdata.plandate=new Date()
    userdata.expirydate=new Date()
    userdata.expirydate.setDate(userdata.plandate.getDate()+30)
    return new Promise(async(resolve,reject)=>{
        db.get().collection(constants.BUSINESSUSER).findOne({email:userdata.email}).then(async (data)=>{
            if(data){
                resolve({user:true})
            }else{
                userdata.password=await bcrypt.hash(userdata.password,10)
                db.get().collection(constants.BUSINESSUSER).insertOne(userdata).then((data)=>{
                    resolve({user:false})
                })
            }
        })
    })
    }else{
        return new Promise(async(resolve,reject)=>{
            db.get().collection(constants.BUSINESSUSER).findOne({email:userdata.email}).then(async (data)=>{
                if(data){
                    resolve({user:true})
                }else{
                    userdata.password=await bcrypt.hash(userdata.password,10)
                    db.get().collection(constants.BUSINESSUSER).insertOne(userdata).then((data)=>{
                        resolve({user:false})
                    })
                }
            })
        })
    }
 },

 businessLogin:(logindata)=>{
    return new Promise((resolve,reject)=>{
        let responce={}
        db.get().collection(constants.BUSINESSUSER).findOne({email:logindata.email}).then((data)=>{
            if(data){
                bcrypt.compare(logindata.password,data.password).then((result)=>{
                    if(result){
                        if(!data.status){
                        responce.id=data._id
                        responce.status=true
                        responce.blocked=false
                        responce.user=data.name
                        responce.type=data.user
                        }else{
                        responce.id=data._id
                        responce.status=true
                        responce.blocked=true
                        responce.user=data.name
                        responce.type=data.user
                        }
                        resolve(responce)
                    }
                    else{
                        responce.status=true
                        responce.user=false
                        resolve(responce)
                    }
                })
            }else{
                responce.status=false
                resolve(responce)
            }
        })
    })
},

normalLogin:(logindata)=>{
    return new Promise((resolve,reject)=>{
        let responce={}
        db.get().collection(constants.NORMALUSER).findOne({email:logindata.email}).then((data)=>{
            if(data){
                bcrypt.compare(logindata.password,data.password).then((result)=>{
                    if(result){
                        if(!data.status){
                            responce.id=data._id
                            responce.status=true
                            responce.blocked=false
                            responce.user=data.name
                            responce.type=data.user
                            responce.type=data.type
                            }else{
                            responce.id=data._id
                            responce.status=true
                            responce.blocked=true
                            responce.user=data.name
                            responce.type=data.user
                            responce.type=data.type
                            }
                            resolve(responce)
                    }
                    else{
                        responce.status=true
                        responce.user=false
                        resolve(responce)
                    }
                })
            }else{
                responce.status=false
                resolve(responce)
            }
        })
    })
}, 
 
addPost:(data)=>{
    return new Promise((resolve,reject)=>{
        console.log(data);
        let post={
            user:ObjectId(data.id),
            description:data.description, 
            date:new Date(),
            like:[],
            comment:[],
            status:true,
            highlights:false,
            commentCount:0,
            likeCount:0
        } 
        db.get().collection(constants.POST).insertOne(post).then((data)=>{          
            resolve(data.insertedId)
        })
    })
},
 
getPost:()=>{
    return new Promise(async (resolve,reject)=>{
        let data=await db.get().collection(constants.POST).aggregate([
            {
                $lookup:{
                    from:constants.COMMENT,
                    localField:'comment',
                    foreignField:'_id',
                    as:'comment'
                }
            },
            {
                $lookup:{
                    from:constants.BUSINESSUSER,
                    localField:'user',
                    foreignField:'_id',
                    as:'user'
                }
            }
        ]).sort({date:-1}).toArray()
            resolve(data)
    })
},

getPostuser:(userdata)=>{
    return new Promise(async (resolve,reject)=>{
        try{
            let data=await db.get().collection(constants.POST).aggregate([
                {
                    $match:{
                        user:ObjectId(userdata.id)
                    }
                },
                {
                    $lookup:{
                        from:constants.COMMENT,
                        localField:'comment',
                        foreignField:'_id',
                        as:'comment'
                    }
                },
                {
                    $lookup:{
                        from:constants.BUSINESSUSER,
                        localField:'user',
                        foreignField:'_id',
                        as:'user'
                    }
                }
            ]).sort({date:1}).toArray()
                resolve(data)
        }catch(err){
            reject()
        }
    })
},

likePost:(detail)=>{
    return new Promise(async (resolve,reject)=>{
      let post=await db.get().collection(constants.POST).findOne({_id:ObjectId(detail.postId)})
        let user=post.like.findIndex(user => user==detail.id)
        console.log(user);
        if(user==-1){
            db.get().collection(constants.POST).updateOne({_id:ObjectId(detail.postId)},{
                $push:{
                    like:detail.id
                }
            }).then(()=>{
                resolve({status:true})
            })
        }else{
            db.get().collection(constants.POST).updateOne({_id:ObjectId(detail.postId)},{
                $pull:{
                    like:detail.id
                }
            }).then(()=>{
                resolve({status:false})
            })
        }
    })
},

addComment:(data)=>{
    return new Promise((resolve,reject)=>{
        detail={
            comment:data.comment,
            postId:ObjectId(data.postId),
            userId:ObjectId(data.id),
            date:new Date(),
            username:data.username
        }
        db.get().collection(constants.COMMENT).insertOne(detail).then((data)=>{
            db.get().collection(constants.POST).updateOne({_id:ObjectId(detail.postId)},
                {
                    $set:{
                       "comment":data.insertedId
                    }
                },
                {
                    $inc:{"commentCount":1}
                }).then((result)=>{
                    resolve(result)
            })
        })
    })
},

getPlans:()=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(constants.PLANS).find({status:true}).toArray().then((data)=>{
            resolve(data)
        })
    })
},

doPayment:(data)=>{
    return new Promise(async(resolve,reject)=>{
        let plan=await db.get().collection(constants.PLANS).findOne({name:data.name})
        data.date=new Date()
        data.id=ObjectId(data.id)
        data.status=false
        data.amount=plan.amount
        data.days=plan.days
        db.get().collection(constants.PAYMENT).insertOne(data).then((data)=>{
            resolve(data)
        })
    })
},

generateRazorpay:async(data)=>{
    let plan=await db.get().collection(constants.PAYMENT).findOne({_id:data.insertedId})
    return new Promise((resolve,reject)=>{
        var options = {
            amount: plan.amount*100,
            currency: "INR",
            receipt: ""+data.insertedId
          };
          instance.orders.create(options,(err,order)=>{
            if(err) console.log(err);
            resolve(order)
          })
    })
},

verifyPayment:(data)=>{
    return new Promise(async(resolve,reject)=>{      
        let body=data.razorpay_order_id + "|" + data.razorpay_payment_id;
        const crypto = require("crypto");
        let expectedSignature = crypto.createHmac('sha256', '31x9YumqgWID2IKajNcbZUQe')
                                        .update(body.toString())
                                        .digest('hex');
        let response = {status:false}
        if(expectedSignature === data.razorpay_signature){
        response={status:true}
        let payment=await db.get().collection(constants.PAYMENT).findOne({_id:ObjectId(data.payment_id)})
        db.get().collection(constants.PAYMENT).updateOne({_id:ObjectId(data.payment_id)},{
            $set:{
                status:true
            }
        })
        let user=await db.get().collection(constants.BUSINESSUSER).findOne({_id:ObjectId(data.id)})
        user.expirydate.setDate(user.expirydate.getDate()+parseInt(payment.days))
        db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(data.id)},
        {
            $push:{ 
                payment:ObjectId(data.payment_id)
            },
            $set:{
                expirydate:user.expirydate
            }
        }).then(()=>{
            resolve(response);
        })
        }else{
            resolve(response);
        }
        });   
},

getPayment:(data)=>{
    return new Promise(async(resolve,reject)=>{
        let detail=await db.get().collection(constants.BUSINESSUSER).aggregate([
                {
                    $match:{
                        _id:ObjectId(data.id)
                    }
                },
                {
                    $lookup:{
                        from:constants.PAYMENT,
                        localField:'payment',
                        foreignField:'_id',
                        as:'details'
                    }
                }
        ]).toArray()
        resolve(detail[0])
    })
},

followUser:(data)=>{
    return new Promise(async(resolve,reject)=>{
        let user=await db.get().collection(constants.BUSINESSUSER).findOne({_id:ObjectId(data.id),following:ObjectId(data.data)})
        if(user){
            db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(data.id)},{
                $pull:{
                    following:ObjectId(data.data)
                }            
            }).then((dat)=>{
                db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(data.data)},{
                    $pull:{
                        followers:ObjectId(data.id)
                    } 
                }).then((data)=>{
                    resolve(data)
                })
            })
        }else{
            db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(data.id)},{
                $push:{
                    following:ObjectId(data.data)
                }
            }).then((dat)=>{
                db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(data.data)},{
                    $push:{
                        followers:ObjectId(data.id)
                    }
                }).then((data)=>{
                    console.log("4");
                    resolve(data)
                })
            })
        }
    })   
},

editProfile:(data)=>{
    return new Promise((resolve,reject)=>{
        console.log(data);
        db.get().collection(constants.BUSINESSUSER).updateOne({_id:ObjectId(data.id)},{
            $set:{
                name:data.name,
                number:data.number,
                category:data.category,
                about:data.about,
                image:data.imagename
            }
        }).then((data)=>{
            resolve(data)
        })
    })
},

addHighlights:(data)=>{
    return new Promise(async(resolve,reject)=>{
        let post=await db.get().collection(constants.POST).findOne({_id:ObjectId(data.postId)})
        if(post.highlights){
            db.get().collection(constants.POST).updateOne({_id:ObjectId(data.postId)},{
                $set:{
                    highlights:false
                }
                
            }).then((dat)=>{
                resolve(data)
            })
        }else{
            db.get().collection(constants.POST).updateOne({_id:ObjectId(data.postId)},{
                $set:{
                    highlights:true
                }
                
            }).then((dat)=>{
                resolve(data)
            })
        }
        
    })
},

googleLogin:(userdata)=>{
    return new Promise(async(resolve,reject)=>{
        let responce={}
        let user=await db.get().collection(constants.BUSINESSUSER).findOne({email:userdata.email})
        if(user&&!user.status){
            responce.id=user._id
            responce.status=true
            responce.blocked=false
            responce.user=user.name
            responce.type=user.user
            responce.type=user.type
        }else if(user&&user.status){
            responce.id=user._id
            responce.status=true
            responce.blocked=true
            responce.user=user.name
            responce.type=user.user
            responce.type=user.type
        }else{
            userdata.date=new Date()
            userdata.name=userdata.name
            userdata.email=userdata.email
            userdata.number=userdata.number
            userdata.category="Others"
            userdata.password=userdata.name
            userdata.about=''
            userdata.image='google'
            userdata.user="business"
            userdata.payment=[]
            userdata.status=true
            userdata.followers=[]
            userdata.following=[]
            userdata.plandate=new Date()
            userdata.expirydate=new Date()
            userdata.expirydate.setDate(userdata.plandate.getDate()+30)
            db.get().collection(constants.BUSINESSUSER).insertOne(userdata).then((data)=>{
            responce.id=data.insertedId
            responce.status=true
            responce.blocked=false
            responce.user=userdata.name
            responce.type=userdata.user
            responce.type="business"
                console.log(data);
                
            })
        }
        resolve(responce)
    })
},

getUserDetails:(userdata)=>{
    return new Promise(async (resolve,reject)=>{
        let user= await db.get().collection(constants.BUSINESSUSER).findOne({_id:ObjectId(userdata.id)})
        try{
            let data=await db.get().collection(constants.BUSINESSUSER).aggregate([
                {
                    $match:{
                        _id:ObjectId(userdata.id)
                    }
                },
                {
                    $lookup:{
                        from:constants.BUSINESSUSER,
                        localField:'followers',
                        foreignField:'_id',
                        as:'followers'
                    }
                },
                {
                    $lookup:{
                        from:constants.BUSINESSUSER,
                        localField:'following',
                        foreignField:'_id',
                        as:'following'
                    }
                }
            ]).toArray()
                resolve(data[0])
        }catch(err){
            reject()
        }
    })
},

search:(search)=>{
    return new Promise((resolve,reject)=>{
        let data={}
        db.get().collection(constants.BUSINESSUSER).find({name:{$regex:search.data,$options:"$i"}}).toArray().then((userData)=>{
            db.get().collection(constants.BUSINESSUSER).find({category:{$regex:search.data,$options:"$i"}}).toArray().then(async(categoryData)=>{
                let postData=await db.get().collection(constants.POST).aggregate([
                    {
                        $match:{
                            description:{
                                $regex:search.data,$options:"$i"
                            }
                        }
                    },
                    {
                        $lookup:{
                            from:constants.COMMENT,
                            localField:'comment',
                            foreignField:'_id',
                            as:'comment'
                        }
                    },
                    {
                        $lookup:{
                            from:constants.BUSINESSUSER,
                            localField:'user',
                            foreignField:'_id',
                            as:'user'
                        }
                    }
                ]).sort({date:-1}).toArray()
                data.user=userData
                data.category=categoryData
                data.post=postData
                resolve(data)
            })
        })
    })
},

getLoginUser:(userdata)=>{
    return new Promise(async (resolve,reject)=>{
        let userdetail=await db.get().collection(constants.BUSINESSUSER).findOne({_id:ObjectId(userdata.id)},{name:1,number:0})
            let date=new Date()
            console.log(date);
            console.log(userdetail.expirydate);
            console.log(userdetail.expirydate-date);
            let data={}
             data.name=userdetail.name
             data._id=userdetail._id
             data.user=userdetail.user
             data.image=userdetail.image
             data.expired=false
             usertype=userdetail.user
            if(date>userdetail.expirydate){
                data.expired=true
            }
             resolve(data)
    })
},

removePost:(postId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(constants.POST).deleteOne({_id:ObjectId(postId)}).then((data)=>{
            resolve()
        })
    })
},

deleteComment:(commentId)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(constants.COMMENT).deleteOne({_id:ObjectId(commentId)}).then((data)=>{
            resolve()
        })
    })
},

editCommentPost:(commentdata)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(constants.COMMENT).updateOne({_id:ObjectId(commentdata.commentId)},
        {
            $set:{
                comment:commentdata.comment
            }
        }).then((data)=>{
            resolve()
        })
    })
},

getComments:(postid)=>{
    try{
        return new Promise(async(resolve,reject)=>{
            let data= await db.get().collection(constants.COMMENT).aggregate([
                { 
                    $match:({postId:ObjectId(postid)})
                },
                {
                    $lookup:{
                        from:constants.BUSINESSUSER,
                        localField:'userId',
                        foreignField:'_id',
                        as:'user'
                    }
                }
            ]).toArray()    
            resolve(data)
        })
    }catch(err){
        console.log(err);
    }
},

addConversation:(detail)=>{
    
    return new Promise((resolve,reject)=>{
        db.get().collection(constants.CONVERSATION).insertOne(detail).then((data)=>{
            resolve(data)
        })
    })
},

getConversations:(detail)=>{
    console.log(detail);
    return new Promise(async(resolve,reject)=>{
        let conversations= await db.get().collection(constants.CONVERSATION).aggregate([
            {
                $match:{
                    members:{
                        $in:[ObjectId(detail.id)]
                    }
                }
            },
            {
                $project:{
                    user:{
                        $arrayElemAt:['$members',0]
                      },
                      user2:{
                        $arrayElemAt:['$members',1]
                      },
                      members:1
                }
            },
            {
                $project:{
                    user2:{
                        $cond:{
                          if:{
                            $ne:['$user2',ObjectId(detail.id)]
                            
                          },
                          then:'$user2',
                          else:0
                        }
                      },
                      user:{
                        $cond:{
                          if:{
                            $ne:['$user',ObjectId(detail.id)]
                          },
                          then:'$user',
                          else:0
                        }
                      },
                      members:1
                }
            },
            {
                $lookup:{
                    from:constants.BUSINESSUSER,
                    localField:'user2',
                    foreignField:'_id',
                    as:'user2'
                }
            },
            {
                $lookup:{
                    from:constants.BUSINESSUSER,
                    localField:'user',
                    foreignField:'_id',
                    as:'user'
                }
            }
        ]).toArray()
        resolve(conversations)
    })
},

getSingleCoversations:(detail)=>{
    return new Promise(async(resolve,reject)=>{
        console.log(detail);
        let conversation={
            members:[
                ObjectId(detail.id),
                ObjectId(detail.endUserId)
            ]
        }
        let conversationid= await db.get().collection(constants.CONVERSATION).findOne({members:{$all:[ObjectId(detail.id),ObjectId(detail.endUserId)]}})
        if(conversationid){
            resolve(conversationid) 
        }else{
            db.get().collection(constants.CONVERSATION).insertOne(conversation).then((data)=>{
                resolve(data)
            })
        }
    })
}, 

getMessages:(detail)=>{
    return new Promise((resolve,reject)=>{
        db.get().collection(constants.MESSAGES).find({conversationId:detail}).toArray().then((data)=>{
            resolve(data)
        })
    })
},

addMessages:(detail)=>{
    return new Promise((resolve,reject)=>{
        let messageDetail={
            conversationId:detail.conversationId,
            date:new Date(),
            message:detail.message,
            senderId:detail.id
        }
        db.get().collection(constants.MESSAGES).insertOne(messageDetail).then((data)=>{
            resolve(data)
        })
    })
},

getFollowers:(id)=>{
    try{
        return new Promise(async(resolve,reject)=>{
            let data= await db.get().collection(constants.BUSINESSUSER).aggregate([
                { 
                    $match:({_id:ObjectId(id)})
                },
                {
                    $project:{
                        followers:'$followers'
                    }
                },
                {
                    $unwind:
                    {
                        path:'$followers'
                    }
                },
                {
                    $lookup:{
                        from:constants.BUSINESSUSER,
                        localField:'followers',
                        foreignField:'_id',
                        as:'followers'
                    }
                }
            ]).toArray()  
            console.log(data);  
            resolve(data)
        })
    }catch(err){
        console.log(err);
    }
},

}

// getPostuser:(userdata)=>{
//     return new Promise(async (resolve,reject)=>{
//         try{
//             let data=await db.get().collection(constants.POST).aggregate([
//                 {
//                     $match:{
//                         user:ObjectId(userdata.id)
//                     }
//                 },
//                 {
//                     $lookup:{
//                         from:constants.COMMENT,
//                         localField:'comment',
//                         foreignField:'_id',
//                         as:'comment'
//                     }
//                 },
//                 {
//                     $unwind:'$comment'
//                 },
//                 {
//                     $project:{
//                         description:1,
//                         date:1,
//                         like:1,
//                         user:1,
//                         status:1,
//                         highlights:1,
//                         allcomment:1,
//                         comment:1,
//                         commentuser:'$comment.userId'
//                     }
//                 },
//                 {
//                     $lookup:{
//                     from:constants.BUSINESSUSER,
//                     localField:'commentuser',
//                     foreignField:'_id',
//                     as:'commentuser'
//                     }
//                 },
//                 {
//                     $lookup:{
//                         from:constants.BUSINESSUSER,
//                         localField:'user',
//                         foreignField:'_id',
//                         as:'user'
//                     }
//                 }
//             ]).sort({date:1}).toArray()
//                 resolve(data)
//         }catch(err){
//             reject()
//         }
//     })
// }



