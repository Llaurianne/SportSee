import { useEffect, useState } from 'react'

/**
 * Fetch data from the API.
 * @param {string} url - Path to the resource to fetch.
 * @example useAPI(`http://localhost:3000/user/12`)
 * @returns {Object}
 */
function useAPI(url) {
	const [APIData, setData] = useState([])
	const [error, setError] = useState(false)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		console.log('UseAPI')
		async function fetchAPI(url) {
			setLoading(true)
			try {
				const response = await fetch(url)
				const data = await response.json()
				setData(data.data)
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
