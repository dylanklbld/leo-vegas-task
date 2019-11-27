import "@testing-library/jest-dom"

import { fireEvent, render } from '@testing-library/react'

import React from 'react'
import { SimpleSearchField } from '../SearchField'

it('should render', () => {
    const { container } = render(<SimpleSearchField onSearchRequestDone={() => { }} />)

    expect(container).toMatchSnapshot()
})


it('should call onSearchRequestDone', () => {
    const onSearchRequestDone = jest.fn().mockName('onSearchRequestDone')
    const { container } = render(<SimpleSearchField onSearchRequestDone={onSearchRequestDone} />)

    expect(container).toMatchSnapshot()

    const inputField = container.querySelector('.leo-task-search-input-field')
    fireEvent.change(inputField, { target: { value: 'Color' } })

    expect(onSearchRequestDone).toHaveBeenCalledWith({})
})