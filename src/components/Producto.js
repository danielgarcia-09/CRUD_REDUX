import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
//* Redux
import { useDispatch } from 'react-redux';
import { borrarProductoAction, obtenerProductoEditar } from '../actions/productoActions';

const Producto = ({producto}) => {

    const { nombre, precio, id} = producto;

    const dispatch = useDispatch();

    //* Confirmar si desea eliminarlo
    const confirmarEliminarProducto = id => {

        //* Preguntar al usuario
        Swal.fire({
            title: 'Estas seguro?',
            text: "No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Si, borralo!'
          }).then((result) => {
            if (result.isConfirmed) {
                //* Pasarlo al action
                dispatch( borrarProductoAction(id) );
            }
          })       
    }

    //* Para navegar a otro link
    let navigate = useNavigate();
    const redireccionarEdicion = producto => {

        dispatch( obtenerProductoEditar(producto) );
        navigate(`/productos/editar/${id}`)
        
    }

    return (
        <tr>
            <td>{nombre}</td>
            <td>
                <span className="font-weight-bold">
                    $ {precio}
                </span>
            </td>
            <td className="acciones">
                <button
                    type='button'
                    onClick={ ()=> redireccionarEdicion(producto) }
                    className="btn btn-primary mr-2">
                Editar
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={ ()=> confirmarEliminarProducto(id) }
                >Eliminar</button>
            </td>
        </tr>
    );
}
 
export default Producto;