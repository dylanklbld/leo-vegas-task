import '../../styles/table.css'

import React, {useEffect, useState} from 'react'

import { MovieCellComponent } from './MovieCellComponent'
import PropTypes from 'prop-types'

export const ResultTableWrapper = ({handleFetchDataChunck, options}) => {
    const [chunckData, setChunckData] = useState(null)
    const [fullData, setFullData] = useState([])
    
    const [page, setPage] = useState(1)
    
    const [isBusy, setIsBusy] = useState(false)

    useEffect(()=>{
        handleFetchDataChunck(setChunckData)
    }, [])

    useEffect(()=>{
        if(chunckData){
            setFullData(fullData.concat(chunckData.results))
        }
    }, [chunckData])


    return fullData && <ResultTableComponent data={fullData} isBusy={isBusy} renderLoadingButton={()=>(
        <button onClick={async ()=>{
            setIsBusy(true)
            setPage(page + 1)
            await handleFetchDataChunck(setChunckData, Object.assign({page: page+1}, options))
            setIsBusy(false)
        }}>Load more...</button>
    )}/>
}

ResultTableWrapper.propTypes={
    handleFetchDataChunck: PropTypes.func.isRequired
}

export const ResultTableComponent = ({data, renderLoadingButton, isBusy = false}) => {
    return <React.Fragment>
        <table>
            <caption>Movies</caption>
            <thead>
                <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">Overview</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Genres</th>
                </tr>
            </thead>
            <tbody>
                {data.map((value) => {
                    return <tr key={value['id']}>
                        <td data-label="Movie">
                            <MovieCellComponent 
                                posterPath={value['poster_path']} 
                                movieName={value['original_title']}  
                                movieId={value['id']}
                            />
                        </td>
                        <td data-label="Overview">{value['overview']}</td>
                        <td data-label="Rating">{value['vote_average']}</td>
                        <td data-label="Genres"></td>
                    </tr>
                })}
            </tbody>
        </table>
        {isBusy && <div>UUUUUUUUUUUU FUKKEN BUSY BUTTON</div>}
        {renderLoadingButton && renderLoadingButton()}
        
    </React.Fragment>
}