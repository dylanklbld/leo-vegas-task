import '../../styles/movie-cell.css'

import PropTypes from 'prop-types'
import React from 'react'

const imagePath='https://image.tmdb.org/t/p/'
const defaultSize='w500'

export const MovieCellComponent = ({
    posterPath,
    movieName,
    isFavorite = false,
    isInWatchlist = false
}) => {
    return <div className="container">
        <div className="poster"><img
            className="fit-picture"
            src={`${imagePath}${defaultSize}${posterPath}`}
            alt={movieName}/></div>
        <div className="watchlist">To w</div>
        <div className="favorites">To f</div>
    </div>
}