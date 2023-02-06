import {postUser, getUser} from '@lib/user.js'

async function handler(req,res){
    if (req.method == 'POST'){
        try{

            let {user, errorr} = await getUser(req.body.username)
            if(user){
                if(user.username == req.body.username){
                    return res.status(200).json({error: "username has been taken"})
                }
    
            }
            
            var CryptoJS = require("crypto-js/core");
            CryptoJS.AES = require("crypto-js/aes");
            let password = req.body.password;
            let encrypted = CryptoJS.AES.encrypt(password, process.env.CRYPT_secret).toString();
            req.body.password = encrypted;

            const {userr,error} = await postUser(req.body)
            if (error) throw new Error(error)

            return res.status(200).json(req.body)
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
    res.setHeader('Allow', ['POST'])
    res.status(425).end(`Method ${req.method} is not allowed`)
}

export default handler;