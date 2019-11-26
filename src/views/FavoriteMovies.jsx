import React, {useEffect, useState} from 'react'
import {ResultTableComponent, ResultTableWrapper} from '../components/Table/ResultTable'

import {SimpleSearchField} from '../components/SearchField'
import { getFavorites } from '../api/favorites'

const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'
const emptyString = ''


export const FavoriteMovies = ({accountId, sessionId})=>{
    return <React.Fragment>
            <ResultTableWrapper handleFetchDataChunck={ async(setFavoriteMovies) => getFavorites(accountId, sessionId, setFavoriteMovies)}/>
    </React.Fragment>
}