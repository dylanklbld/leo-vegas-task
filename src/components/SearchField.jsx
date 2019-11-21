import React, {useEffect, useState} from 'react'

import useDebounce from '../hooks/useDebounce'
import useEffectExceptMount from '../hooks/useEffectExceptMount'

const API='https://api.themoviedb.org/3/'

const emptyString = ''

const fetchPopular = async ()=>{
    const result = await fetch(
        `${API}discover/movie?`  + new URLSearchParams({
            api_key: 'e4d1e79ae2ef4e5d3a28898c3e0c7d85'
        }),
        {
          method: "GET",
        }
      )
        .then(res => res.json())
        .then(response =>
            {return response} 
        )
        .catch(error => console.log(error));
    

    return result
}

export  const SimpleSearchField = () => {
    const [searchValue, setSearchValue] =  useState(emptyString)
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffect(()=>{
        //this will happen on mount
        console.log('make an api call to fetch popular stuff')
        const popular = fetchPopular()
        debugger   
    }, [])

    useEffectExceptMount(()=>{
        console.log('time to make some wierd request')
    }, [debouncedSearchValue])

    return <React.Fragment>
        <div>
            <span>search icon</span>
            <input value={searchValue} onInput={(e)=>setSearchValue(e.target.value)}/>
        </div>
    </React.Fragment>
}