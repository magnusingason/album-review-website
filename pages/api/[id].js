import {getAlbum} from '@lib/album.js'


async function handler(req,res){

    const {
        query: { id },
      } = req;
    if (req.method == 'GET'){
        try{
            const {album, error} = await getAlbum(id)
            if (error) throw new Error(error)

            return res.status(200).json({album})
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
    res.setHeader('Allow', ['GET'])
    res.status(425).end(`Method ${req.method} is not allowed`)
}

export default handler;