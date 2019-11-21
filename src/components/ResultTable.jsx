import PropTypes from 'prop-types'
import React from 'react'

export const MovieRow = ({data}) => {
    const {isFavorite, isToWatchLater, poster, desc, rating} = data
    
    return <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
}

export const ResultTable = ({movies}) => {

return <React.Fragment>
    <table>
        <tbody>
            {movies.map((data)=>{
                <MovieRow {...{data}}/>
            })}
        </tbody>
    </table>
</React.Fragment>
}