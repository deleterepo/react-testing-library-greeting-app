import React from 'react'
import { render, fireEvent, waitForElement } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import axiosMock from 'axios'
import App from './App'

jest.mock('axios')

test('loads and displays greeting', async () => {
  // arrange
  const url = '/greeting'
  const { getByText, getByRole } = render(<App url={url} />)

  // act
  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: 'hello there' },
  })

  fireEvent.click(getByText('Load Greeting'))

  const greetingTextNode = await waitForElement(() => getByRole('heading'))

  // assert
  expect(axiosMock.get).toHaveBeenCalledTimes(1)
  expect(axiosMock.get).toHaveBeenCalledWith(url)
  expect(getByRole('heading')).toHaveTextContent('hello there')
  expect(getByRole('button')).toHaveAttribute('disabled')
})