import {Row, Col, Card, Table} from "antd";
import "./home.css";
import {useEffect, useState} from "react";
import {getData} from "../../api";

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
const Home = () => {
    const userImg = require("../../assets/images/user.png");

    useEffect(() => {
        getData().then(({data}) => {
            const {tableData} = data.data;
            setTableData(tableData);
        });
    }, []);

    const [tableData, setTableData] = useState([]);
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
                <Table columns={columns} dataSource={tableData} pagination={false}/>
            </Card>
        </Col>


        <Col span={16}>

        </Col>
    </Row>);
};


export default Home;