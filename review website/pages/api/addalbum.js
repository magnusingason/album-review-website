import {postAlbums} from '@lib/album.ts'

async function handler(req,res){
    if (req.method == 'POST'){
        try{
            const {error} = await postAlbums(req.body)
            if (error) throw new Error(error)

            return res.status(200).json({albums})
        }catch(error){
            return res.status(500).json({error: error.message})
        }
    }
    
    res.setHeader('Allow', ['POST'])
    res.status(425).end(`Method ${req.method} is not allowed`)
}

export default handler;