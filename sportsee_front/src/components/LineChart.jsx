import '../utils/styles/LineChart.css'
import * as d3 from 'd3'
import { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import BarChart from './BarChart'

function LineChart({ data, title }) {
	const ref = useRef()

	useEffect(() => {
		// Setting up the svg element
		const w = 230
		const h = 133
		const margin = { top: 90, right: 14, bottom: 40, left: 14 }

		const svg = d3
			.select(ref.current)
			.attr('width', w)
			.attr('height', h)
			.attr('viewBox', [0, 0, 258, 263])
			.style('overflow', 'visible')

		// Scales
		let labelsArray = ['L', 'Ma', 'Me', 'J', 'V', 'S', 'D']
		const yMax = Math.max(...data)

		const xScale = d3.scalePoint().domain(labelsArray).range([0, w])

		const yScale = d3
			.scaleLinear()
			.domain([yMax + 10, 0])
			.range([0, h - 30])

		// Axes
		function xAxis(g) {
			g.attr(
				'transform',
				`translate(${margin.left},${margin.top + yScale(0) + 30})`
			)
				.call(
					d3.axisBottom(xScale).tickFormat((d) => d.substring(0, 1))
				)
				.style('font-size', '12px')
				.style('color', 'white')
			g.selectAll('.tick line').style('display', 'none')
		}
		svg.selectAll('g').remove()
		svg.append('g').call(xAxis)

		// Data
		const generateScaledLine = d3
			.line()
			.x((d, i) => xScale(labelsArray[i]))
			.y(yScale)
			.curve(d3.curveNatural)

		svg.selectAll('path').remove()
		svg.selectAll('.line')
			.data([data])
			.join('path')
			.attr('d', (d) => generateScaledLine(d))
			.attr('transform', `translate(${margin.left}, ${margin.top})`)
		svg.selectAll('path')
			.style('fill', 'none')
			.style('stroke', 'white')
			.style('stroke-width', '2px')

		// Tooltip
		function mouseover(e, d) {
			let xPos = e.currentTarget.getAttribute('x')
			if (xPos < (5 * w) / 6) {
				d3.select('.tooltip .label')
					.style('opacity', 1)
					.attr('x', parseFloat(xPos) + w / 12 + 6)
					.attr('y', yScale(d) - 32)
				d3.select('.tooltip text')
					.style('opacity', 1)
					.attr('x', parseFloat(xPos) + w / 12 + 13)
					.attr('y', yScale(d) - 16)
					.attr('fill', 'black')
					.text(d + ' min')
					.style('font-size', '8px')
			} else {
				d3.select('.tooltip .label')
					.style('opacity', 1)
					.attr('x', parseFloat(xPos) + w / 12 - 45)
					.attr('y', yScale(d) - 32)
				d3.select('.tooltip text')
					.style('opacity', 1)
					.attr('x', parseFloat(xPos) + w / 12 - 39)
					.attr('y', yScale(d) - 16)
					.attr('fill', 'black')
					.text(d + ' min')
					.style('font-size', '8px')
			}
			d3.select('.tooltip circle')
				.style('opacity', 1)
				.attr('cx', parseFloat(xPos) + w / 12)
				.attr('cy', yScale(d))
			d3.select('.tooltip .overlay-left')
				.attr('width', parseFloat(xPos) + w / 12 + 5)
				.style('opacity', 0.5)
			d3.select('.tooltip .overlay-right')
				.attr('x', parseFloat(xPos) + w / 12)
				.attr('width', w - parseFloat(xPos) + margin.right)
				.style('opacity', 0.5)
		}

		function mouseout() {
			d3.select('.tooltip .label').style('opacity', 0)
			d3.select('.tooltip text').style('opacity', 0)
			d3.select('.tooltip circle').style('opacity', 0)
			d3.select('.tooltip .overlay-left').style('opacity', 0)
			d3.select('.tooltip .overlay-right').style('opacity', 0)
		}

		svg.append('g').attr('class', 'tooltip')

		svg.select('.tooltip')
			.append('rect')
			.attr('height', h + margin.top + margin.bottom)
			.attr('x', 0)
			.attr('fill', 'var(--color2)')
			.attr('class', 'overlay-left')
			.attr('pointer-events', 'none')
			.style('opacity', 0)
			.style('transition', 'all 300ms')
		svg.select('.tooltip')
			.append('rect')
			.attr('height', h + margin.top + margin.bottom)
			.attr('fill', 'rgba(0,0,0,0.5)')
			.attr('class', 'overlay-right')
			.attr('pointer-events', 'none')
			.style('opacity', 0)
			.style('transition', 'all 300ms')
		svg.select('.tooltip')
			.append('rect')
			.attr('transform', `translate(0, ${margin.top})`)
			.attr('height', 25)
			.attr('width', 39)
			.attr('fill', 'white')
			.attr('class', 'label')
			.attr('pointer-events', 'none')
			.style('opacity', 0)
			.style('transition', 'opacity 300ms')
		svg.select('.tooltip')
			.append('text')
			.attr('transform', `translate(0, ${margin.top})`)
			.style('opacity', 0)
			.style('transition', 'opacity 300ms')
		svg.select('.tooltip')
			.append('circle')
			.attr('transform', `translate(0, ${margin.top})`)
			.attr('r', 4)
			.attr('fill', 'white')
			.attr('stroke', 'rgba(255,255,255,0.2)')
			.attr('stroke-width', '5')
			.style('opacity', 0)
			.style('transition', 'opacity 300ms')
		svg.select('.tooltip')
			.selectAll('rect')
			.enter()
			.data(data)
			.join('rect')
			.attr('transform', `translate(0, ${margin.top})`)
			.attr('x', (d, i) => margin.left - w / 12 + (i * w) / 6)
			.attr('width', w / 6)
			.attr('height', yScale(0))
			.attr('opacity', 0)
			.on('mouseover', (e, d) => mouseover(e, d))
			.on('mouseout', mouseout)
	}, [data])

	return (
		<div className="LineChart">
			<h2>{title}</h2>
			<svg ref={ref} />
		</div>
	)
}

LineChart.propTypes = {
	data: PropTypes.arrayOf(PropTypes.number),
	title: PropTypes.string,
}

export default LineChart
