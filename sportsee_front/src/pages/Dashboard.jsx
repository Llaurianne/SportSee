import { useParams } from 'react-router-dom'
import '../utils/styles/Dashboard.css'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import CircularChart from '../components/CircularChart'
import RadarChart from '../components/RadarChart'
import KeyDataCounter from '../components/KeyDataCounter'
import mockedData from '../utils/mocks/mockedData'
import FormatData from '../utils/classes/FormatData'
import useAPI from '../utils/hooks/useAPI'

function Dashboard() {
	const { userId } = useParams()
	let APIUserData = {}
	const APIData = {
		mainData: useAPI(`http://localhost:3000/user/${userId}`),
		activity: useAPI(`http://localhost:3000/user/${userId}/activity`),
		sessions: useAPI(
			`http://localhost:3000/user/${userId}/average-sessions`
		),
		performance: useAPI(`http://localhost:3000/user/${userId}/performance`),
	}

	for (let data in APIData) {
		APIUserData[data] = APIData[data].APIData.data
	}
	function findMockedData(data) {
		if (mockedData[data][0].id) {
			return mockedData[data].find((d) => d.id === parseFloat(userId))
		}
		if (mockedData[data][0].userId) {
			return mockedData[data].find((d) => d.userId === parseFloat(userId))
		}
	}
	let mockedUserData = {
		mainData: findMockedData('USER_MAIN_DATA'),
		activity: findMockedData('USER_ACTIVITY'),
		sessions: findMockedData('USER_AVERAGE_SESSIONS'),
		performance: findMockedData('USER_PERFORMANCE'),
	}

	let loading = false
	let userData
	for (let data in APIData) {
		if (
			APIData[data].error === true ||
			APIData.mainData === 'can not find user'
		) {
			userData = new FormatData(mockedUserData)
		} else {
			userData = new FormatData(APIUserData)
		}
		if (APIData[data].loading) {
			loading = true
		}
	}

	return (
		<div className="Dashboard">
			{!loading ? (
				<main>
					<h1>
						{`Bonjour `}
						<span>{userData.getName()}</span>
					</h1>
					<p>
						Félicitation ! Vous avez explosé vos objectifs hier 👏
					</p>
					<div className="analytics">
						<div className="charts">
							<BarChart
								data={userData.getActivity()}
								title="Activité quotidienne"
							/>
							<LineChart
								data={userData.getSessions()}
								title="Durée moyenne des sessions"
							/>
							<RadarChart data={userData.getPerformance()} />
							<CircularChart
								title="Score"
								data={userData.getScore()}
							/>
						</div>
						<div className="key-datas">
							{userData.getCounter().map((elt) => (
								<KeyDataCounter
									key={elt.name}
									type={elt.type}
									file={elt.file}
									qty={elt.qty}
									name={elt.name}
								/>
							))}
						</div>
					</div>
				</main>
			) : null}
		</div>
	)
}

export default Dashboard

/*

 */
