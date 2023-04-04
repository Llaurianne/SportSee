import '../utils/styles/BarChart.css'
import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'

/**
 *  React component displaying the daily activity bar chart (using D3.js).
 *  @function
 *  @param	{sessions[]} data - Array of objects containing for each sport session: the date, the user's weight and the number of calories burned.
 *  @see sessions
 *  @param {string} title - Chart title.
 *  @returns {JSX.Element}
 */
function BarChart({ data, title }) {
	const ref = useRef()

	useEffect(() => {
		// Setting up the svg element
		const w = 702
		const h = 145
		const margin = { top: 112.5, right: 90, bottom: 62.5, left: 43 }

		const svg = d3
			.select(ref.current)
			.attr('width', w)
			.attr('height', h)
			.attr('viewBox', [0, 0, 835, 320])

		// Scales
		const xScale = d3
			.scaleBand()
			.domain(d3.range(data.length))
			.range([0, w + w / data.length - 9])

		const yMin = Math.ceil(Math.min(...data.map((d) => d.kilogram)))
		const yMax = Math.ceil(Math.max(...data.map((d) => d.kilogram))) + 1
		const yScale = d3
			.scaleLinear()
			.domain([yMax, yMin - 1])
			.range([0, h])

		// Second yScale for second mesured value
		const yMax2 = Math.ceil(Math.max(...data.map((d) => d.calories))) + 50
		const yScale2 = d3.scaleLinear().domain([yMax2, 0]).range([0, h])

		// Axes
		function xAxis(g) {
			g.attr(
				'transform',
				`translate(${margin.left},${h + margin.top})`
			).call(
				d3
					.axisBottom(xScale)
					.tickPadding(18)
					.tickSize(0)
					.tickFormat((i) => i + 1)
			)
			g.selectAll('text')
				.style('color', '#9b9eac')
				.style('font-size', '14px')
				.attr(
					'transform',
					`translate(${-xScale.bandwidth() / 2 + 11},0)`
				)
			g.select('path').style('display', 'none')
		}

		function yAxis(g) {
			let ticksArray = []
			for (let i = yMin - 1; i <= yMax; i++) {
				ticksArray.push(i)
			}
			g.attr(
				'transform',
				`translate(${w + margin.left}, ${margin.top})`
			).call(
				d3
					.axisRight(yScale)
					.ticks(ticksArray.length, '.0f')
					.tickPadding(45)
					.tickValues(ticksArray)
					.tickSize(-w)
					.tickSizeOuter(0)
			)
			g.selectAll('text')
				.style('color', '#9b9eac')
				.style('font-size', '14px')
			g.selectAll('g.tick')
				.style('color', '#dedede')
				.style('stroke-dasharray', '2 2')
			g.select('g.tick line').style('stroke-dasharray', '2 0')
			g.select('path').style('display', 'none')
		}

		svg.selectAll('g').remove()
		svg.append('g').call(yAxis)
		svg.append('g').call(xAxis)

		// Tooltip
		function mouseover() {
			d3.select(this).style('opacity', 0.5)
			d3.select(this.parentNode).select('.label').style('opacity', 1)
		}
		function mouseout() {
			d3.select(this).style('opacity', 0)
			d3.select(this.parentNode).select('.label').style('opacity', 0)
		}

		svg.append('g')
			.selectAll('.tooltip')
			.data(data)
			.join((enter) => {
				let g = enter.append('g')
				g.attr(
					'transform',
					`translate(${
						margin.left - 0.25 * xScale.bandwidth() + 11
					}, ${margin.top})`
				)
				g.append('rect')
					.attr('x', (d, i) => xScale(i))
					.attr('height', h - yScale(yMax) + 1)
					.attr('width', 0.5 * xScale.bandwidth())
					.attr('fill', '#c4c4c4')
					.attr('opacity', 0)
					.attr('pointer-events', 'fill')
					.on('mouseover', mouseover)
					.on('mouseout', mouseout)

				g.append('rect')
					.attr('x', (d, i) => xScale(i) + 63)
					.attr('y', -30)
					.attr('height', 63)
					.attr('width', 39)
					.attr('fill', 'var(--color3)')
					.attr('class', 'label')
					.style('opacity', 0)
					.style('transition', 'opacity 300ms')
				g.append('text')
					.text((data) => data.kilogram + 'kg')
					.attr('x', (d, i) => xScale(i) + 82.5)
					.attr('y', -6)
					.attr('width', 39)
					.attr('fill', 'white')
					.style('font-size', '7px')
					.style('text-anchor', 'middle')
				g.append('text')
					.text((data) => data.calories + 'kcal')
					.attr('x', (d, i) => xScale(i) + 82.5)
					.attr('y', 18)
					.attr('width', 39)
					.attr('fill', 'white')
					.style('font-size', '7px')
					.style('text-anchor', 'middle')
			})

		// Data
		svg.append('g')
			.attr('fill', '#e60000')
			.attr('transform', `translate(${margin.left + 15}, ${margin.top})`)
			.attr('style', `max-height: ${yScale2(0)}px`)
			.selectAll('rect')
			.data(data)
			.join('rect')
			.attr('x', (d, i) => xScale(i))
			.attr('y', (d) => yScale2(d.calories))
			.attr('title', (d) => d.calories)
			.attr('height', (d) => h - yScale2(d.calories) + 5)
			.attr('width', 7)
			.attr('rx', 3)
			.attr('ry', 3)
			.attr('pointer-events', 'none')

		svg.append('g')
			.attr('fill', 'black')
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.selectAll('rect')
			.data(data)
			.join('rect')
			.attr('x', (d, i) => xScale(i))
			.attr('y', (d) => yScale(d.kilogram))
			.attr('title', (d) => d.kilogram)
			.attr('height', (d) => h - yScale(d.kilogram) + 5)
			.attr('width', 7)
			.attr('rx', 3)
			.attr('ry', 3)
			.attr('pointer-events', 'none')

		// Mask
		svg.select('rect').remove()
		svg.append('rect')
			.attr('fill', '#fbfbfb')
			.attr('x', margin.left)
			.attr('y', h + margin.top + 1)
			.attr('height', 5)
			.attr('width', w)
	}, [data])

	return (
		<div className="BarChart">
			<header>
				<h2>{title}</h2>
				<p>
					<span></span>
					Poids (kg)
				</p>
				<p>
					<span></span>
					Calories brûlées (kCal)
				</p>
			</header>
			<svg ref={ref} />
		</div>
	)
}

BarChart.propTypes = {
	data: PropTypes.arrayOf(
		PropTypes.shape({
			day: PropTypes.string,
			kilogram: PropTypes.number,
			calories: PropTypes.number,
		})
	),
	title: PropTypes.string,
}

export default BarChart
