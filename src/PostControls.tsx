import React from "react";

type PostControlsProps = {
  width: number;
  type: string;
  cap: string;
  extension: number;
  color: string;
  collapsed: boolean;
  onChange: (field: string, value: any) => void;
  toggleCollapse: () => void;
};

const PostControls: React.FC<PostControlsProps> = ({
  width,
  type,
  cap,
  extension,
  color,
  collapsed,
  onChange,
  toggleCollapse,
}) => {
  return (
    <div className="panel-container">
      <div className="panel-header" onClick={toggleCollapse}>
        Post {collapsed ? "▼" : "▲"}
      </div>
      {!collapsed && (
        <div className="panel-content">
          <div className="panel-input">
            <label>Width: </label>
            <select
              value={width}
              onChange={(e) => onChange("width", Number(e.target.value))}
            >
              {[50, 75, 100, 125, 150, 200, 250].map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>
          </div>
          <div className="panel-input">
            <label>Type: </label>
            <select
              value={type}
              onChange={(e) => onChange("type", e.target.value)}
            >
              <option value="hidden">Hidden</option>
              <option value="exposed">Exposed</option>
            </select>
          </div>
          <div className="panel-input">
            <label>Cap: </label>
            <select
              value={cap}
              onChange={(e) => onChange("cap", e.target.value)}
            >
              <option value="None">None</option>
              <option value="Sculpt.six">Sculpt.six</option>
            </select>
          </div>
          <div className="panel-input">
            <label>Visible Extension: </label>
            <select
              value={extension}
              onChange={(e) => onChange("extension", Number(e.target.value))}
            >
              {[0, 25, 50, 75].map((ext) => (
                <option key={ext} value={ext}>
                  {ext}
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

export default PostControls;
