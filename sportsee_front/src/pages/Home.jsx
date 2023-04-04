import { Link } from 'react-router-dom'
import '../utils/styles/Home.css'

/**
 * React component. Home page.
 * @function
 * @returns {JSX.Element}
 */
function Home() {
	return (
		<div className="Home">
			<main>
				<h1>Bienvenue</h1>
				<p>Veuillez choisir un profil utilisateur</p>
				<ul>
					<li>
						<Link to="/user/12">Karl Dovineau</Link>
					</li>
					<li>
						<Link to="/user/18">Cecilia Ratorez</Link>
					</li>
				</ul>
			</main>
		</div>
	)
}

export default Home
