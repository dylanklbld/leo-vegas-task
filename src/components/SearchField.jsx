import "../styles/searchfield.css"

import React, { useState } from 'react'

import useDebounce from '../hooks/useDebounce'
import useEffectExceptMount from '../hooks/useEffectExceptMount'

const emptyString = ''

export const SimpleSearchField = ({ onSearchValueChanged }) => {
    const [searchValue, setSearchValue] = useState(emptyString)
    const debouncedSearchValue = useDebounce(searchValue, 500)

    useEffectExceptMount(() => {
        debouncedSearchValue &&
            onSearchValueChanged(debouncedSearchValue)
    }, [debouncedSearchValue])

    return <React.Fragment>
        <div className="leo-task-search-field">
            <span>search icon</span>
            <input type="text" className="leo-task-search-input-field" placeholder="Search for a movie..." value={searchValue} onChange={(e) => {
                setSearchValue(e.target.value)
            }} />
            <div></div>
        </div>
    </React.Fragment>
}
