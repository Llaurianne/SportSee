import '../utils/styles/KeyDataCounter.css'
import PropTypes from 'prop-types'

/**
 *  React component displaying a nutritional counter: calories or macronutrient.
 *  @function
 *  @param {string} type - Type of counter among these four options: calorie, protein, carbohydrate, lipid.
 *  @param {Object} file - Imported icon file.
 *  @param {string} name - Counter name to be displayed.
 *  @param {string} qty - Formatted quantity and unit.
 *  @returns {JSX.Element}
 */
function KeyDataCounter({ type, file, name, qty }) {
	return (
		<div className="KeyDataCounter">
			<img src={file} alt={`${type} icon`} className={type} />
			<p>{qty}</p>
			<p>{name}</p>
		</div>
	)
}

KeyDataCounter.propTypes = {
	type: PropTypes.string,
	file: PropTypes.node.isRequired,
	name: PropTypes.string,
	qty: PropTypes.string,
}

export default KeyDataCounter
