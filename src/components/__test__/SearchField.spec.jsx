import "@testing-library/jest-dom"

import { fireEvent, render, wait, waitForDomChange } from '@testing-library/react'

import React from 'react'
import { SimpleSearchField } from '../SearchField'

it('should render', () => {
    const { container } = render(<SimpleSearchField onSearchRequestDone={() => { }} />)

    expect(container).toMatchSnapshot()
})


it('should call onSearchValueChanged', async () => {
    const onSearchValueChanged = jest.fn().mockName('onSearchValueChanged')
    const { container } = render(<SimpleSearchField onSearchValueChanged={onSearchValueChanged} />)

    expect(container).toMatchSnapshot()
    await wait()
    const inputField = container.querySelector('.leo-task-search-input-field')
    fireEvent.change(inputField, { target: { value: 'Color' } })

    await new Promise(resolve => setTimeout(resolve, 600))

    expect(onSearchValueChanged).toHaveBeenCalledWith("Color")
})