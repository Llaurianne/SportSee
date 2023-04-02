import '../utils/styles/RadarChart.css'
import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import BarChart from './BarChart'

function RadarChart({ data }) {
	const ref = useRef()
	const keys = Object.keys(data)
	const values = Object.values(data)

	useEffect(() => {
		// Setting up the svg element
		const w = 180
		const h = 180
		const margin = { top: 41, right: 39, bottom: 42, left: 39 }

		const svg = d3
			.select(ref.current)
			.attr('width', w)
			.attr('height', h)
			.attr('viewBox', [0, 0, 258, 263])

		// Scales
		const rMax = 250
		const alpha = 360 / keys.length
		const rScale = d3
			.scaleLinear()
			.domain([0, rMax])
			.range([0, w / 2])

		function xValue(d, i) {
			return rScale(
				rMax + d * Math.cos(((90 - i * alpha) * 2 * Math.PI) / 360)
			)
		}

		function yValue(d, i) {
			return rScale(
				rMax - d * Math.sin(((90 - i * alpha) * 2 * Math.PI) / 360)
			)
		}

		// Polygons
		const steps = 5

		function poly(r) {
			let points = []
			for (let i = 0; i < keys.length; i++) {
				points.push({
					x: xValue(r, i),
					y: yValue(r, i),
				})
			}
			points.push(points[0])
			return points
		}

		const generatePolyLine = d3
			.line()
			.x(function (d) {
				return d.x
			})
			.y(function (d) {
				return d.y
			})

		for (let i = 1; i <= steps; i++) {
			svg.append('path')
				.attr(
					'd',
					generatePolyLine(poly(((steps - i) * rMax) / (steps - 1)))
				)
				.style('stroke', 'white')
				.style('fill', 'none')
				.attr('transform', `translate(${margin.left}, ${margin.top})`)
		}

		svg.append('path')
			.attr('d', generatePolyLine(poly((0.5 * rMax) / (steps - 1))))
			.style('stroke', 'white')
			.style('fill', 'none')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		// Data
		const dataPoints = values.map((d, i) => ({
			x: xValue(d, i),
			y: yValue(d, i),
		}))

		svg.append('path')
			.attr('d', generatePolyLine(dataPoints))
			.style('stroke', 'none')
			.style('fill', 'rgba(255,1,1,0.7)')
			.attr('transform', `translate(${margin.left}, ${margin.top})`)

		// Labels
		const W = w + 50
		const H = h + 30
		svg.selectAll('.ticklabel')
			.data(keys)
			.join((t) =>
				t
					.append('text')
					.attr('class', 'ticklabel')
					.attr(
						'x',
						(t, i) => (W / 2) * (1 + Math.sin((i * Math.PI) / 3))
					)
					.attr(
						'y',
						(t, i) => (H / 2) * (1 - Math.cos((i * Math.PI) / 3))
					)
					.style('font-size', '12px')
					.style('text-anchor', 'middle')
					.style('fill', 'white')
					.text((t) => t.toString())
					.attr(
						'transform',
						`translate(${margin.left - 25}, ${margin.top + 6 - 15})`
					)
			)
	}, [data])

	return (
		<div className="RadarChart">
			<svg ref={ref} />
		</div>
	)
}

RadarChart.propTypes = {
	data: PropTypes.shape({
		Intensité: PropTypes.number,
		Vitesse: PropTypes.number,
		Force: PropTypes.number,
		Endurance: PropTypes.number,
		Energie: PropTypes.number,
		Cardio: PropTypes.number,
	}),
}

export default RadarChart
