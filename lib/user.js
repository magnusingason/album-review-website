import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

let client
let db
let Users

async function init(){
    if (db) return
    try{
        client = await clientPromise
        db = client.db('Albums')

        if(!db.collection('Users')){
        Users = db.createCollection("Users", {
            validator: {
               $jsonSchema: {
                  bsonType: "object",
                  required: [ "username","password"],
                  properties: {
                     username: {
                        bsonType: "string",
                        description: "must be a string and is required",
                        unique: true
                     },
                     password: {
                        bsonType: "string"
                          }
                     }
                  }
               }
            }
         )
        }else{
        Users = db.collection('Users')
        }

        Users = db.collection('Users')
    }catch (error){
        throw new Error('failed to establish connection to database')
    }
}

;(async () => {
    await init()
})

export async function postUser(json){
    try{
        if(!Users) await init()
        const result = await Users.insertOne(json, { unique: true })
            return {user: result}
        }
        catch (error){
            return {error: 'could not create user'}
        }

}

export async function getUser(username){
    let result
    try {

        if(!Users) await init()
        const result = await Users.findOne({ username: `${username}` })
        return {user: result}
    }catch (error){
        return {error: 'could not fetch users'}
}
}