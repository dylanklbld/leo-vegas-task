import React, {useState} from 'react'

import useDebounce from '../hooks/useDebounce'
import useEffectExceptMount from '../hooks/useEffectExceptMount'

const emptyString = ''

export  const SimpleSearchField = ({onSearchValueChanged}) => {
    const [searchValue, setSearchValue] =  useState(emptyString)
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffectExceptMount(()=>{
        console.log(debouncedSearchValue)
        debouncedSearchValue &&
        onSearchValueChanged(debouncedSearchValue)
    }, [debouncedSearchValue])

    return <React.Fragment>
        <div>
            <span>search icon</span>
            <input value={searchValue} onChange={(e)=>setSearchValue(e.target.value)}/>
            <div></div>
        </div>
    </React.Fragment>
}
