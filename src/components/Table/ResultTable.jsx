import '../../styles/table.css'

import React, {useEffect, useState} from 'react'

import { MovieCellComponent } from './MovieCellComponent'
import PropTypes from 'prop-types'
import { useCookies } from '../../hooks/useCookies'
import useEffectExceptMount from '../../hooks/useEffectExceptMount'

export const ResultTableWrapper = ({title, handleFetchDataChunck, favoriteIds, watchlistIds, favoritesUpdater, options }) => {
    const [chunckData, setChunckData] = useState(null)
    const [fullData, setFullData] = useState([])
    const [page, setPage] = useState(1)    
    const [isBusy, setIsBusy] = useState(false)

    useEffect(()=>{
        handleFetchDataChunck(setChunckData)
    }, [])

    useEffectExceptMount(()=>{
        if(chunckData){
            setFullData(fullData.concat(chunckData.results))
        }
    }, [chunckData])


    return fullData && <ResultTableComponent data={fullData} {...{isBusy, favoriteIds, watchlistIds, favoritesUpdater}} 
    
        renderLoadingButton={()=>(
            <button onClick={async ()=>{
                setIsBusy(true)
                setPage(page + 1)
                await handleFetchDataChunck(setChunckData, Object.assign({page: page+1}, options))
                setIsBusy(false)
            }}>Load more...</button>
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
            WATCHLIST
        </button>
    </div>
}

const FavoritesButton = ({isFavorite, movieId, toggleFavorites=()=>{}}) => {
    return  <div className="favorites">
    <button onClick={() => toggleFavorites(movieId, isFavorite)}>
        {isFavorite && 'already in favorite'}
        FAV
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
                {data.map((value) => {

                    const movieId = value['id']
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