import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'

/**
 * React component. Root Layout.
 * @function
 * @returns {JSX.Element}
 */
function Root() {
	return (
		<>
			<Header />
			<Sidebar />
			<Outlet />
		</>
	)
}

export default Root
