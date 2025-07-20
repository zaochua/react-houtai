import logo from "./logo.svg";
import "./App.css";
import router from "./router";
import {RouterProvider} from "react-router-dom";

function App() {
    return (
        <div className="app">
            <RouterProvider router={router}/>
        </div>
    );
}

export default App;
