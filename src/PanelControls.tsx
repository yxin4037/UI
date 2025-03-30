import React from "react";

type PanelControlsProps = {
  width: number;
  height: number;
  showHeader: boolean;
  showCapping: boolean;
  showPlinth: boolean;
  collapsed: boolean;
  onChange: (field: string, value: any) => void;
  toggleCollapse: () => void;
};

const PanelControls: React.FC<PanelControlsProps> = ({
  width,
  height,
  showHeader,
  showCapping,
  showPlinth,
  collapsed,
  onChange,
  toggleCollapse,
}) => {
  return (
    <div className="panel-container">
      <div className="panel-header" onClick={toggleCollapse}>
        Panel {collapsed ? "▼" : "▲"}
      </div>
      {!collapsed && (
        <div className="panel-content">
          <div className="panel-input">
            <label>Width: </label>
            <input
              type="number"
              value={width}
              min={900}
              max={3000}
              onChange={(e) => onChange("width", Number(e.target.value))}
            />
          </div>
          <div className="panel-input">
            <label>Height: </label>
            <input
              type="number"
              value={height}
              min={900}
              max={2500}
              onChange={(e) => onChange("height", Number(e.target.value))}
            />
          </div>
          <div className="panel-checkbox">
            <label>
              <input
                type="checkbox"
                checked={showHeader}
                onChange={(e) => onChange("showHeader", e.target.checked)}
              />{" "}
              Header
            </label>
            <label>
              <input
                type="checkbox"
                checked={showCapping}
                onChange={(e) => onChange("showCapping", e.target.checked)}
              />{" "}
              Capping
            </label>
            <label>
              <input
                type="checkbox"
                checked={showPlinth}
                onChange={(e) => onChange("showPlinth", e.target.checked)}
              />{" "}
              Plinth
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default PanelControls;
