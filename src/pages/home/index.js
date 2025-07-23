import {Card, Col, Row, Table} from "antd";
import "./home.css";
import React, {useEffect, useState} from "react";
import {getData} from "../../api";
import * as Icon from "@ant-design/icons";
import MyEcharts from "../../components/Echarts/index";


const columns = [
    {
        title: "课程",
        dataIndex: "name"
    },
    {
        title: "今日购买",
        dataIndex: "todayBuy"
    },
    {
        title: "本月购买",
        dataIndex: "monthBuy"
    },
    {
        title: "总购买",
        dataIndex: "totalBuy"
    }
];

// 订单统计数据
const countData = [
    {
        "name": "今日支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "今日收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "今日未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    },
    {
        "name": "本月支付订单",
        "value": 1234,
        "icon": "CheckCircleOutlined",
        "color": "#2ec7c9"
    },
    {
        "name": "本月收藏订单",
        "value": 3421,
        "icon": "ClockCircleOutlined",
        "color": "#ffb980"
    },
    {
        "name": "本月未支付订单",
        "value": 1234,
        "icon": "CloseCircleOutlined",
        "color": "#5ab1ef"
    }
];
// 动态获取图标
const iconToElement = (name) => React.createElement(Icon[name]);
const Home = () => {
    const userImg = require("../../assets/images/user.png");

    useEffect(() => {
        getData().then(({data}) => {
            const {tableData, orderData, userData, videoData} = data.data;

            setTableData(tableData);
            const xdata = orderData.date;
            const keyArray = Object.keys(orderData.data[0]);

            const series = [];

            keyArray.forEach(key => {

                series.push({
                    name: key,
                    data: orderData.data.map(item => item[key]),
                    type: "line"
                });
            });

            setEchartData({
                order: {xdata, series},
                user: {
                    xdata: userData.map(item => item.date),
                    series: [
                        {name: "新增用户", data: userData.map(item => item.new), type: "bar"},
                        {name: "活跃用户", data: userData.map(item => item.active), type: "bar"}
                    ]
                },
                video: {
                    series: [
                        {data: videoData, type: "pie"}
                    ]
                }
            });
        });
    }, []);

    const [tableData, setTableData] = useState([]);
    const [echartData, setEchartData] = useState([]);

    return (<Row className={"home"}>
        <Col span={8}>
            <Card hoverable>
                <div className={"user"}>
                    <img src={userImg} alt=""/>
                    <div className={"userinfo"}>
                        <p className={"name"}>Admin</p>
                        <p align={"access"}>超级管理员</p>
                    </div>
                </div>

                <div className={"login-info"}>
                    <p>上次登录时间：<span>2025-7-22</span></p>
                    <p>上次登录地点：<span>上海</span></p>
                </div>
            </Card>
            <Card>
                <Table columns={columns} dataSource={tableData} pagination={false} rowKey={"name"}/>
            </Card>
        </Col>

        <Col span={16}>
            <div className={"num-box"}>
                {
                    countData.map((item, index) => {
                        return (
                            <Card key={index}>
                                <div className={"icon-box"} style={{background: item.color}}>
                                    {iconToElement(item.icon)}
                                </div>
                                <div className={"detail"}>
                                    <p className={"num"}>￥{item.value}</p>
                                    <p className={"text"}>{item.name}</p>
                                </div>
                            </Card>
                        );
                    })
                }
            </div>
            {echartData.order && <MyEcharts chartData={echartData.order} style={{height: "280px"}}/>}
            <div className={"graph"}>
                {echartData.user && <MyEcharts chartData={echartData.user} style={{height: "240px"}}/>}
                {echartData.video && <MyEcharts chartData={echartData.video} isAxisChart={false} style={{height: "240px"}}/>}
            </div>
        </Col>
    </Row>);
};


export default Home;