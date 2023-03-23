import '../utils/styles/KeyDataCounter.css'

function KeyDataCounter({ type, file, name, qty }) {
	return (
		<div className="KeyDataCounter">
			<img src={file} alt={`${type} icon`} className={type} />
			<p>{qty}</p>
			<p>{name}</p>
		</div>
	)
}

export default KeyDataCounter
