import React, {useEffect, useState} from "react";
import {
    Form, Input, Button, Card,
    Alert, Divider, Typography, Space,
    message, Row, Col
} from "antd";
import {
    UserOutlined, LockOutlined, EyeOutlined,
    EyeInvisibleOutlined,
    LoginOutlined
} from "@ant-design/icons";
import {Navigate, useNavigate} from "react-router-dom";
import "./login.css";
import {getMenu} from "../../api";


const {Title, Text} = Typography;

const Login = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loginError, setLoginError] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        form.setFieldValue("username","admin")
        form.setFieldValue("password","admin")
    }, []);

    if (localStorage.getItem("token")) {
        return <Navigate to={"/"} replace/>;
    }




    // 表单提交处理
    const handleLogin = async (values) => {
        try {
            setLoading(true);
            setLoginError("");
            // 模拟登录API调用
            console.log("登录信息:", values);
            const {data} = await getMenu(values);
            console.log("登录成功信息:", data);

            if (data.code === 20000) {
                localStorage.setItem("token", data.data.token);
                // 登录成功后的处理
                message.success("登录成功！");
                // 跳转到首页或之前访问的页面
                navigate("/", {replace: true});
            } else {
                message.error(data.data.message);
            }
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="login-container">
            <Row justify="center" align="middle" className="login-row">
                <Col xs={22} sm={16} md={12} lg={8} xl={6}>
                    <Card className="login-card" shadow="lg">
                        <div className="login-header">
                            <Title level={2} className="login-title">欢迎登录</Title>
                        </div>

                        {loginError && (
                            <Alert
                                message="登录失败"
                                description={loginError}
                                type="error"
                                showIcon
                                style={{marginBottom: 16}}
                                closable
                                onClose={() => setLoginError("")}
                            />
                        )}

                        <Form
                            form={form}
                            name="login_form"
                            layout="vertical"
                            onFinish={handleLogin}
                            initialValues={{remember: false}}
                        >
                            <Form.Item
                                name="username"
                                label="用户名"
                                rules={[
                                    {required: true, message: "请输入用户名"},
                                    {min: 4, message: "用户名长度不能少于4个字符"}
                                ]}
                            >
                                <Input
                                    prefix={<UserOutlined className="input-icon"/>}
                                    placeholder="请输入用户名"
                                    autoComplete="username"
                                />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="密码"
                                rules={[
                                    {required: true, message: "请输入密码"},
                                    {min: 3, message: "密码长度不能少于3个字符"}
                                ]}
                            >
                                <Input.Password
                                    prefix={<LockOutlined className="input-icon"/>}
                                    placeholder="请输入密码"
                                    visibilityToggle={{
                                        visible: showPassword,
                                        onVisibleChange: setShowPassword
                                    }}
                                    iconRender={visible => (visible ? <EyeOutlined/> : <EyeInvisibleOutlined/>)}
                                    autoComplete="current-password"
                                />
                            </Form.Item>


                            {/*<Form.Item name="remember" valuePropName="checked">*/}
                            {/*    <Checkbox>记住我</Checkbox>*/}
                            {/*</Form.Item>*/}

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    className="login-button"
                                    loading={loading}
                                    block
                                    icon={<LoginOutlined/>}
                                >
                                    登录
                                </Button>
                            </Form.Item>
                        </Form>

                        <div className="login-other-options">
                            <Space className="login-links">
                                <a href="/forgot-password">忘记密码?</a>
                                <Divider type="vertical"/>
                                <a href="/register">注册账号</a>
                            </Space>
                        </div>
                    </Card>

                    <div className="login-footer">
                        <Text type="secondary">© 2025 阿龙React后台管理 版权所有</Text>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Login;
