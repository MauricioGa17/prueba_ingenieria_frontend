const LoadingTable = ({ columnas }) => {
    return (
        <tr>
            <td colSpan={columnas} className="text-center bg-gray-50 opacity-75">
                <div>
                    <span className="loading loading-dots loading-lg"></span>
                </div>
            </td>
        </tr>
    )
}

export default LoadingTable