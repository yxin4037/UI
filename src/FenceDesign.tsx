import React, { useState, useEffect, useRef } from "react";
import * as d3 from "d3";
import "./FenceDesign.css";

type FenceSegment = {
    id: number;
    length: number; // in mm
};

const FenceDesign = () => {
    const [gateCount, setGateCount] = useState<number>(1);
    const [fenceSegments, setFenceSegments] = useState<FenceSegment[]>([]);
    const svgRef = useRef<SVGSVGElement>(null);

    // 固定参数 (mm)
    const GATE_WIDTH = 1200; // 1.2m = 1200mm
    const POST_WIDTH = 100;  // 0.1m = 100mm
    const MIN_SEGMENT = 1000; // 1m = 1000mm (最小段长度)
    const MAX_TOTAL_LENGTH = 30000; // 30m = 30000mm (最大总长度)
    const SVG_HEIGHT = 300;
    const BASE_SCALE = 1.0; // 基础比例 1.0px/mm (放大显示比例)
    const PICKET_WIDTH = 50; // 栅栏板条宽度
    const PICKET_GAP = 100; // 栅栏板条间距

    // 初始化围栏段
    useEffect(() => {
        const segments: FenceSegment[] = [];
        const segmentCount = gateCount + 1;
        const initialLength = Math.floor(5000 / segmentCount); // 初始每段约5m

        for (let i = 0; i < segmentCount; i++) {
            segments.push({
                id: i,
                length: initialLength,
            });
        }

        setFenceSegments(segments);
    }, [gateCount]);

    // 计算总长度 (mm)
    const totalLength = fenceSegments.reduce((sum, seg) => sum + seg.length, 0) +
        gateCount * GATE_WIDTH;

    // 更新围栏段长度
    const updateSegmentLength = (id: number, newLength: number) => {
        setFenceSegments(prev =>
            prev.map(seg =>
                seg.id === id ? { ...seg, length: Math.max(MIN_SEGMENT, Math.min(MAX_TOTAL_LENGTH, newLength)) } : seg
            )
        );
    };

    // 绘制栅栏板条
    const drawPickets = (x: number, y: number, width: number, height: number) => {
        const svg = d3.select(svgRef.current);
        const picketCount = Math.floor(width / (PICKET_WIDTH + PICKET_GAP));
        const actualGap = (width - picketCount * PICKET_WIDTH) / (picketCount + 1);

        for (let i = 0; i < picketCount; i++) {
            svg.append("rect")
                .attr("x", x + actualGap + i * (PICKET_WIDTH + actualGap))
                .attr("y", y)
                .attr("width", PICKET_WIDTH * BASE_SCALE)
                .attr("height", height)
                .attr("class", "fence-picket");
        }
    };

    // 绘制铁门细节
    const drawGateDetails = (x: number, y: number, width: number, height: number, gateIndex: number) => {
        const svg = d3.select(svgRef.current);

        // 门框
        svg.append("rect")
            .attr("x", x)
            .attr("y", y)
            .attr("width", width)
            .attr("height", height)
            .attr("class", "gate-frame");

        // 横向支撑
        svg.append("line")
            .attr("x1", x)
            .attr("y1", y + height * 0.3)
            .attr("x2", x + width)
            .attr("y2", y + height * 0.3)
            .attr("class", "gate-brace");

        svg.append("line")
            .attr("x1", x)
            .attr("y1", y + height * 0.7)
            .attr("x2", x + width)
            .attr("y2", y + height * 0.7)
            .attr("class", "gate-brace");

        // 斜向支撑
        svg.append("line")
            .attr("x1", x)
            .attr("y1", y)
            .attr("x2", x + width)
            .attr("y2", y + height)
            .attr("class", "gate-brace");

        svg.append("line")
            .attr("x1", x)
            .attr("y1", y + height)
            .attr("x2", x + width)
            .attr("y2", y)
            .attr("class", "gate-brace");

        // 门把手
        svg.append("circle")
            .attr("cx", x + width * 0.9)
            .attr("cy", y + height * 0.5)
            .attr("r", 10)
            .attr("class", "gate-handle");
    };

    // 绘制围栏
    useEffect(() => {
        if (!svgRef.current || fenceSegments.length === 0) return;

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove();

        const totalWidth = totalLength * BASE_SCALE;
        const postWidthPx = POST_WIDTH * BASE_SCALE;
        const gateWidthPx = GATE_WIDTH * BASE_SCALE;
        const fenceHeight = 150;

        svg.attr("width", totalWidth)
            .attr("height", SVG_HEIGHT)
            .attr("viewBox", `0 0 ${totalWidth} ${SVG_HEIGHT}`)
            .attr("preserveAspectRatio", "xMidYMid meet");

        // 绘制围栏基线
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", SVG_HEIGHT - 50)
            .attr("x2", totalWidth)
            .attr("y2", SVG_HEIGHT - 50)
            .attr("class", "fence-base");

        let currentX = 0;

        // 绘制围栏段和门
        fenceSegments.forEach((segment, index) => {
            // 绘制围栏段
            const segmentWidth = segment.length * BASE_SCALE;

            // 绘制栅栏板条
            drawPickets(currentX, SVG_HEIGHT - fenceHeight - 50, segmentWidth, fenceHeight);

            // 绘制顶部和底部横栏
            svg.append("rect")
                .attr("x", currentX)
                .attr("y", SVG_HEIGHT - fenceHeight - 60)
                .attr("width", segmentWidth)
                .attr("height", 10)
                .attr("class", "fence-rail");

            svg.append("rect")
                .attr("x", currentX)
                .attr("y", SVG_HEIGHT - 60)
                .attr("width", segmentWidth)
                .attr("height", 10)
                .attr("class", "fence-rail");

            currentX += segmentWidth;

            // 如果不是最后一段，绘制门
            if (index < gateCount) {
                // 门左侧立柱
                svg.append("rect")
                    .attr("x", currentX)
                    .attr("y", SVG_HEIGHT - fenceHeight - 60)
                    .attr("width", postWidthPx)
                    .attr("height", fenceHeight + 60)
                    .attr("class", "gate-post");

                // 门板
                drawGateDetails(
                    currentX + postWidthPx,
                    SVG_HEIGHT - fenceHeight - 60,
                    gateWidthPx,
                    fenceHeight + 50,
                    index
                );

                // 门右侧立柱
                svg.append("rect")
                    .attr("x", currentX + postWidthPx + gateWidthPx)
                    .attr("y", SVG_HEIGHT - fenceHeight - 60)
                    .attr("width", postWidthPx)
                    .attr("height", fenceHeight + 60)
                    .attr("class", "gate-post");

                currentX += postWidthPx * 2 + gateWidthPx;
            }
        });
    }, [gateCount, fenceSegments, totalLength]);

    return (
        <div className="fence-app">
            <h2>Fence Design</h2>
            <div className="controls">
                <div className="control-group">
                    <label>Number of Gate:</label>
                    <select
                        value={gateCount}
                        onChange={(e) => setGateCount(Number(e.target.value))}
                    >
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                    </select>
                </div>
            </div>

            <div className="segment-controls">
                {fenceSegments.map((segment, index) => (
                    <div key={segment.id} className="segment-control">
                        <label>
                            {gateCount > 0 ? `Fence ${index + 1}` : "Fence"} Length:
                            <input
                                type="number"
                                min={MIN_SEGMENT}
                                max={MAX_TOTAL_LENGTH}
                                value={segment.length}
                                onChange={(e) => updateSegmentLength(segment.id, Number(e.target.value))}
                                step="1" // 1毫米步长
                            />
                        </label>
                        <span>mm ({(segment.length/1000).toFixed(3)}m)</span>
                    </div>
                ))}
            </div>

            <div className="fence-display-container">
                <div className="fence-display">
                    <svg ref={svgRef}></svg>
                </div>
            </div>

            <div className="specs">
                <p>Number of Gate: {gateCount} </p >
                <p>Gate width {GATE_WIDTH} mm ({(GATE_WIDTH/1000).toFixed(3)}m)</p >
                <p>Total Length {totalLength} mm ({(totalLength/1000).toFixed(3)}m)</p >
                {gateCount > 0 && (
                    <p>Total fence length: {fenceSegments.reduce((sum, s) => sum + s.length, 0)} mm</p >
                )}
            </div>
        </div>
    );
};

export default FenceDesign;