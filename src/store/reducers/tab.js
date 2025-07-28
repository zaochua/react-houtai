import {createSlice} from "@reduxjs/toolkit";


const tabSlice = createSlice({
    name: "tab",
    initialState: {
        isCollapse: false,
        tabList: [
            {
                path: "/",
                name: "home",
                label: "首页"
            }
        ],
        currentMenu: {}
    },
    reducers: {
        collapseMenu: state => {
            state.isCollapse = !state.isCollapse;
        },
        // ES解构语法别名
        selectMenuList: (state, {payload: val}) => {
            if (val.name !== "home") {
                state.currentMenu = val;
                const result = state.tabList.findIndex(item => item.name === val.name);
                // 如果不存在就添加
                if (result === -1) {
                    state.tabList.push(val);
                }
            } else if (val.name === "home" && state.tabList.length === 1) {
                state.currentMenu = {};
            }
        },
        closeTab: (state, {payload: val}) => {
            const res = state.tabList.findIndex(item => item.name === val.name);
            state.tabList.splice(res, 1);
        },
        setCurrentMenu:(state, {payload: val}) => {
            if(val.name==='home'){
                state.currentMenu={}
            }else{
                state.currentMenu=val
            }
        }
    }
});


export const {collapseMenu, selectMenuList,setCurrentMenu, closeTab} = tabSlice.actions;
export default tabSlice.reducer;