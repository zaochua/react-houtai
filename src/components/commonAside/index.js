import {Layout, Menu} from "antd";
import * as Icon from "@ant-design/icons";
import React, {useState} from "react";
import MenuConfig from "../../config";
import {useLocation, useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {selectMenuList} from "../../store/reducers/tab";

const {Sider} = Layout;

// 动态获取icon
const iconToElement = (name) => {
    return React.createElement(Icon[name]);
};
// 处理菜单数据
const items = MenuConfig.map((icon) => {
    const child = {
        key: icon.path,
        icon: iconToElement([icon.icon]),
        label: icon.label
    };

    if (icon.children) {
        child.children = icon.children.map(item => {
            return {
                key: item.path,
                label: item.label
            };
        });
    }

    return child;
});


const CommonAside = ({collapse}) => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const setTabsList = (val) => {
        dispatch(selectMenuList(val));
    };

    // 点击左侧菜单触发
    const selectMenu = (e) => {
        let data;
        MenuConfig.forEach(item => {
            if (item.path === e.keyPath[e.keyPath.length - 1]) {
                data = item;
                // 如果有二级菜单
                if (e.keyPath.length > 1) {
                    data = item.children.find(child => {
                        return child.path === e.key;
                    });
                }
            }
        });
        setTabsList({
            path: data.path,
            name: data.name,
            label: data.label
        });
        navigate(e.key);
    };

    return (
        <>
            <Sider trigger={null} collapsible collapsed={collapse}>
                <h3 className={"app-name"}>{collapse ? "后台" : "后台管理系统"}</h3>
                <Menu
                    style={{
                        height: "100%"
                    }}
                    theme="dark"
                    mode="inline"
                    selectedKeys={location.pathname}
                    items={items}
                    onClick={selectMenu}
                />
            </Sider>
        </>
    );
};

export default CommonAside;