const userControl=require("./userControl")
const jwt=require("jsonwebtoken")
const jwt_decode=require('jwt-decode')
const fs=require('fs')

require('dotenv').config()


module.exports={

    Signup : (req, res, next) => {
       userControl.signup(req.body).then((data)=>{
        if(data.user) res.json({"responce":false})
        else res.json({"responce":true})
       })
    },

    userlogin : (req,res)=>{
        if(req.body.type="business"){
            console.log("ddd");
            userControl.businessLogin(req.body).then(async(data)=>{ 
                if(data.status){
                    if(data.user){
                        userId=data.id.toString()
                        const accessToken =await jwt.sign(data,process.env.Jwt_Access_Token)
                        res.json({token:accessToken,user:true,password:true,data})
                    }else{
                        res.json({user:true,password:false})
                    }
                }else{
                    res.json({user:false})
                }
                
            })
        }else{
            console.log("111");
            userControl.normalLogin(req.body).then(async(data)=>{ 
                if(data.status){
                    if(data.user){
        
                        userId=data.id.toString()
                        const accessToken =await jwt.sign(data,process.env.Jwt_Access_Token)
                        res.json({token:accessToken,user:true,password:true,data})
                    }else{
                        res.json({user:true,password:false})
                    }
                }else{
                    res.json({user:false})
                }
            })
        }
    }, 

    userVerification:(req,res)=>{
        const token=req.headers.autherization.split(' ')[1]
        jwt.verify(token,process.env.Jwt_Access_Token,(err,user)=>{
            if(err) return res.json({user:false})
            res.json({user:true})
        })
    },

    userProfile  : (req,res)=>{ 
        try{
        const token=req.headers.autherization.split(' ')[1]
        var decoded = jwt_decode(token);
        res.json({'jj':'hhhh'})
        }catch(err){ 
            console.log(err);
        }
    },

    postUpload:(req,res)=>{
        try{
        userControl.addPost(req.body).then((data)=>{
        let imag = req.files.image
        imag.mv('./public/images/'+data+'.jpg', (err, data) => {
            if (err) {
                console.log(err); 
            } else { 

            }
        })
        res.json(data)
        })
    }catch(err){
        console.log(err);
    }
    },

    getPost:(req,res)=>{
        userControl.getPost().then((data)=>{
            res.json(data)
        })
    },

    getPostuser:(req,res)=>{
        if(req.query.id!="undefined") req.body.id=req.query.id
        userControl.getPostuser(req.body).then((data)=>{
            res.json(data)
        }).catch(()=>{
            res.json({data:false})
        })
    },

    getLoginUser:(req,res)=>{
        userControl.getLoginUser(req.body).then((data)=>{
            res.json(data)
        })
    },

    likePost:(req,res)=>{
        userControl.likePost(req.body).then((data)=>{
            res.json(data)
        })
    },

    addComment:(req,res)=>{
        userControl.addComment(req.body).then((data)=>{
            res.json(data)
        })
    },

    getPlans:(req,res)=>{
        userControl.getPlans().then((data)=>{
            res.json(data)
        })
    },

    doPayment:(req,res)=>{
        userControl.doPayment(req.body).then((data)=>{
            userControl.generateRazorpay(data).then((data)=>{
                res.json(data)
            })
        })
    },

    verifyPayment:(req,res)=>{
        userControl.verifyPayment(req.body).then((data)=>{
            res.json(data)
        })
    },
    
    getPayment:(req,res)=>{
        userControl.getPayment(req.body).then((data)=>{
            res.json(data)
        })
    },

    followUser:(req,res)=>{
        userControl.followUser(req.body).then((data)=>{
            res.json(data)
        })
    },

    editProfile:(req,res)=>{
        try{ 
            let id=req.body.id
            userControl.editProfile(req.body).then((data)=>{
            let image = req.files?.image
            if(image){
            image.mv('./public/images/'+id+'.jpg', (err, data) => {
                if (err) {
                    console.log(err); 
                } else {
                  res.json(data)
                }
            })
        }
        res.json(data)
            })
        }catch(err){
            console.log(err);
        }
    },

    addHighlights:(req,res)=>{ 
        userControl.addHighlights(req.body).then((data)=>{
            res.json(data)
        })
    },

    googleLogin:(req,res)=>{ 
        userControl.googleLogin(req.body).then(async(data)=>{
            if(data.status){
                userId=data.id.toString()
                const accessToken =await jwt.sign(data,process.env.Jwt_Access_Token)
                res.json({token:accessToken,user:true,password:true,data})
            }else{
                console.log("5565");
            }
        })
    },

    getUserDetails:(req,res)=>{ 
        if(req.query.id!="undefined") req.body.id=req.query.id
        userControl.getUserDetails(req.body).then((data)=>{
            res.json(data)
        })
    },

    search:(req,res)=>{ 
        userControl.search(req.body).then((data)=>{
            res.json(data)
        })
    },

    removePost:(req,res)=>{ 
        userControl.removePost(req.params.Id).then((data)=>{
            let pat='./public/images/'+req.params.Id+'.jpg'
            fs.unlink(pat,(err)=>{
                if(err){

                }
            })
            res.json(data)
        })
    },

    deleteComment:(req,res)=>{ 
        userControl.deleteComment(req.params.Id).then((data)=>{
            res.json(data)
        })
    },

    editCommentPost:(req,res)=>{ 
        userControl.editCommentPost(req.body).then((data)=>{
            res.json(data)
        })
    },

    getComments:(req,res)=>{
        userControl.getComments(req.params.Id).then((data)=>{
            res.json(data)
        })
    },

    addConversation:(req,res)=>{
        userControl.addConversation(req.body).then((data)=>{
            res.json(data)
        })
    },

    getConversations:(req,res)=>{
        userControl.getConversations(req.body).then((data)=>{ 
            res.json(data)
        })
    }, 

    getSingleCoversations:(req,res)=>{
        req.body.endUserId=req.params.id
        userControl.getSingleCoversations(req.body).then((data)=>{
            res.json(data)
        })
    },

    addMessages:(req,res)=>{
        userControl.addMessages(req.body).then((data)=>{
            res.json(data)
        })
    },

    getMessages:(req,res)=>{
        userControl.getMessages(req.params.Id).then((data)=>{
            res.json(data)
        })
    },

    getFollowers:(req,res)=>{
        userControl.getFollowers(req.body.id).then((data)=>{
            res.json(data)
        })
    },

}