import express from 'express'
import Controlador from '../controlador/productos.js'

class Router{
    constructor(){
        this.router = express.Router()
        this.controlador = new Controlador()
    }
    start(){
        this.router.get('/:id?', this.controlador.obtenerProductos)
        this.router.get('/calculo/:tipo', this.controlador.calculoProductos)
        this.router.post('/', this.controlador.guardarProductos)
        this.router.put('/:id', this.controlador.actualizarProductos)
        this.router.delete('/:id', this.controlador.borrarProductos)

        return this.router
    }
}

export default Router