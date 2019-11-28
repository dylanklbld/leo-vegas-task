import { MovieCellComponent } from '../components/Table/MovieCellComponent'
import React from 'react'
import { ResultTableWrapper } from '../components/Table/ResultTable'
import { getWatchlist } from '../api/watchlist'

const WatchlistButton = ({ isInWatchlist, movieId, toggleInList = () => { } }) => {
    return <div>
        <button className={isInWatchlist ? "in-watchlist" : "not-in-watchlist"}
            onClick={() => toggleInList(movieId, isInWatchlist)} >
            {isInWatchlist ? "Remove from list" : "ADD +W"}
        </button>
    </div>
}

export const WatchlistMovies = ({ accountId, sessionId, watchlistIds, updateWatchlist }) => {
    return <React.Fragment>
        <ResultTableWrapper
            {...{ watchlistIds }}
            options={{ liveUpdate: true }}

            renderMovieCellComponent={({ movieValue }) => {
                const movieId = movieValue.id
                return <MovieCellComponent
                    posterPath={movieValue['poster_path']}
                    movieName={movieValue['original_title']}
                    renderButtons={() =>
                        <React.Fragment>
                            {watchlistIds &&
                                <WatchlistButton toggleInList={updateWatchlist} isInWatchlist={watchlistIds.includes(movieId)} {...{ movieId }} />}
                        </React.Fragment>
                    }
                />
            }}
            handleFetchDataChunck={
                async (setWatchlistMovies, options) => getWatchlist(accountId, sessionId, setWatchlistMovies, options)
            } />
    </React.Fragment>
}