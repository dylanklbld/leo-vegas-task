import '../../styles/movie-cell.css'

import PropTypes from 'prop-types'
import React from 'react'

const imagePath = 'https://image.tmdb.org/t/p/'
const defaultSize = 'w500'

export const MovieCellComponent = ({
    movieId,
    posterPath,
    movieName,
    renderButtons
}) => {
    return <div className="container">
        <div className="poster"><img
            className="fit-picture"
            src={`${imagePath}${defaultSize}${posterPath}`}
            alt={movieName} /></div>
        <React.Fragment>
            {renderButtons && renderButtons(movieId)}
        </React.Fragment>
    </div>
}