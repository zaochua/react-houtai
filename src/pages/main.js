import React from "react";
import {Layout, theme} from "antd";
import CommonAside from "../components/commonAside/index";
import CommonHeader from "../components/commonHeader";
import CommonTag from "../components/commonTag";
import {useSelector} from "react-redux";
import {Outlet} from "react-router-dom";
import {RouterAuth} from "../router/routerAuth"

const {Content} = Layout;

const Main = () => {
    // const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG}
    } = theme.useToken();

    // 获取展开收起的状态
    const collapse = useSelector(state => state.tab.isCollapse);

    return (
        <RouterAuth>
            <Layout className="main-container">
                <CommonAside collapse={collapse}/>

                <Layout>
                    <CommonHeader collapse={collapse}/>
                    <CommonTag/>
                    <Content
                        style={{
                            margin: "24px 16px",
                            padding: 24,
                            minHeight: 280,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        <Outlet/>
                    </Content>
                </Layout>
            </Layout>
        </RouterAuth>
    );
};


export default Main;