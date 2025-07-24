import "./user.css";
import {Button, DatePicker, Form, Input, InputNumber, Modal, Popconfirm, Select, Table} from "antd";
import {useEffect, useState} from "react";
import {addUser, delUser, editUser, getUser} from "../../api/index";
import dayjs from "dayjs";


const User = () => {
    const [listData, setListData] = useState({name: ""});
    const [tableData, setTableData] = useState([]);
    const [modalType, setModalType] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    // 新增
    const handleClick = (type, rowData) => {
        console.log(rowData, "rowData");

        if (type === "add") {
            setModalType(0);
        } else {
            setModalType(1);
            const cloneData = JSON.parse(JSON.stringify(rowData));
            cloneData.birth = dayjs(cloneData.birth);
            form.setFieldsValue(cloneData);
        }
        setIsModalOpen(!isModalOpen);
    };
    // 提交
    const handleFinish = (e) => {
        setListData({name: e.keyword});
    };
    useEffect(() => {
        getTableData();
    }, [listData]);

    //删除
    const handleDelete = ({id}) => {
        console.log(id);

        delUser({id}).then(res => {
            getTableData();
        });
    };

    const getTableData = () => {
        getUser(listData).then(({data}) => {
            setTableData(data.list);
        });
    };

    const columns = [
        {title: "姓名", dataIndex: "name"},
        {title: "年龄", dataIndex: "age"},
        {
            title: "性别", dataIndex: "sex",
            render: (val) => val ? "女" : "男"
        },
        {title: "出生日期", dataIndex: "birth"},
        {title: "地址", dataIndex: "addr"},
        {
            title: "操作", render: (rowData) => {
                return (
                    <div className="flex-box">
                        <Button style={{marginRight: "5px"}} onClick={() => handleClick("edit", rowData)}>编辑</Button>
                        <Popconfirm title={"提示"}
                                    description={"此操作将删除该数据"}
                                    okText={"确认"}
                                    cancelText={"取消"}
                                    onConfirm={() => handleDelete(rowData)}>

                            <Button type={"primary"} danger>删除</Button>
                        </Popconfirm>
                    </div>
                );
            }
        }
    ];

    useEffect(() => {
        getTableData();
    }, []);

    const handleOk = () => {
        form.validateFields().then(value => {
            // 处理日期
            value.birth = dayjs(value.birth).format("YYYY-MM-DD");
            if (modalType) {
                editUser(value).then(() => {
                    handleCancel();
                    getTableData();
                });
            } else {
                addUser(value).then(() => {
                    handleCancel();
                    getTableData();
                });
            }
        }).catch(e => {
            console.log(e);
        });
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className={"user"}>
            <div className={"flex-box space-between"}>
                <Button type="primary" onClick={() => handleClick("add")}>+新增</Button>
                <Form layout={"inline"}
                      onFinish={handleFinish}>
                    <Form.Item name="keyword">
                        <Input placeholder={"请输入用户名"}/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType={"submit"} type="primary">搜索</Button>
                    </Form.Item>
                </Form>
            </div>

            <Table style={{marginTop: "10px"}} rowKey={"id"} columns={columns} dataSource={tableData}/>

            <Modal title={modalType ? "编辑用户" : "新增用户"}
                   open={isModalOpen}
                   onOk={handleOk}
                   onCancel={handleCancel}
                   okText="确定"
                   cancelText="取消">
                <Form
                    labelCol={{span: 6}}
                    wrapperCol={{span: 18}}
                    labelAlign={"left"}
                    form={form}
                >
                    {
                        modalType === 1 &&
                        <Form.Item label="Id" name="id" hidden>
                            <Input placeholder="请输入姓名"/>
                        </Form.Item>
                    }
                    <Form.Item label="姓名" name="name"
                               rules={[{required: true, message: "请输入姓名"}]}>
                        <Input placeholder="请输入姓名"/>
                    </Form.Item>
                    <Form.Item label="年龄" name="age"
                               rules={[
                                   {required: true, message: "请输入年龄"},
                                   {type: "number", message: "年龄必须是数字"}
                               ]}>
                        <InputNumber placeholder="请输入年龄"/>
                    </Form.Item>
                    <Form.Item label="性别" name="sex"
                               rules={[{required: true, message: "性别必选"}]}>
                        <Select placeholder="请选择性别" options={[
                            {value: 0, label: "男"},
                            {value: 1, label: "女"}
                        ]}/>
                    </Form.Item>
                    <Form.Item label="出生日期" name="birth"
                               rules={[
                                   {required: true, message: "请选择出生日期"}
                               ]}>
                        <DatePicker placeholder="请选择" format="YYYY-MM-DD"/>
                    </Form.Item>
                    <Form.Item label="地址" name="addr"
                               rules={[{required: true, message: "请输入地址"}]}>
                        <Input placeholder="请输入地址"/>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default User;