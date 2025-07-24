import "./user.css";
import {Button, Form, Input, Modal, Popconfirm, Table} from "antd";
import {useEffect, useState} from "react";
import {getUser} from "../../api/index";


const User = () => {
    const [listData, setListData] = useState({name: ""});
    const [tableData, setTableData] = useState([]);
    // 新增
    const handleClick = () => {

    };
    // 提交
    const handleFinish = (e) => {
        setListData({name: e.name});
        console.log(e);
    };

    //删除
    const handleDelete = (rowData) => {

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
                        <Button style={{marginRight: "5px"}} onClick={() => handleClick("edit")}>编辑</Button>
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

            <Table rowKey={"id"} columns={columns} dataSource={tableData}/>

            <Modal title="">

            </Modal>
        </div>
    );
};


export default User;