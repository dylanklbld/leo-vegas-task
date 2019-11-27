import "@testing-library/jest-dom"

import  { MULTI_PAGE_DATA, ONE_PAGE_DATA } from '../../../mockdata/tableData';
import { ResultTableComponent, ResultTableWrapper } from '../ResultTable'
import { fireEvent, render, wait } from '@testing-library/react'

import React from 'react'

it('should render empty', () => {
    const { container } = render(<ResultTableWrapper title={'Empty'} handleFetchDataChunck={()=>([])} />)

    expect(container).toMatchSnapshot()
})

it('should render one page table', async () => {
    const { container, getByText } = render(<ResultTableWrapper title={'One page'} handleFetchDataChunck={(stateUpdate)=>(stateUpdate(ONE_PAGE_DATA))} />)

    await wait()

    // checking for loading button
    getByText('Done')

    expect(container).toMatchSnapshot()
})

it('should render multi page table', async () => {
    const pageDataCheckingSpy = jest.fn()
    const { getByText } = render(<ResultTableWrapper title={'Multi page'} 
    
    handleFetchDataChunck={(stateUpdate, options)=>{
        stateUpdate(MULTI_PAGE_DATA)
        options && pageDataCheckingSpy(options)
    }} />)

    await wait()
    fireEvent.click(getByText('Load more...'))
    
    await wait()
    expect(pageDataCheckingSpy).toHaveBeenCalledWith({"page": 2})
})

it('should render multi page table', () => {
    const { container } = render(<ResultTableWrapper title={'Empty'} handleFetchDataChunck={()=>([])} />)

    expect(container).toMatchSnapshot()
})