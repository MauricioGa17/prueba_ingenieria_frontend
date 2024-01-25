import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import ErrorDiv from '../components/UI/ErrorDiv';

const Detalle = () => {

    const { idPelicula } = useParams();

    const [ loading, setLoading ] = useState(false)
    const [ errores, setErrores ] = useState({})
    const [ pelicula, setPelicula ] = useState({})

    useEffect(() => {
        const onObtenerPelicula = async () => {
            try {
                setLoading(true)
                const { data } = await axios.get(`https://ghibliapi.vercel.app/films/${idPelicula}`, {
                    headers: {
                        'Accept':'application/json'
                    }
                })
                setPelicula(data)
            } catch (error) {
                setErrores({
                    message: 'Error al obtener la pelicula'
                })
            } finally {
                setLoading(false)
            }
            }
            onObtenerPelicula()
    }, [idPelicula])

    if(Object.keys(errores).length > 0 ) return <ErrorDiv>{errores.message}</ErrorDiv>
    
    return (
        <div>
            <img src={pelicula.movie_banner} className={`w-full h-96 ${loading && 'skeleton'} object-cover object-center rounded-t-md`} />
            <div className='flex flex-col sm:flex-col md:flex-row lg:flex-row xl:flex-row space-x-5 h-auto xl:h-40'>
                <img src={pelicula.image} className={`${loading && 'skeleton'} object-fill w-56 sm:w-56 md:w-64 lg:w-72 xl:w-72 h-56 mx-auto sm:mx-0 md:mx-0 lg:mx-0 xl:mx-0 rounded-full border-8 border-white md:relative md:bottom-24 lg:relative lg:bottom-24 xl:relative xl:bottom-24`} alt="" />
                <div className='w-full my-3 border-r-4 border-zinc-400'>
                    <h1 className={`${loading && 'skeleton h-8 w-8/12'} text-3xl font-semibold text-blue-800 text-opacity-65`}>{pelicula.title} <span className='text-sm font-semibold text-gray-500'>{pelicula.original_title_romanised}</span></h1>
                    <p className={`${loading &&'skeleton h-4 w-64'} font-semibold my-2`}>{pelicula.original_title} - <span className='text-xs'>Duracion: {pelicula.running_time} Minutos</span></p>
                    <div className='w-full flex justify-between'>
                        <div className='w-6/12'>
                            <h1 className={`${loading && 'skeleton h-4 w-36 my-2'} text-sm`}>{!loading && 'Director:'} <span className='font-semibold'>{pelicula.director}</span></h1>
                            <p className={`${loading && 'skeleton h-4 w-36'} text-sm`}>{!loading && 'Productor:'} <span className='font-semibold'>{pelicula.producer}</span></p>
                        </div>
                        <div className="w-6/12 p-0">
                            <div className={`${loading && 'skeleton h-4 w-24 my-2'} text-sm`}>{!loading && 'Valoracion'}:</div>
                            <div className={`${loading && 'skeleton h-4 w-5'} text-sm font-bold`}>{pelicula.rt_score}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='w-full h-1 rounded-full bg-zinc-300'></div>

            <div className='p-4 mb-5'>
                <h1 className='text-justify text-xl'>Sinopsis: <span className='font-light'>{pelicula.description}</span></h1>
            </div>
        </div>
    )
}

export default Detalle