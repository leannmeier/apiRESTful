import fs from 'fs'

class ModelFile{
    constructor(){
        this.nombreArchivo = 'productos.json'
    }

    leerArchivo = async nombre => {
        let productos = []
        try{
            productos = JSON.parse( await fs.promises.readFile(nombre,'utf-8'))
        }
        catch {}
        return productos
    } 

    escribirArchivos = async (nombre, productos) => {
        await fs.promises.writeFile( nombre, JSON.stringify(productos, null, '\t') )
    }

    obtenerProductos = async id => {
        try{
            const productos = await this.leerArchivo(this.nombreArchivo)
            if(id){
                const producto = productos.find( producto => producto.id == id )
                return producto || { }
            }
            else{
                return productos
            }
        }
        catch{
            return id ? {} : []
        }
    }

    guardarProductos = async producto => {
        const productos = await this.leerArchivo(this.nombreArchivo)
        producto.id = String(parseInt(productos[ productos.length - 1 ]?.id || 0) + 1) // ?. optional chaining
        producto.precio = Number(producto.precio)
        producto.stock = Number(producto.stock)
        productos.push(producto)
        await this.escribirArchivos(this.nombreArchivo,productos)
        return producto
    }

    actualizarProductos = async (id,producto) => {
        producto.id = id
        const productos = await this.leerArchivo(this.nombreArchivo)
        const index = productos.findIndex( producto => producto.id === id )
        if(index != -1){
            const productoAnt = productos[index]
            const productoNuevo = { ...productoAnt, ...producto }
            productos.splice(index,1,productoNuevo)
            await this.escribirArchivos(this.nombreArchivo,productos)
            return productoNuevo
        }  
        else{
            productos.push(producto)
            await this.escribirArchivos(this.nombreArchivo,productos)
            return producto
        }
    }

    borrarProductos = async id => {
        let producto = {}
        const productos = await this.leerArchivo(this.nombreArchivo)
        const index = productos.findIndex( producto => producto.id == id )
        if(index != -1 ){
            producto = productos.splice(index,1)[0]
            await this.escribirArchivos(this.nombreArchivo,productos)
        }
        return producto
    }
}

export default ModelFile