import '../../styles/table.css'

import React, { useEffect, useState } from 'react'

import PropTypes from 'prop-types'
import ScrollToTopButton from '../ScrollToButton'
import useEffectExceptMount from '../../hooks/useEffectExceptMount'
import { useIsInView } from '../../hooks/useIsInVIew'

export const ResultTableWrapper = ({
    title,
    handleFetchDataChunck,
    renderMovieCellComponent,
    favoriteIds, watchlistIds,
    favoritesUpdater, watchlistUpdater,
    options
}) => {
    const [chunckData, setChunckData] = useState(null)
    const [fullData, setFullData] = useState([])
    const [page, setPage] = useState(1)
    const [isBusy, setIsBusy] = useState(false)
    const [totalPages, setTotalPages] = useState(1)

    useEffect(() => {
        handleFetchDataChunck(setChunckData)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffectExceptMount(() => {
        // assumed that this will be used for load more call
        if (chunckData) {
            setTotalPages(chunckData['total_pages'])
            setFullData([...fullData, ...chunckData.results])
        }
    }, [chunckData])

    const updateOnListIdChange = (idList) => {
        const filter = fullData.map(v => v.id).find(e => !idList.includes(e))
        if (filter) {
            setFullData(fullData.filter(v => v.id !== filter))
        }
    }

    useEffectExceptMount(() => {
        if (favoriteIds) {
            updateOnListIdChange(favoriteIds)
        }
        if (watchlistIds) {
            updateOnListIdChange(watchlistIds)
        }
    }, [favoriteIds, watchlistIds])

    return fullData.length ? <ResultTableComponent {...{ title, renderMovieCellComponent, isBusy, favoriteIds, watchlistIds, favoritesUpdater, watchlistUpdater }}
        data={fullData}
        renderLoadingButton={() => (
            page < totalPages ? <button
                className="leo-task-load-more-button btn"
                disabled={isBusy}
                onClick={async () => {
                    setIsBusy(true)
                    setPage(page + 1)
                    await handleFetchDataChunck(setChunckData, Object.assign({ page: page + 1 }, options))
                    setIsBusy(false)
                }}>Load more...</button>
                :
                <div>Finish</div>
        )} /> : <div>No Data</div>
}

ResultTableWrapper.propTypes = {
    title: PropTypes.string,
    handleFetchDataChunck: PropTypes.func.isRequired
}

export const ResultTableComponent = ({ title, data, renderMovieCellComponent, renderLoadingButton, isBusy = false, favoriteIds = null, watchlistIds = null, favoritesUpdater, watchlistUpdater }) => {
    const [renderToTopButton, setRenderToTopButton] = useState(false)
    const [refTopDiv, inView] = useIsInView()

    React.useEffect(() => {
        setRenderToTopButton(!inView)
    }, [inView])

    return <React.Fragment>
        <div ref={refTopDiv} />
        <table>
            <caption>{title}</caption>
            <thead>
                <tr>
                    <th scope="col">Movie</th>
                    <th scope="col">Overview</th>
                    <th scope="col">Rating</th>
                </tr>
            </thead>
            <tbody>
                {data && data.map((value) => {
                    const movieId = value && value['id'] || 0
                    return <tr key={movieId}>
                        <td data-label="Movie">
                            {renderMovieCellComponent && renderMovieCellComponent({ movieValue: value })}
                        </td>
                        <td data-label="Overview">{value['overview']}</td>
                        <td data-label="Rating">{value['vote_average']}</td>
                    </tr>
                })}
            </tbody>
        </table>
        {isBusy ? <div>BUSY STATE</div> :
            (renderLoadingButton && renderLoadingButton())}
        {renderToTopButton && <ScrollToTopButton className={"leo-task-to-top"} />}
    </React.Fragment>
}

ResultTableComponent.propTypes = {
    title: PropTypes.string.isRequired,
    data: PropTypes.array.isRequired,
    handleFetchDataChunck: PropTypes.func.isRequired
}
