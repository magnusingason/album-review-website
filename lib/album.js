import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

let client
let db
let albums

async function init(){
    if (db) return
    try{
        client = await clientPromise
        db = client.db('Albums')

        if(!db.collection('Album')){
        albums = db.createCollection("Album", {
            validator: {
               $jsonSchema: {
                  bsonType: "object",
                  required: [ "title","artist","rating","summary","picture" ],
                  properties: {
                     name: {
                        bsonType: "string",
                        description: "must be a string and is required",
                        unique: true
                     },
                     artist: {
                        bsonType: "string",
                        description: "must be a string and is required"
                     },
                     rating:{
                        bsonType: "number",
                        description: "must be a number and is required"
                     },
                     summary:{
                        bsonType: "String",
                        description: "must be a string and is not required"
                     },
                     picutre:{
                        bsonType: "String",
                        description: "An url on the internet with a picture of the album you want to review"
                     }
                  }
               }
            }
         })
        }else{
        albums = db.collection('Album')
        }

        albums = db.collection('Album')
    }catch (error){
        throw new Error('failed to establish connection to database')
    }
}

;(async () => {
    await init()
})

export async function postAlbums(json){
    try{
        if(!albums) await init()
        albums.insertOne(json, { unique: true }), function (err, res){
            console.log('album inserted')
        }
            
        }catch (error){
            return {error: 'could not fetch albums'}
        }

}

export async function getAlbums(){
    try {
        if(!albums) await init()
        const result = await albums.find({})
            //.map(user => ({ ...user, _id: user.id.toString() }))
            .toArray()

        return {albums: result}
    }catch (error){
        return {error: 'could not fetch albums'}
    }
}

export async function getAlbum(id){
    let result
    try {

        if(!albums) await init()
        //id = `ObjectId('${id}')`
        const result = await albums.findOne({ "_id": ObjectId(`${id}`) })
        return {album: result}
    }catch (error){
        return {error: 'could not fetch albums'}
    }
}

export async function getQuery(query){
    try {

        if(!albums) await init()
        //id = `ObjectId('${id}')`
        const result = await albums.find({ 'title' : { '$regex' : query, '$options' : 'i' } }).toArray()
        return {album: result}
    }catch (error){
        return {error: 'could not fetch albums'}
    }
}

export async function getAlbumByUser(user){
    try {
        if(!albums) await init()
        const result = await albums.find({"user": `${user}`}).toArray()
        return {result: result}
    }catch (error){
        return {error: 'could not fetch albums'}
    }
}