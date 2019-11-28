import React, {useEffect, useState} from 'react'
import {ResultTableComponent, ResultTableWrapper} from '../components/Table/ResultTable'

import {SimpleSearchField} from '../components/SearchField'
import { getFavorites } from '../api/favorites'

export const FavoriteMovies = ({accountId, sessionId, favoriteIds})=>{
    return <React.Fragment>
            <ResultTableWrapper 
                handleFetchDataChunck={ async(setFavoriteMovies, options) => getFavorites(accountId, sessionId, setFavoriteMovies,options)}
            />
    </React.Fragment>
}