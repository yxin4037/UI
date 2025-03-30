import React from "react";

type PalingControlsProps = {
  style: string;
  width: number;
  spacing: number;
  bottomGap: number;
  color: string;
  collapsed: boolean;
  toggleCollapse: () => void;
  onChange: (field: string, value: any) => void;
};

const PalingControls: React.FC<PalingControlsProps> = ({
  style,
  width,
  spacing,
  bottomGap,
  color,
  collapsed,
  toggleCollapse,
  onChange,
}) => {
  return (
    <div className="panel-container">
      <div className="panel-header" onClick={toggleCollapse}>
        Paling {collapsed ? "▼" : "▲"}
      </div>
      {!collapsed && (
        <div className="panel-content">
          <div className="panel-input">
            <label>Style: </label>
            <select
              value={style}
              onChange={(e) => onChange("style", e.target.value)}
            >
              {["None", "Pyramid", "Semi-circular"].map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="panel-input">
            <label>Width: </label>
            <select
              value={width}
              onChange={(e) => onChange("width", Number(e.target.value))}
            >
              {[50, 68, 70, 75, 100, 150].map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
          <div className="panel-input">
            <label>Horizontal spacing: </label>
            <input
              type="number"
              value={spacing}
              onChange={(e) => onChange("spacing", Number(e.target.value))}
            />
          </div>
          <div className="panel-input">
            <label>Bottom gap: </label>
            <input
              type="number"
              value={bottomGap}
              onChange={(e) => onChange("bottomGap", Number(e.target.value))}
            />
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

export default PalingControls;
