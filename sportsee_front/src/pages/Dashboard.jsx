import { useParams } from 'react-router-dom'
import '../utils/styles/Dashboard.css'
import BarChart from '../components/BarChart'
import LineChart from '../components/LineChart'
import CircularChart from '../components/CircularChart'
import RadarChart from '../components/RadarChart'
import KeyDataCounter from '../components/KeyDataCounter'
import Message from '../components/Message'
import mockedData from '../utils/mocks/mockedData'
import FormatData from '../utils/classes/FormatData'
import useAPI from '../utils/hooks/useAPI'

/**
 * React component. User's dashboard page.
 * @function
 * @returns {JSX.Element}
 */
function Dashboard() {
	const { userId } = useParams()

	let APIObjects = {
		mainData: useAPI(`http://localhost:3000/user/${userId}`),
		activity: useAPI(`http://localhost:3000/user/${userId}/activity`),
		sessions: useAPI(
			`http://localhost:3000/user/${userId}/average-sessions`
		),
		performance: useAPI(`http://localhost:3000/user/${userId}/performance`),
	}

	// Data to be used by default, from API
	let userData = new FormatData({
		mainData: APIObjects.mainData.APIData,
		activity: APIObjects.activity.APIData,
		sessions: APIObjects.sessions.APIData,
		performance: APIObjects.performance.APIData,
	})

	// Error=true if at least one of the API calls fail
	let error = [
		APIObjects.mainData.error,
		APIObjects.activity.error,
		APIObjects.sessions.error,
		APIObjects.performance.error,
		APIObjects.mainData === 'can not find user',
	].includes(true)

	// Loading=true if at least one of the API calls is loading
	let loading = [
		APIObjects.mainData.loading,
		APIObjects.activity.loading,
		APIObjects.sessions.loading,
		APIObjects.performance.loading,
	].includes(true)

	// If error, use of the mocked data
	if (error) {
		userData = new FormatData({
			mainData: findMockedData('USER_MAIN_DATA'),
			activity: findMockedData('USER_ACTIVITY'),
			sessions: findMockedData('USER_AVERAGE_SESSIONS'),
			performance: findMockedData('USER_PERFORMANCE'),
		})
	}

	// Extracts the data (with id or userId) of the user whose id is in the url
	function findMockedData(data) {
		if (mockedData[data][0].id) {
			return mockedData[data].find((d) => d.id === parseFloat(userId))
		}
		if (mockedData[data][0].userId) {
			return mockedData[data].find((d) => d.userId === parseFloat(userId))
		}
	}

	return (
		<div className="Dashboard">
			{error ? <Message /> : null}
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
								data={userData.getScore()}
								title="Score"
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
