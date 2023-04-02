/**
 *  Format the API or mocked data correctly before using it.
 *
 *  @version 1.1
 */

import calorie from '../../assets/energy.png'
import protein from '../../assets/protein.png'
import carbohydrate from '../../assets/carbohydrate.png'
import lipid from '../../assets/lipid.png'

export default class FormatData {
	constructor(data) {
		this.mainData = data.mainData
		this.activity = data.activity
		this.sessions = data.sessions
		this.performance = data.performance
	}

	getName() {
		return this.mainData.userInfos.firstName
	}

	getActivity() {
		return this.activity.sessions
	}

	getSessions() {
		return this.sessions.sessions.map((s) => s.sessionLength)
	}

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

	getScore() {
		if (this.mainData.todayScore) {
			return this.mainData.todayScore * 100
		} else if (this.mainData.score) {
			return this.mainData.score * 100
		}
	}

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
