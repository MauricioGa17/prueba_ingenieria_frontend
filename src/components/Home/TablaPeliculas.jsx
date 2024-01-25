import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

import axios from 'axios'

//Componens
import LoadingTable from '../../components/UI/LoadingTable'
import ErrorDiv from '../UI/ErrorDiv';

const TablaPeliculas = ({ peliculas, setPeliculas }) => {

    const [ loading, setLoading ] = useState(false)
    const [ errores, setErrores ] = useState({})
    const [ peliculasFiltro, setPeliculasFiltro ] = useState([])
    const [ filtro, setFiltro] = useState('');
    const [ sugerencias, setSugerencias] = useState([]);

    useEffect(() => {
        const onObtenerPeliculas = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get('https://ghibliapi.vercel.app/films', {
                headers: {
                    'Accept':'application/json'
                }
            })
            setPeliculas(data)
            setPeliculasFiltro(data)
        } catch (error) {
            setErrores({ message: 'Ocurrio un error al obtener las peliculas' })
        } finally {
            setLoading(false)
        }
        }
        onObtenerPeliculas()
    }, [setPeliculas])


    const onFiltroPelicula = (e) => {
        const value = e.target.value;
        setFiltro(value)

        if(value === ""){
            setSugerencias([])
            setPeliculas(peliculasFiltro)
            return;
        }
        
        const peliculasFiltradas = peliculasFiltro.filter((pelicula) => {
            return pelicula.title.toLowerCase().match(value.toLowerCase())
        })

        setSugerencias(peliculasFiltradas);
    };

    const seleccionPelicula = (peliculaTitulo, idPelicula) => {
        setFiltro(peliculaTitulo);
        setSugerencias([]);

        const peliculaFiltro = peliculas.filter((pelicula) => {
            return pelicula.id == idPelicula
        })

        setPeliculas(peliculaFiltro)
    };

    return (
        <div>
            <div className='mb-4'>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text">Buscar Pelicula</span>
                    </div>
                    <input type="text" value={filtro} onChange={onFiltroPelicula} placeholder="Titulo" className="input input-sm input-bordered w-full max-w-xs" />
                </label>

                { sugerencias.length > 0 && (
                    <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box  w-full max-w-xs">
                        {sugerencias.map((sugerencia) => (
                            <li key={sugerencia.id}>
                                <button onClick={() => seleccionPelicula(sugerencia.title, sugerencia.id)} className='hover-bg-base-200'>{sugerencia.title}</button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            { Object.keys(errores).length > 0 && (
                <ErrorDiv>{errores.message}</ErrorDiv>
            )}

            <table className='table table-xs table-zebra'>
                <thead>
                    <tr>
                        <th className='bg-gray-100 text-gray-600 text-sm rounded-tl-md p-2'>Titulo</th>
                        <th className='bg-gray-100 text-gray-600 text-sm'>Produccion</th>
                        <th className='bg-gray-100 text-gray-600 text-sm rounded-tr-md'></th>
                    </tr>
                </thead>
                <tbody>
                    { loading 
                        ? <LoadingTable columnas={3} />
                        : peliculas.map((pelicula) => (
                            <tr key={pelicula.id}>
                                <td>
                                    <div className='flex items-center space-x-3'>
                                        <div className="mask mask-squircle w-10 h-10">
                                            <img src={pelicula.image} alt="Avatar Tailwind CSS Component" />
                                        </div>
                                        <div>
                                            <Link to={`/detalle/${pelicula.id}`} className='transition duration-200 hover:text-blue-500'>{pelicula.title}</Link>
                                            <p className='text-xs font-light'>Titulo Original: { pelicula.original_title }</p>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h1>Director: {pelicula.director}</h1>
                                    <h1>Productor: {pelicula.producer}</h1>
                                </td>
                                <td>
                                    <h1>Fecha Lanzamiento: {pelicula.release_date}</h1>
                                    <p>Duracion: {pelicula.running_time} min</p>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </table>
        </div>
    )
}

TablaPeliculas.propTypes = {
    peliculas: PropTypes.array.isRequired,
    setPeliculas: PropTypes.func.isRequired,
}

export default TablaPeliculas