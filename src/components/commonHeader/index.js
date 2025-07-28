import {Avatar, Button, Layout} from "antd";
import React from "react";
import {MenuFoldOutlined} from "@ant-design/icons";
import {Dropdown} from "antd";
import {useDispatch} from "react-redux";
import {collapseMenu} from "../../store/reducers/tab";
import "./index.css";
import {useNavigate} from "react-router-dom";

const {Header} = Layout;

const CommonHeader = ({collapse}) => {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const items = [
        {
            key: "1",
            label: (
                <a target="_blank" rel="noopener noreferrer">个人中心</a>
            )
        },
        {
            key: "2",
            label: (
                <a onClick={() => logout()} target="_blank" rel="noopener noreferrer">退出</a>
            )
        }
    ];

    const dispatch = useDispatch();
    // 侧边栏收缩
    const setCollapsed = () => {
        dispatch(collapseMenu());
    };

    return (
        <Header className={"header-container"}>
            <Button
                icon={<MenuFoldOutlined/>}
                onClick={() => setCollapsed()}
                type="text"
                style={{
                    fontSize: "16px",
                    width: 64,
                    height: 32,
                    background: "#FFF"
                }}
            />

            <Dropdown menu={{items}}>
                <Avatar size={40} src={<img src={require("../../assets/images/user.png")} alt/>}/>
            </Dropdown>
        </Header>

    );
};

export default CommonHeader;