import React, {useEffect, useState} from 'react'
import {ResultTableComponent, ResultTableWrapper} from '../components/Table/ResultTable'

import {SimpleSearchField} from '../components/SearchField'
import { getWatchlist } from '../api/watchlist'

const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'
const emptyString = ''


export const WatchlistMovies = ({accountId, sessionId})=>{
    return <React.Fragment>
            <ResultTableWrapper handleFetchDataChunck={ async(setFavoriteMovies) => getWatchlist(accountId, sessionId, setFavoriteMovies)}/>
    </React.Fragment>
}