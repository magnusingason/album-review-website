import {getUser} from '@lib/user.js'


//this code is no longer used.

async function handler(req,res){

    if (req.method == 'GET'){
        try{
            var CryptoJS = require("crypto-js/core");
            CryptoJS.AES = require("crypto-js/aes");

            const {
                query: { id },
            } = req;

            const {user, error} = await getUser(id)
            user.password = CryptoJS.AES.decrypt( user.password, process.env.CRYPT_secret).toString(CryptoJS.enc.Utf8);
            if (error) throw new Error(error)
            if(error){
                return res.status(200).json({error: "account not found"})
            }

            return res.status(200).json({username: user.username, password: user.password})
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed`)
}

export default handler;