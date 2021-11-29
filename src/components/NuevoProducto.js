import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

//* Actions de REDUX
import { crearNuevoProductoAction } from '../actions/productoActions'; 

const NuevoProducto = () => {

    //* State local
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: 0
    });
    const { nombre, precio } = producto;

    //* Cuando cambian el input
    const onChangeInput = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    //* Utilizar use dispatch y te crea una funcion
    const dispatch = useDispatch();

    //* Acceder al state del store
    const cargando = useSelector( state => state.productos.loading);
    const error = useSelector( state => state.productos.error);
    
    //* Navegar por URL
    let navigate = useNavigate();

    //* Mandar llamar el action de productoActions
    const agregarProducto = producto => dispatch( crearNuevoProductoAction( producto ) );

    //* Cuando el usuario haga submit
    const submitNuevoProducto = e => {
        e.preventDefault();

        //* Validar formulario
        if( nombre.trim() === '' || precio <= 0 ) {
            return;
        }   

        //* Si no hay errores
        //* Crear el nuevo producto
        agregarProducto({
            nombre,
            precio: Number(precio)
        });

        //* Redireccionar
       
        navigate('/');
    }

    return (
        <div className="row justify-content-center">
            <div className="col-md-8">
                <div className="card">
                    <div className="card-body">
                        <h2 className="text-center mb-4 font-weight-bold">
                            Agregar Nuevo Producto
                        </h2>

                        <form
                            onSubmit={submitNuevoProducto}
                        >
                            <div className="form-group">
                                <label>Nombre Producto</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Nombre Producto"
                                    name="nombre"
                                    value={nombre}
                                    onChange={onChangeInput}
                                />
                            </div>

                            <div className="form-group">
                                <label>Precio Producto</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Precio Producto"
                                    name="precio"
                                    value={precio}
                                    onChange={onChangeInput}
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                            >Agregar</button>
                        </form>

                        { cargando ? <p>Cargando ...</p> : null }
                        { error ? <p className="alert alert-danger p-2 mt-4 text-center">Hubo un error</p> : null }
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default NuevoProducto;