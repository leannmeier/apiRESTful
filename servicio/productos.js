/* import ModelMem from '../model/DAO/productosMem.js'
import ModelFile from '../model/DAO/productosFile.js' */

import config from "../config.js"
import ModelFactory from "../model/DAO/productosFactory.js"
import { validar } from "./validaciones/productos.js"

class Servicio{
    constructor(){
        //this.model = new ModelMem()
        //this.model = new ModelFile()
        this.model = ModelFactory.get(config.MODO_PERSISTENCIA)
    }
    
    obtenerProductos = async id => {
        const productos = await this.model.obtenerProductos(id)
        return productos
    }

    guardarProductos = async producto => {
        const res = validar(producto)
        if(res.result){
            const productoGuardado = await this.model.guardarProductos(producto)
            return productoGuardado
        }
        else{
            console.log(res.error)
            throw res.error
        }
    }

    actualizarProductos = async (id, producto) => {
        const productoActualizado = await this.model.actualizarProductos(id,producto)
        return productoActualizado
    }

    borrarProductos = async id => {
        const productoBorrado = await this.model.borrarProductos(id)
        return productoBorrado
    }

    calculoProductos = async tipo => {
        let resultado = 'Calculo no soportado'
        switch(tipo) {
            case 'promedio-precios':
                const productos = await this.model.obtenerProductos()
                const sumatoria = productos.reduce( (acumulador, producto) => acumulador + producto.precio, 0 )
                const promedio = sumatoria / productos.length
                resultado = Number(promedio.toFixed(2))
                break
            default:
                break
        }
        return { [tipo] : resultado}
    }
}

export default Servicio