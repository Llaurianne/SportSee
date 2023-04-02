import '../utils/styles/KeyDataCounter.css'
import PropTypes from 'prop-types'

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
