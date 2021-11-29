//* Crear nuevos productos

import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO, COMENZAR_DESCARGA_PRODUCTOS, DESCARGA_PRODUCTOS_ERROR, DESCARGA_PRODUCTOS_EXITO } from "../types";
import clienteAxios from '../config/axios';
import Swal from 'sweetalert2';

export function crearNuevoProductoAction(producto) {
    return async ( dispatch ) => {
        dispatch( agregarProducto() );

        try {
            //* Insertar en la API
            await clienteAxios.post('/productos', producto);

            //* Si todo sale bien, actualizar el state
            dispatch( agregarProductoExito(producto) );

            //* Alerta
            Swal.fire(
                'Correcto',
                'El producto se agregó correctamente',
                'success'
            );
        } catch (error) {
            console.log(error);
            //! Si hay un error, cambiar el state
            dispatch( agregarProductoError(true) );

            //! Alerta de error
            Swal.fire({
                icon: 'error',
                title: 'Hubo un error',
                text: 'Hubo un error, intenta de nuevo'
            })
        }
    }
};

const agregarProducto = () =>  ({
    type: AGREGAR_PRODUCTO,
    payload: true
});

//* Si el producto se guarda en la BD
const agregarProductoExito = producto => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: producto
})

//! Si el producto no se guarda en la BD
const agregarProductoError = estado => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: estado
})

//* Funcion que descarga los productos de la BD
export function obtenerProductosAction() {
    return async (dispatch) => {
        dispatch( descargarProductos() );

        try {
            
            setTimeout( async()=> {
                //* Obtener productos de API
                const respuesta = await clienteAxios.get('/productos');

                dispatch( descargaProductosExitosa(respuesta.data) );
            }, 3000);
           
        } catch (error) {
            console.log(error);

            dispatch( descargaProductosError() );
        }
    }   
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
});

const descargaProductosExitosa = productos => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: productos
});

const descargaProductosError = () => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: true
});