import React, {useEffect, useState} from 'react'
import {ResultTableComponent, ResultTableWrapper} from '../components/Table/ResultTable'

import {SimpleSearchField} from '../components/SearchField'
import {search} from '../api/search'

const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'
const emptyString = ''


export const SearchMoviesComponent = ()=>{
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
                {searchRequestFunction && <ResultTableWrapper key={query} handleFetchDataChunck={searchRequestFunction}/>}
            </React.Fragment>
}