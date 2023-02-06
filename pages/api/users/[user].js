import {getAlbumByUser} from '@lib/album.js'

async function handler(req,res){

    if (req.method == 'GET'){
        try{

            const {
                query: { user },
            } = req;
            //console.log(user)
            const {result, error} = await getAlbumByUser(user)
            if (error) throw new Error(error)
            if(error){
                return res.status(200).json({error: "reviews not found"})
            }
            return res.status(200).json({result})
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed`)
}

export default handler;