import { useState } from 'react'
//Components
import TablaPeliculas from '../components/Home/TablaPeliculas'

const Home = () => {

    const [ peliculas, setPeliculas ] = useState([])

    return (
        <div className=''>
            <div className='border-b-2 border-zinc-200'>
                <h1 className='font-semibold'>Listado Peliculas</h1>
                <p className='mb-2 text-xs'>Presiona el titulo para mas detalles</p>
            </div>
            <div className='py-2'>
                <TablaPeliculas
                    peliculas={peliculas}
                    setPeliculas={setPeliculas}
                />
            </div>
        </div>
    )
}

export default Home