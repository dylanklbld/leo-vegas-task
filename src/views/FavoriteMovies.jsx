import { MovieCellComponent } from '../components/Table/MovieCellComponent'
import React from 'react'
import { ResultTableWrapper } from '../components/Table/ResultTable'
import { getFavorites } from '../api/favorites'

const FavoritesButton = ({ isFavorite, movieId, toggleInList = () => { } }) => {
    return (
        <div className="favorites">
            <button onClick={() => toggleInList(movieId, isFavorite)}>
                {isFavorite ? "Remove from list" : "ADD as FAV"}
            </button>
        </div>
    );
}

export const FavoriteMovies = ({ accountId, sessionId, favoriteIds, updateFavorites }) => {
    return <React.Fragment>
        <ResultTableWrapper
            {...{ favoriteIds }}
            renderMovieCellComponent={({ movieValue }) => {
                const movieId = movieValue.id
                return <MovieCellComponent
                    posterPath={movieValue['poster_path']}
                    movieName={movieValue['original_title']}
                    renderButtons={() =>
                        <React.Fragment>
                            {favoriteIds &&
                                <FavoritesButton toggleInList={updateFavorites} isFavorite={favoriteIds.includes(movieId)} {...{ movieId }} />}
                        </React.Fragment>
                    }
                />
            }}
            handleFetchDataChunck={async (setFavoriteMovies, options) => getFavorites(accountId, sessionId, setFavoriteMovies, options)}
        />
    </React.Fragment>
}