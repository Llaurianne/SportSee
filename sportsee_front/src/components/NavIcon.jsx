import '../utils/styles/NavIcon.css'
import PropTypes from 'prop-types'

/**
 *  React component displaying a menu icon.
 *	@function
 *  @param	{Object} sport - Imported icon file.
 *  @returns {JSX.Element}
 */
function NavIcon({ sport }) {
	const altText = `${sport.split('/')[3].split('.')[0]} icon`
	return <img src={sport} className="NavIcon" alt={altText} />
}

NavIcon.propTypes = {
	sport: PropTypes.node.isRequired,
}

export default NavIcon
