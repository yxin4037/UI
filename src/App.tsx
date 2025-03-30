import React from "react";
import FencePanelDesigner from "./FencePanelDesigner";
import "./FencePanelDesigner.css"; // 记得在这里引入样式
import FenceDesign from "./FenceDesign";
function App() {
  return (
    <div className="App">
        <FenceDesign />
      {/*<FencePanelDesigner />*/}
    </div>
  );
}

export default App;
