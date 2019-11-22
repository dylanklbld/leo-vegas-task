import React, {useEffect, useState} from 'react'

import {search} from '../api/search'
import useDebounce from '../hooks/useDebounce'
import useEffectExceptMount from '../hooks/useEffectExceptMount'

const API='https://api.themoviedb.org/3/'
const apiKey = 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'
const emptyString = ''



export  const SimpleSearchField = ({onSearchRequestDone}) => {
    const [searchValue, setSearchValue] =  useState(emptyString)
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffectExceptMount(()=>{
        debouncedSearchValue &&
        makeSearchRequest(debouncedSearchValue)
    }, [debouncedSearchValue])

    const makeSearchRequest = async (debouncedSearchValue) => {
        await search(debouncedSearchValue, onSearchRequestDone)
    }

    return <React.Fragment>
        <div>
            <span>search icon</span>
            <input value={searchValue} onInput={(e)=>setSearchValue(e.target.value)}/>
            <div></div>
        </div>
    </React.Fragment>
}