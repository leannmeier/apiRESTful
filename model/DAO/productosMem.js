class ModelMem{
    constructor(){
        this.productos = [
            { id: "1", nombre: 'TV', precio: 1234.564, stock:55 },
            { id: "2", nombre: 'Mouse', precio: 599.9, stock:99 },
            { id: "3", nombre: 'Celular', precio: 888.8, stock:88 },
        ]
    }

    obtenerProductos = async id => {
        if(id){
            const producto = this.productos.find( producto => producto.id == id )
            return producto || { }
        }
        else{
            return this.productos
        }
    }

    guardarProductos = async producto => {
        producto.id = String(parseInt(this.productos[ this.productos.length - 1 ]?.id || 0) + 1) // ?. optional chaining
        producto.precio = Number(producto.precio)
        producto.stock = Number(producto.stock)
        this.productos.push(producto)
        return producto
    }

    actualizarProductos = async (id,producto) => {
        producto.id = id
        const index = this.productos.findIndex( producto => producto.id === id )
        if(index != -1){
            const productoAnt = this.productos[index]
            //--------------------------------------------------------------------------------------------------------
            //   Spread Operator (...) + Object Merge
            //--------------------------------------------------------------------------------------------------------
            // productoAnt = { id: "2", nombre: 'Mouse', precio: 599.9, stock:99 },
            // producto = { precio: 777 }
            // ---> productoNuevo = { ...productoAnt, ...producto }
            // 1) { ...{ id: "2", nombre: 'Mouse', precio: 599.9, stock:99 }, ...{ precio: 777} }                               
            // 2) { id: "2", nombre: 'Mouse', precio: 599.9, stock:99, precio: 777 }  --> Spread Operator
            // 3) { id: "2", nombre: 'Mouse', stock:99, precio: 777 }  --> Object Merge                          
            //--------------------------------------------------------------------------------------------------------
            const productoNuevo = { ...productoAnt, ...producto }
            this.productos.splice(index,1,productoNuevo)
            return productoNuevo
        }  
        else{
            this.productos.push(producto)
            return producto
        }
    }

    borrarProductos = async id => {
        let producto = {}
        const index = this.productos.findIndex( producto => producto.id == id )
        if(index != -1 ){
            producto = this.productos.splice(index,1)[0]
        }
        return producto
    }
}

export default ModelMem