import { Link } from 'react-router-dom'
import '../utils/styles/Error.css'

function Error() {
	return (
		<div className="Error">
			<h1>Erreur 404</h1>
			<p>Profil inexistant</p>
			<Link to="/">Retourner à la page d'accueil</Link>
		</div>
	)
}

export default Error
