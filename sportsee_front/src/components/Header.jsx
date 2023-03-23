import { Link } from 'react-router-dom'

import logo from '../assets/sportsee_logo.svg'
import '../utils/styles/Header.css'

function Header() {
	return (
		<div className="MainHeader">
			<Link to="/">
				<img src={logo} className="Logo" alt="SportSee logo" />
			</Link>
			<nav>
				<ul>
					<li>
						<Link to="/">Accueil</Link>
					</li>
					<li>Profil</li>
					<li>Réglage</li>
					<li>Communauté</li>
				</ul>
			</nav>
		</div>
	)
}

export default Header
