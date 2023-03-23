import NavIcon from './NavIcon'
import yoga from '../assets/yoga.png'
import swimming from '../assets/swimming.png'
import bike from '../assets/bike.png'
import strengthening from '../assets/strengthening.png'
import '../utils/styles/Sidebar.css'

function Sidebar() {
	return (
		<div className="SideBar">
			<div>
				<NavIcon sport={yoga}></NavIcon>
				<NavIcon sport={swimming}></NavIcon>
				<NavIcon sport={bike}></NavIcon>
				<NavIcon sport={strengthening}></NavIcon>
			</div>
			<p>Copyright, SportSee 2020</p>
		</div>
	)
}

export default Sidebar
