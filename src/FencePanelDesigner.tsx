import React, { useEffect, useRef, useState } from "react";
import "./FencePanelDesigner.css";
import * as d3 from "d3";
import PanelControls from "./PanelControls";
import PostControls from "./PostControls";
import PalingControls from "./PalingControls";
import RailingControls from "./RailingControls";

const FencePanelDesigner: React.FC = () => {
  const ref = useRef<SVGSVGElement | null>(null);

  const [panelWidth, setPanelWidth] = useState(2200);
  const [panelHeight, setPanelHeight] = useState(1800);
  const [showHeader, setShowHeader] = useState(true);
  const [showCapping, setShowCapping] = useState(true);
  const [showPlinth, setShowPlinth] = useState(true);
  const [panelCollapsed, setPanelCollapsed] = useState(false);
  const [postCollapsed, setPostCollapsed] = useState(false);
  const [palingCollapsed, setPalingCollapsed] = useState(false);
  const [railingCollapsed, setRailingCollapsed] = useState(false);

  const [postWidth, setPostWidth] = useState(125);
  const [postType, setPostType] = useState("exposed");
  const [postCap, setPostCap] = useState("None");
  const [postExtension, setPostExtension] = useState(0);
  const [postColor, setPostColor] = useState("#8B5C41");

  const [palingStyle, setPalingStyle] = useState("None");
  const [palingWidth, setPalingWidth] = useState(100);
  const [palingSpacing, setPalingSpacing] = useState(22);
  const [palingBottomGap, setPalingBottomGap] = useState(0);
  const [palingColor, setPalingColor] = useState("#C09B86");

  const [railHeight, setRailHeight] = useState(75);
  const [railFirstOffset, setRailFirstOffset] = useState(0);
  const [railColor, setRailColor] = useState("#A68064");

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll("*").remove();

    const SCALE = 0.2;
    const POST_HEIGHT = 1800;
    const HEADER_HEIGHT = 175;
    const HEADER_OFFSET = panelHeight - HEADER_HEIGHT;
    const CAPPING_HEIGHT = 25;
    const PLINTH_HEIGHT = 30;

    const svgWidth = panelWidth * SCALE;
    const svgHeight = panelHeight * SCALE + 100;

    svg.attr("width", svgWidth).attr("height", svgHeight);

    const usableWidth = panelWidth - 2 * postWidth;
    let palingCount = Math.floor(
      (usableWidth + palingSpacing) / (palingWidth + palingSpacing)
    );
    let adjustedGap =
      (usableWidth - palingCount * palingWidth) / (palingCount - 1);

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", postWidth * SCALE)
      .attr("height", POST_HEIGHT * SCALE)
      .attr("fill", postColor);

    svg
      .append("rect")
      .attr("x", (panelWidth - postWidth) * SCALE)
      .attr("y", 0)
      .attr("width", postWidth * SCALE)
      .attr("height", POST_HEIGHT * SCALE)
      .attr("fill", postColor);

    for (let i = 0; i < palingCount; i++) {
      let x = (postWidth + i * (palingWidth + adjustedGap)) * SCALE;
      svg
        .append("rect")
        .attr("x", x)
        .attr("y", (panelHeight - 1700 - palingBottomGap) * SCALE)
        .attr("width", palingWidth * SCALE)
        .attr("height", 1700 * SCALE)
        .attr("fill", palingColor);
    }

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", (panelHeight - railFirstOffset - railHeight) * SCALE)
      .attr("width", panelWidth * SCALE)
      .attr("height", railHeight * SCALE)
      .attr("fill", railColor);

    svg
      .append("rect")
      .attr("x", 0)
      .attr("y", 175 * SCALE)
      .attr("width", panelWidth * SCALE)
      .attr("height", railHeight * SCALE)
      .attr("fill", railColor);

    if (showHeader) {
      svg
        .append("rect")
        .attr("x", postWidth * SCALE)
        .attr("y", HEADER_OFFSET * SCALE)
        .attr("width", (panelWidth - postWidth * 2) * SCALE)
        .attr("height", HEADER_HEIGHT * SCALE)
        .attr("fill", railColor);
    }

    if (showCapping) {
      svg
        .append("rect")
        .attr("x", postWidth * SCALE)
        .attr("y", 0)
        .attr("width", (panelWidth - postWidth * 2) * SCALE)
        .attr("height", CAPPING_HEIGHT * SCALE)
        .attr("fill", railColor);
    }

    if (showPlinth) {
      svg
        .append("rect")
        .attr("x", postWidth * SCALE)
        .attr("y", panelHeight * SCALE - PLINTH_HEIGHT * SCALE)
        .attr("width", (panelWidth - postWidth * 2) * SCALE)
        .attr("height", PLINTH_HEIGHT * SCALE)
        .attr("fill", railColor);
    }
  }, [
    panelWidth,
    panelHeight,
    showHeader,
    showCapping,
    showPlinth,
    postWidth,
    postColor,
    palingWidth,
    palingSpacing,
    palingBottomGap,
    palingColor,
    railHeight,
    railFirstOffset,
    railColor,
  ]);

  return (
    <div>
      <h2>Fence Panel Designer</h2>
      <div className="fence-svg">
        <svg ref={ref}></svg>
      </div>
      <PanelControls
        width={panelWidth}
        height={panelHeight}
        showHeader={showHeader}
        showCapping={showCapping}
        showPlinth={showPlinth}
        collapsed={panelCollapsed}
        toggleCollapse={() => setPanelCollapsed(!panelCollapsed)}
        onChange={(field, value) => {
          if (field === "width") setPanelWidth(value);
          if (field === "height") setPanelHeight(value);
          if (field === "showHeader") setShowHeader(value);
          if (field === "showCapping") setShowCapping(value);
          if (field === "showPlinth") setShowPlinth(value);
        }}
      />

      <PostControls
        width={postWidth}
        type={postType}
        cap={postCap}
        extension={postExtension}
        color={postColor}
        collapsed={postCollapsed}
        toggleCollapse={() => setPostCollapsed(!postCollapsed)}
        onChange={(field, value) => {
          if (field === "width") setPostWidth(value);
          if (field === "type") setPostType(value);
          if (field === "cap") setPostCap(value);
          if (field === "extension") setPostExtension(value);
          if (field === "color") setPostColor(value);
        }}
      />

      <PalingControls
        style={palingStyle}
        width={palingWidth}
        spacing={palingSpacing}
        bottomGap={palingBottomGap}
        color={palingColor}
        collapsed={palingCollapsed}
        toggleCollapse={() => setPalingCollapsed(!palingCollapsed)}
        onChange={(field, value) => {
          if (field === "style") setPalingStyle(value);
          if (field === "width") setPalingWidth(value);
          if (field === "spacing") setPalingSpacing(value);
          if (field === "bottomGap") setPalingBottomGap(value);
          if (field === "color") setPalingColor(value);
        }}
      />

      <RailingControls
        height={railHeight}
        firstFromBottom={railFirstOffset}
        color={railColor}
        collapsed={railingCollapsed}
        toggleCollapse={() => setRailingCollapsed(!railingCollapsed)}
        onChange={(field, value) => {
          if (field === "height") setRailHeight(value);
          if (field === "firstFromBottom") setRailFirstOffset(value);
          if (field === "color") setRailColor(value);
        }}
      />
    </div>
  );
};

export default FencePanelDesigner;
