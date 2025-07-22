import React from "react";
import {Layout, theme} from "antd";
import CommonAside from "../components/commonAside/index";
import CommonHeader from "../components/commonHeader";
import {useSelector} from "react-redux";

const {Content} = Layout;

const Main = () => {
    // const [collapsed, setCollapsed] = useState(false);
    const {
        token: {colorBgContainer, borderRadiusLG}
    } = theme.useToken();

    // 获取展开收起的状态
const collapse= useSelector(state => state.tab.isCollapse)

    return (
        <Layout className="main-container">
            <CommonAside collapse={collapse}/>

            <Layout>
                <CommonHeader collapse={collapse}/>
                <Content
                    style={{
                        margin: "24px 16px",
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG
                    }}
                >
                    Content
                </Content>
            </Layout>
        </Layout>
    );
};


export default Main;