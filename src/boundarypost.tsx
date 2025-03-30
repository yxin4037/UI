import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
const BoundaryPost: React.FC = () => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    useEffect(() => {
        const svg = d3.select(svgRef.current)
            .attr("width", 500)
            .attr("height", 500);

        // 圆形部分
        const circleRadius = 10;
        const circleCX = circle.attr("cx"); // 获取圆心的cx值
        svg.append("rect")
            .attr("x", circleCX - circleRadius) // 设置矩形的x值为圆心的cx减去圆的半径
            .attr("y", 110) // 垂直居中对齐
            .attr("width", rect1Width)
            .attr("height", rect1Height)
            .attr("fill", "black");

        // 扁长矩形部分，放置在圆形的右边
        const rect1Width = 50;
        const rect1Height = 20;
        svg.append("rect")
            .attr("x", circle.cx-circleRadius ) // 使矩形与圆形相连
            .attr("y", 110) // 垂直居中对齐
            .attr("width", rect1Width)
            .attr("height", rect1Height)
            .attr("fill", "black");

        // 细长矩形部分，放置在扁长矩形的右边
        const rect2Width = 20;
        const rect2Height = 100;
        svg.append("rect")
            .attr("x", 100 + circleRadius + 10 + rect1Width + 10) // 使细长矩形与扁长矩形相连
            .attr("y", 100 - rect2Height / 2) // 垂直居中对齐
            .attr("width", rect2Width)
            .attr("height", rect2Height)
            .attr("fill", "green");

    }, []);

    return (
        <svg ref={svgRef}></svg>
    );
};

export default BoundaryPost;