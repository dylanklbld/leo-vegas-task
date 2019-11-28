import React, { useState } from 'react'

import { MovieCellComponent } from '../components/Table/MovieCellComponent'
import { ResultTableWrapper } from '../components/Table/ResultTable'
import { SimpleSearchField } from '../components/SearchField'
import { search } from '../api/search'

const WatchlistButton = ({ isInWatchlist, movieId, toggleInList = () => { } }) => {
    return <div className="watchlist">
        <button className={isInWatchlist ? "in-watchlist" : "not-in-watchlist"}
            onClick={() => toggleInList(movieId, isInWatchlist)} >
            {isInWatchlist ? "-W" : "ADD +W"}
        </button>
    </div>
}

const FavoritesButton = ({ isFavorite, movieId, toggleInList = () => { } }) => {
    return (
        <div className="favorites">
            <button onClick={() => toggleInList(movieId, isFavorite)}>
                {isFavorite ? "-FAV" : "ADD +FAV"}
            </button>
        </div>
    );
}

export const SearchMoviesComponent = ({ favoriteIds, watchlistIds, updateFavoritesList, updateWatchlist }) => {
    const [searchRequestFunction, setSearchRequestFunction] = useState(null)
    const [query, setQuery] = useState('')

    const changeSearchRequestFunction = (query) => {
        setSearchRequestFunction((setSearchResultData, options) => {
            return async (setSearchResultData, options) => search(query, setSearchResultData, options)
        })
        setQuery(query)
    }

    return <React.Fragment>
        <SimpleSearchField onSearchValueChanged={changeSearchRequestFunction} />
        {searchRequestFunction &&
            <ResultTableWrapper key={query}
                renderMovieCellComponent={({ movieValue }) => {
                    const movieId = movieValue.id
                    return <MovieCellComponent
                        posterPath={movieValue['poster_path']}
                        movieName={movieValue['original_title']}
                        renderButtons={() =>
                            <React.Fragment>
                                {favoriteIds && <FavoritesButton toggleInList={updateFavoritesList} isFavorite={favoriteIds.includes(movieId)} {...{ movieId }} />}
                                {watchlistIds && <WatchlistButton toggleInList={updateWatchlist} isInWatchlist={watchlistIds.includes(movieId)} {...{ movieId }} />}
                            </React.Fragment>
                        }
                    />
                }}
                handleFetchDataChunck={searchRequestFunction}
                favoritesUpdater={updateFavoritesList}
                watchlistUpdater={updateWatchlist}
                favoriteIds={favoriteIds}
                watchlistIds={watchlistIds} />}
    </React.Fragment>
}