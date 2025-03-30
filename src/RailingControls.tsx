import React from "react";

interface RailingControlsProps {
  height: number;
  firstFromBottom: number;
  color: string;
  collapsed: boolean;
  toggleCollapse: () => void;
  onChange: (field: string, value: any) => void;
}

const RailingControls: React.FC<RailingControlsProps> = ({
  height,
  firstFromBottom,
  color,
  collapsed,
  toggleCollapse,
  onChange,
}) => {
  return (
    <div className="panel-container">
      <div className="panel-header" onClick={toggleCollapse}>
        Railing {collapsed ? "▼" : "▲"}
      </div>
      {!collapsed && (
        <div className="panel-content">
          <div className="panel-input">
            <label>Height: </label>
            <select
              value={height}
              onChange={(e) => onChange("height", Number(e.target.value))}
            >
              {[70, 75, 90, 100].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="panel-input">
            <label>First from Bottom: </label>
            <select
              value={firstFromBottom}
              onChange={(e) =>
                onChange("firstFromBottom", Number(e.target.value))
              }
            >
              {[0, 100, 200, 300].map((offset) => (
                <option key={offset} value={offset}>
                  {offset}
                </option>
              ))}
            </select>
          </div>
          <div className="panel-input">
            <label>Color: </label>
            <input
              type="color"
              value={color}
              onChange={(e) => onChange("color", e.target.value)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default RailingControls;
