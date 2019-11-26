import React, { useState } from 'react'

import { ResultTableWrapper } from '../components/Table/ResultTable'
import {SimpleSearchField} from '../components/SearchField'
import {search} from '../api/search'

export const SearchMoviesComponent = ({favoriteIds, watchlistIds, updateFavoritesList})=>{
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
                    favoriteIds={favoriteIds} 
                    watchlistIds={watchlistIds}/>}
        </React.Fragment>
}