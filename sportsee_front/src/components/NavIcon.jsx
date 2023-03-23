import '../utils/styles/NavIcon.css'

function NavIcon({ sport }) {
	const altText = `${sport.split('/')[3].split('.')[0]} icon`
	return <img src={sport} className="NavIcon" alt={altText} />
}

export default NavIcon
