import '../styles/MovieOverviewComponent.css';

import PropTypes from 'prop-types'
import React from 'react'

const imagePath='https://image.tmdb.org/t/p/'
const defaultSize='w500'

export const MovieOverviewComponent = ({data}) => {
    const {isFavorite, isToWatchLater, original_title, poster_path, overview, vote_average} = data
    
    return <div className="task-movie-overview-element">
        <div><img className="fit-picture" src={`${imagePath}${defaultSize}${poster_path}`} alt={original_title}/></div>
        <p>{original_title}</p>
        <p>{overview}</p>
        <p>{vote_average}</p>
    </div>
}
