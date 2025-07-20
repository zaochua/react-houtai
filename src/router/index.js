import {createBrowserRouter} from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import Mall from "../pages/mall";
import User from "../pages/user";
import PageOne from "../pages/other/pageOne";
import pageTwo from "../pages/other/pageTwo";

const routes = [
    {
        path: "/",
        Component: Main,
        children: [
            {
                path: "home",
                Component: Home
            },
            {
                path: "mall",
                Component: Mall
            },
            {
                path: "user",
                Component: User
            },
            {
                path: "other",
                children:[
                    {
                        path:"pageOne",
                        Component: PageOne
                    },
                    {
                        path:"pageTwo",
                        Component: pageTwo
                    }
                ]
            }
        ]
    }

];


export default createBrowserRouter(routes);