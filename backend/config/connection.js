const mongoClient=require('mongodb').MongoClient

const state={
   db:null
}

module.exports.connect=(done)=>{
    const Url="mongodb://localhost:27017"
    const dbName='wrapz'

    mongoClient.connect(Url,(err,data)=>{
        if(err) return done(err)

        state.db=data.db(dbName)
        done()
    })

}

module.exports.get=()=>{
    return state.db
}
