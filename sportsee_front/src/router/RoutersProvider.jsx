import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom'
import Root from '../pages/Root'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Error from '../pages/Error'

/**
 * App router
 * @type {Router}
 * @returns {JSX.Element}
 */
const routesProvider = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Root />}>
			<Route index element={<Home />} errorElement={<Error />} />
			<Route
				path="user/:userId"
				element={<Dashboard />}
				errorElement={<Error />}
			/>
			<Route path="*" element={<Error />} />
		</Route>
	)
)

export default function RoutesProvider() {
	return <RouterProvider router={routesProvider} />
}
