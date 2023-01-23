export interface userInfo {
    userId?:string,
    name?:string,
    email?:string,
    password?:string,
    responce?:boolean
 }
 
 export interface loginInfo {
    email:string,
    password:string,
 }
 
 export interface userdata {
   user:string,
   id:string,
   status:boolean
 }
 
 export interface verifylogin {
    token?:string,
    user?:boolean,
    password?:boolean,
    data:userdata
 }
 
 export interface routeverify {
    user:boolean
 }

 export interface likedata{
   postId:string
 }

 export interface commentdata{
   comment:string,
   postId:string
 }

 export interface postdata{
   user:string,
   img:string,
   postId:string,
   date:Date,
   description:string,
   like?:number
 }

 export interface postdatas{
  data:postdata[]
 }

 export interface category{
  name:string,
  id:string
  }
  export interface paymentdata{
    name:string,
    id:string
  }

  export interface payment{
    id:string,
    amount:number,
    receipt:string,
  }

  export interface Plan{
    _id:string
    name:string
    amount:number
    days:number
  }

  export interface exa{
    about?:string 
    category?: string
    date?:string
    email?:string
    expirydate?:string 
    followers?:[exa]
    following?:[exa]
    image?:null|boolean
    name?:string
    number?:number
    password?:string
    payment?:string[]
    plandate?:string
    status?:boolean
    user?:string
    _id:string
  }

  export interface loginusercheck{
    name?:string
    user?:string
    _id?:string
    image?:boolean
    expired?:boolean
  }