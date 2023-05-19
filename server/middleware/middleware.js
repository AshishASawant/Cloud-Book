const jwt=require('jsonwebtoken');
const jwtSecretkey='try to hack this'

fetchdata=(req,res,next)=>{
    try {
    //extracting the token from the request header
    let token=req.header('auth-token')

    //decoding the to check the integrity of the token
    const decode = jwt.verify(token, jwtSecretkey)
    req.userid=decode.id
    next() 
    } catch (error) {
        res.send('Authenticate using corrrect credentials')
    }
   
}

module.exports=fetchdata