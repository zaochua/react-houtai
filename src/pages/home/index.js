import {Row, Col, Card} from "antd";
import "./home.css";
import {useEffect} from "react";
import {getData} from "../../api";

const Home = () => {
    const userImg = require("../../assets/images/user.png");

    useEffect(() => {
        getData().then(res=>{
            console.log(res);
        })
    }, []);

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
        </Col>


        <Col span={16}>

        </Col>
    </Row>);
};


export default Home;