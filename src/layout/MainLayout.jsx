import { Outlet } from 'react-router-dom'

const MainLayout = () => {
    return (
        <div>
            <div className="navbar bg-base-100 shadow-md">
                <div className="flex-1">
                    <a className="btn btn-ghost text-xl">Peliculas App</a>
                </div>
            </div>
            <div className='mx-2 sm:mx-3 md:mx-5 lg:mx-10 xl:mx-10 my-5'>
                <Outlet />
            </div>
        </div>
    )
}

export default MainLayout