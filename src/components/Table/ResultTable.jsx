import '../../styles/table.css'

import React, {useEffect, useState} from 'react'

import { MovieCellComponent } from './MovieCellComponent'
import PropTypes from 'prop-types'
import useEffectExceptMount from '../../hooks/useEffectExceptMount'

export const ResultTableWrapper = ({title, handleFetchDataChunck, favoriteIds, watchlistIds, favoritesUpdater, options }) => {
    const [chunckData, setChunckData] = useState(null)
    const [fullData, setFullData] = useState([])
    const [page, setPage] = useState(1)    
    const [isBusy, setIsBusy] = useState(false)

    const [totalPages, setTotalPages] = useState(1)

    useEffect(()=>{
        handleFetchDataChunck(setChunckData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffectExceptMount(()=>{
        if(chunckData){
            setTotalPages(chunckData['total_pages'])
            setFullData(fullData.concat(chunckData.results))
        }
    }, [chunckData])


    return fullData && <ResultTableComponent {...{title, isBusy, favoriteIds, watchlistIds, favoritesUpdater}} 
        data={fullData} 
        renderLoadingButton={()=>(
           page < totalPages ? <button onClick={async ()=>{
                setIsBusy(true)
                setPage(page + 1)
                await handleFetchDataChunck(setChunckData, Object.assign({page: page+1}, options))
                setIsBusy(false)
            }}>Load more...</button> : <div>Done</div>
    )}/>
}

ResultTableWrapper.propTypes={
    title: PropTypes.string,
    handleFetchDataChunck: PropTypes.func.isRequired
}

const WatchlistButton = ({isInWatchlist, movieId, toggleFavorites=()=>{}}) => {
    return <div className="watchlist">
        <button onClick={() => toggleFavorites(movieId, isInWatchlist)}>
            {isInWatchlist && 'already in watchlist'}
            {isInWatchlist ? '\u2B50' : '\u2744'}
        </button>
    </div>
}

const FavoritesButton = ({isFavorite, movieId, toggleFavorites=()=>{}}) => {
    return  <div className="favorites">
    <button onClick={() => toggleFavorites(movieId, isFavorite)}>
        {isFavorite ? '\u2764' : '\u1F5A4'}
    </button>
</div>
}

export const ResultTableComponent = ({title, data, renderLoadingButton, isBusy = false, favoriteIds = null, watchlistIds = null, favoritesUpdater}) => {
    return <React.Fragment>
        <table>
            <caption>{title}</caption>
            <thead>
                <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">Overview</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Genres</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((value) => {
                    const movieId = value && value['id'] || 0
                    return <tr key={movieId}>
                        <td data-label="Movie">
                            <MovieCellComponent 
                                posterPath={value['poster_path']} 
                                movieName={value['original_title']}  
                                renderButtons={()=>
                                    <React.Fragment>
                                        {favoriteIds && <FavoritesButton toggleFavorites={favoritesUpdater} isFavorite={favoriteIds.includes(movieId)} {...{movieId}}/>}
                                        {watchlistIds && <WatchlistButton isInWatchlist={watchlistIds.includes(movieId)} {...{movieId}}/>}
                                    </React.Fragment>
                                }
                            />
                        </td>
                        <td data-label="Overview">{value['overview']}</td>
                        <td data-label="Rating">{value['vote_average']}</td>
                        <td data-label="Genres"></td>
                    </tr>
                })}
            </tbody>
        </table>
        {isBusy && <div>UUUUUUUUUUUU FUKKEN BUSY BUTTON</div>}
        {renderLoadingButton && renderLoadingButton()}
        
    </React.Fragment>
}

ResultTableComponent.propTypes={
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    handleFetchDataChunck: PropTypes.func.isRequired
}
