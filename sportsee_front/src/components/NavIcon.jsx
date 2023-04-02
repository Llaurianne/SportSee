import '../utils/styles/NavIcon.css'
import PropTypes from 'prop-types'

function NavIcon({ sport }) {
	const altText = `${sport.split('/')[3].split('.')[0]} icon`
	return <img src={sport} className="NavIcon" alt={altText} />
}

NavIcon.propTypes = {
	sport: PropTypes.node.isRequired,
}

export default NavIcon
