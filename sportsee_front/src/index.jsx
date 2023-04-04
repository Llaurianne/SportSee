import React from 'react'
import ReactDOM from 'react-dom/client'
import RoutesProvider from './router/RoutersProvider'
import './utils/styles/index.css'

/**
 * Create React application.
 * @type {Root}
 */
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<RoutesProvider />
	</React.StrictMode>
)
