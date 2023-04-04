import '../utils/styles/Circularchart.css'
import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import PropTypes from 'prop-types'

/**
 *  React component displaying the daily score circular chart (using D3.js).
 *	@function
 *  @param	{number} data - Daily user's score.
 *  @param {string} title - Chart title.
 *  @returns {JSX.Element}
 */
function CircularChart({ data, title }) {
	const ref = useRef()

	useEffect(() => {
		// Setting up the svg element
		const w = 170
		const h = 170
		const margin = { top: 50, right: 49, bottom: 53, left: 49 }

		const svg = d3
			.select(ref.current)
			.attr('width', w)
			.attr('height', h)
			.attr('viewBox', [0, 0, 258, 263])

		svg.selectAll('circle').remove()
		svg.append('circle')
			.attr('cx', margin.left + w / 2)
			.attr('cy', margin.top + h / 2)
			.attr('r', h / 2 - 5)
			.attr('fill', 'white')

		// Scales
		const scale = d3
			.scaleLinear()
			.domain([0, -1])
			.range([0, 2 * Math.PI])

		// Data
		const arc = d3
			.arc()
			.innerRadius(h / 2 - 10)
			.outerRadius(h / 2)
			.startAngle(0)
			.endAngle(scale(data / 100))
			.cornerRadius(5)

		svg.selectAll('path').remove()
		svg.append('path')
			.attr('class', 'arc')
			.attr('d', arc)
			.attr('fill', 'red')
			.attr(
				'transform',
				`translate(${w / 2 + margin.left}, ${h / 2 + margin.top})`
			)
	}, [data])

	return (
		<div className="CircularChart">
			<h2>{title}</h2>
			<p>
				<span>{data}%</span>
				<span>de votre objectif</span>
			</p>
			<svg ref={ref} />
		</div>
	)
}

CircularChart.propTypes = {
	data: PropTypes.number,
	title: PropTypes.string,
}

export default CircularChart
