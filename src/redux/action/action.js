import "../../mock/mockdata.js"
import axios from "axios"
export const SET_USER = "SET_USER"
export const SET_TAB = "SET_TAB"
export const UPDATE_TABACTIVE = "UPDATE_TABACTIVE"
export const DEL_TAB = "DEL_TAB"
export const TODO_BEGIN = "TODO_BEGIN"
export const TODO_END = "TODO_END"
export const TODO_INIT = "TODO_INIT"
export const TODO_ADD="TODO_ADD"
export const ChangeTodoActive="ChangeTodoActive"
export const CHANGE_FILTER="CHANGE_FILTER"
export const setuser = (username) => {
    return {
        type: SET_USER,
        username: username
    }
}
export const settab = (title, content, url) => {
    return {
        type: SET_TAB,
        title,
        content,
        url
    }
}
export const updateTabActive = (active) => {
    return {
        type: UPDATE_TABACTIVE,
        active
    }
}
export const delTab = (delState) => {
    return {
        type: DEL_TAB,
        delState
    }
}
export const TodoBeginLoading = () => {
    return {
        type:TODO_BEGIN
    }
}
export const TodoEndLoading = () => {
    return {
        type:TODO_END
    }
}
export const TodoInit = (initdata) => {
    return {
        type:TODO_INIT,
        initdata
    }
}
export const TodoAdd=(text,time,active,id)=>{
    return {
        type:TODO_ADD,
        text,
        time,
        active,
        id
    }
}
export const setTodoActive=(id,active)=>{
    return {
        type:ChangeTodoActive,
        id,
        active
    }
}
export const setTodoFilter=(filter)=>{
    return {
        type:CHANGE_FILTER,
        filter
    }
}
export const getTodoData = () => {
    return (dispatch) => {
        dispatch(TodoBeginLoading())
        axios.get('/todolist', { 'datatype': 'json' }).then(
            res => {
                dispatch(TodoInit(res.data.tododata))
                dispatch(TodoEndLoading())
            },rej=>{
                dispatch(TodoEndLoading())
            }
        ).catch(()=>{
            console.log("读取失败")
        })
    }
}