import calorie from '../../assets/energy.png'
import protein from '../../assets/protein.png'
import carbohydrate from '../../assets/carbohydrate.png'
import lipid from '../../assets/lipid.png'

/**
 *  Properly format the API data or mocked data before using it.
 *	@constructor
 *  @param	{Array} data - Contains all the data of a specific user.
 */
class FormatData {
	constructor(data) {
		this.mainData = data.mainData
		this.activity = data.activity
		this.sessions = data.sessions
		this.performance = data.performance
	}

	/**
	 * @returns {string} User's firstname.
	 */
	getName() {
		return this.mainData.userInfos.firstName
	}

	/**
	 * @typedef {Object} sessions
	 * @property {string} day - Date of the session.
	 * @property {number} kilograms - User's weight.
	 * @property {number} calories - Calories burned.
	 */

	/**
	 * @returns {sessions[]} Array of objects containing for each sport session: the date, the user's weight and the number of calories burned.
	 */
	getActivity() {
		return this.activity.sessions
	}

	/**
	 * @returns {Array} Array of the duration of each session.
	 */
	getSessions() {
		return this.sessions.sessions.map((s) => s.sessionLength)
	}

	/**
	 * @returns {Object.<string, number>} Object containing the values of each performance indicator.
	 */
	getPerformance() {
		return {
			Intensité: this.performance.data.find((p) => p.kind === 6).value,
			Vitesse: this.performance.data.find((p) => p.kind === 5).value,
			Force: this.performance.data.find((p) => p.kind === 4).value,
			Endurance: this.performance.data.find((p) => p.kind === 3).value,
			Energie: this.performance.data.find((p) => p.kind === 2).value,
			Cardio: this.performance.data.find((p) => p.kind === 1).value,
		}
	}

	/**
	 * @returns {number} Daily user's score.
	 */
	getScore() {
		if (this.mainData.todayScore) {
			return this.mainData.todayScore * 100
		} else if (this.mainData.score) {
			return this.mainData.score * 100
		}
	}

	/**
	 * @typedef {Object} counters
	 * @property {string} type - Counter type.
	 * @property {string} file - Icon file.
	 * @property {string} name - Counter name.
	 * @property {string} qty - Quantity and unit.
	 */

	/**
	 * @returns {counters[]} Array of objects containing for each counter: the type, the corresponding icon file, the name to be displayed and the quantity and unit formatted in a string.
	 */
	getCounter() {
		return [
			{
				type: 'calorie',
				file: calorie,
				name: 'Calories',
				qty: `${this.mainData.keyData.calorieCount}kCal`,
			},
			{
				type: 'protein',
				file: protein,
				name: 'Protéines',
				qty: `${this.mainData.keyData.proteinCount}g`,
			},
			{
				type: 'carbohydrate',
				file: carbohydrate,
				name: 'Glucides',
				qty: `${this.mainData.keyData.carbohydrateCount}g`,
			},
			{
				type: 'lipid',
				file: lipid,
				name: 'Lipides',
				qty: `${this.mainData.keyData.lipidCount}g`,
			},
		]
	}
}

export default FormatData
