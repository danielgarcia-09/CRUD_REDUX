import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useParams } from "react-router";
import { editarProductoAction } from '../actions/productoActions';

const EditarProducto = () => {

    //* Extrayendo el id del URL
    // const klk = useParams('id');
    // console.log(klk.id);

    const dispatch = useDispatch();

    //* Nuevo state del producto
    const [ producto, guardarProducto ] = useState({
        nombre: '',
        precio: 0 
    });

    //* Producto a editar
    const productoEditar = useSelector( state => state.productos.productoEditar);

    const { nombre, precio, id } = producto; 

    //* Llenar el state automaticamente
    useEffect(()=> {
        guardarProducto(productoEditar);
    }, [productoEditar]);

    //* Leer los datos del formulario
    const onChangeForm = e => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
    }

    //* Para moverse al inicio
    let navigate = useNavigate();

    //* Al dar submit
    const submitEditarProducto = e => {
        e.preventDefault();

        dispatch(editarProductoAction({
            id,
            nombre,
            precio: Number(precio)
        }));

        navigate('/');
    }

    return (
        <div className="row justify-content-center">
        <div className="col-md-8">
            <div className="card">
                <div className="card-body">
                    <h2 className="text-center mb-4 font-weight-bold">
                        Editar Producto
                    </h2>

                    <form
                        onSubmit={ submitEditarProducto }
                    >
                        <div className="form-group">
                            <label>Nombre Producto</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre Producto"
                                name="nombre"
                                value={nombre}
                                onChange={onChangeForm}
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
                                onChange={onChangeForm}
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
                        >Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}
 
export default EditarProducto;