import {Space, Tag} from "antd";
import "./index.css";
import {useDispatch, useSelector} from "react-redux";
import {closeTab, setCurrentMenu} from "../../store/reducers/tab";
import {useLocation, useNavigate} from "react-router-dom";

const CommonTag = () => {
    const tabList = useSelector(state => state.tab.tabList);
    const currentMenu = useSelector(state => state.tab.currentMenu);
    const action = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleClose = (tag, index) => {
        // 当前路由信息
        let length = tabList.length - 1;
        dispatch(closeTab(tag));
        if (tag.path !== action.pathname) {
            return;
        }

        // 如果激活的tab是最后一位，并且关闭它
        if (index === length) {
            const curData = tabList[index - 1];
            dispatch(setCurrentMenu(curData));
            navigate(curData.path);
        } else {
            if (tabList.length > 1) {
                const nextData = tabList[index + 1];
                dispatch(setCurrentMenu(nextData));
                navigate(nextData.path);
            }
        }
    };

    const handleChang = (tag) => {
        dispatch(setCurrentMenu(tag));
        navigate(tag.path);
    };

    // tag显示逻辑
    const setTag = (flag, item, index) => {
        return (
            flag ? <Tag color="#7BC1FC" key={item.label} closeIcon
                        onClose={() => handleClose(item, index)}>{item.label}</Tag> :
                <Tag key={item.label} onClick={() => handleChang(item)}>{item.label}</Tag>
        );
    };
    return (
        <Space size={[0, 8]} wrap className="common-tag ">
            {
                currentMenu.name && tabList.map((item, index) => setTag(item.path === currentMenu.path, item, index))
            }
        </Space>
    );
};

export default CommonTag;