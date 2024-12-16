import Servicio from '../servicio/productos.js'

class Controlador{
constructor(){
    this.servicio = new Servicio()
}

    // -- GET -----------------------------------------------------------------------------------------------------
    obtenerProductos = async (req,res) => {
        const { id } = req.params
        const productos = await this.servicio.obtenerProductos(id)
        res.json(productos)
    }

    // -- CALCULO PRODUCTOS -----------------------------------------------------------------------------------------------------
    calculoProductos = async (req,res) => {
        const { tipo } = req.params
        const resultado = await this.servicio.calculoProductos(tipo)
        res.json(resultado)
    }

    // -- POST -----------------------------------------------------------------------------------------------------
    guardarProductos = async (req,res) => {
        try{
            const producto = req.body
            const productoGuardado = await this.servicio.guardarProductos(producto)
            res.json(productoGuardado)
            //res.redirect('/')
        }
        catch(error){
            res.status(500).json({error: error.message})
        }
    }

    // -- PUT (actualizacion parcial) --------------------------------------------------------------------------------
    actualizarProductos = async (req, res) => {
        const { id } = req.params
        const producto = req.body
        const productoActualizado = await this.servicio.actualizarProductos(id,producto)   
        res.json(productoActualizado)
    }

    // -- DELETE -----------------------------------------------------------------------------------------------------
    borrarProductos = async (req,res) => {
        const { id } = req.params
        const productoBorrado = await this.servicio.borrarProductos(id)
        res.json(productoBorrado)
    }
}

export default Controlador