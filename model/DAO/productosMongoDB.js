import { ObjectId } from "mongodb"
import CnxMongoDB from "../DBMongo.js"



class ModelMongoDB{
    obtenerProductos = async id => {
        if(!CnxMongoDB.connection) return id? {} : []
        if(id){
            const producto = await CnxMongoDB.db.collection('productos').findOne({_id: new ObjectId(id)})
            return producto
        }
        else{
            const productos = await CnxMongoDB.db.collection('productos').find({}).toArray()
            return productos
        }
    }

    guardarProductos = async producto => {
        if(!CnxMongoDB.connection) return {} 

        await CnxMongoDB.db.collection('productos').insertOne(producto)
        return producto
    }

    actualizarProductos = async (id,producto) => {
        if(!CnxMongoDB.connection) return {} 

        await CnxMongoDB.db.collection('productos').updateOne(
            { _id: new ObjectId(id) },
            { $set: producto }
        )
        const productoActualizado = await this.obtenerProductos(id)
        return productoActualizado 
    }

    borrarProductos = async id => {
        if(!CnxMongoDB.connection) return {} 
        
        const productoBorrado = await this.obtenerProductos(id)
        await CnxMongoDB.db.collection('productos').deleteOne(
            { _id: new ObjectId(id) }
        )

        return productoBorrado
    }
}

export default ModelMongoDB


/*
Interfaz generica para conectarse a cualquier Base de Datos

class Model{
    obtenerProductos = async id => {
        if(id){
            return {}
        }
        else{
            return []
        }
    }

    guardarProductos = async producto => {
        return {}
    }

    actualizarProductos = async (id,producto) => {
        return {} 
    }

    borrarProductos = async id => {
        return {}
    }
}

export default Model */