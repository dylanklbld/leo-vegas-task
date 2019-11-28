import React, { useState } from 'react'

import { ResultTableWrapper } from '../components/Table/ResultTable'
import {SimpleSearchField} from '../components/SearchField'
import {search} from '../api/search'

export const SearchMoviesComponent = ({favoriteIds, watchlistIds, updateFavoritesList, updateWatchlist})=>{
    const [searchRequestFunction, setSearchRequestFunction] = useState(null)
    const [query, setQuery] = useState('')

    const changeSearchRequestFunction = (query)=>{
        setSearchRequestFunction((setSearchResultData, options) => {
            return async(setSearchResultData, options) => search(query, setSearchResultData, options)
        })
        setQuery(query)
    }

    return <React.Fragment>
            <SimpleSearchField onSearchValueChanged={changeSearchRequestFunction}/>
            {searchRequestFunction && 
                <ResultTableWrapper key={query} 
                    handleFetchDataChunck={searchRequestFunction} 
                    favoritesUpdater={updateFavoritesList}
                    watchlistUpdater={updateWatchlist}
                    favoriteIds={favoriteIds} 
                    watchlistIds={watchlistIds}/>}
        </React.Fragment>
}