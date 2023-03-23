import { useEffect, useState } from 'react'
import mockedData from '../mocks/mockedData'

function useMockup(userId, type) {
	const [mockup, setMock] = useState([])

	useEffect(() => {
		const mockup = mockedData[type].find(
			(data) => data.id === parseFloat(userId)
		)
		setMock(mockup)
	}, [userId])
	console.log(mockup)
	return { mockup }
}

export default useMockup
