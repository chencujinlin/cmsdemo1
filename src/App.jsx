import React from "react";
import "./assets/base.less"
import { Button } from "antd";
import { Outlet } from "react-router-dom";
const App = () => {
    return (
        <div>
            <Button type="primary"> primary</Button>
            <Outlet />
        </div>
    )
}
export default App;