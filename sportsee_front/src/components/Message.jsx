import '../utils/styles/Message.css'
import error from '../assets/error.png'

/**
 *  React component displaying information when mocked data is used.
 *  @function
 *  @returns {JSX.Element}
 */
function Message() {
	return (
		<div className="Message">
			<img src={error} alt="Connection failed" />
			<p>
				Impossible de se connecter au serveur, les données présentées
				ci-dessous sont des données mockées.
			</p>
		</div>
	)
}

export default Message
