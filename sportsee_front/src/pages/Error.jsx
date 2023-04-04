import { Link } from 'react-router-dom'
import '../utils/styles/Error.css'

/**
 * React component. Error page.
 * @function
 * @returns {JSX.Element}
 */
function Error() {
	return (
		<div className="Error">
			<h1>Erreur 404</h1>
			<p>Page inexistante</p>
			<Link to="/">Retourner à la page d'accueil</Link>
		</div>
	)
}

export default Error
