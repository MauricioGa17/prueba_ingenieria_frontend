import PropTypes from 'prop-types';

const ErrorDiv = ({ children }) => {
    return (
        <div className='bg-gray-200 rounded-xl py-3 px-5 mb-2'>
            <h1 className='text-gray-900 font-semibold text-start'>{ children }</h1>
            <p className='text-xs'>Intenta mas tarde</p>
        </div>
    )
}

ErrorDiv.propTypes = {
    children: PropTypes.string,
}

export default ErrorDiv