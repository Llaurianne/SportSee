import '../utils/styles/LineChart.css'
import * as d3 from 'd3'
import { useRef, useEffect } from 'react'

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

		// Scales
		let labelsArray = ['L', 'Ma', 'Me', 'J', 'V', 'S', 'D']
		const yMax = Math.max(...data)

		const xScale = d3.scalePoint().domain(labelsArray).range([0, w])

		const yScale = d3.scaleLinear().domain([yMax, 0]).range([0, h])

		// Axes
		function xAxis(g) {
			g.attr(
				'transform',
				`translate(${margin.left},${margin.top + yScale(0)})`
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
			.curve(d3.curveBundle)

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
	}, [data])

	return (
		<div className="LineChart">
			<h2>{title}</h2>
			<svg ref={ref} />
		</div>
	)
}

export default LineChart
