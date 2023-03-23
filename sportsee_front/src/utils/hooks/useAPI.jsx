import { useEffect, useState } from 'react'

function useAPI(url) {
	const [APIData, setData] = useState([])
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		async function fetchAPI(url) {
			setLoading(true)
			try {
				const response = await fetch(url)
				const APIData = await response.json()
				setData(APIData)
			} catch (err) {
				console.log('===== error =====', err)
				setError(true)
			} finally {
				setLoading(false)
			}
		}
		fetchAPI(url)
	}, [url])

	return { APIData, loading, error }
}

export default useAPI
