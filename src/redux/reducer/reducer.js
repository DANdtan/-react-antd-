import { SET_USER } from "../action/action"
import {
    SET_TAB, UPDATE_TABACTIVE, DEL_TAB, TODO_BEGIN, TODO_END,
    TODO_INIT, TODO_ADD, ChangeTodoActive, CHANGE_FILTER
} from "../action/action"
const inituser = { username: "" }
export const usermgs = (state = inituser, action = {}) => {
    switch (action.type) {
        case SET_USER:
            let userstate = Object.assign({}, state)
            userstate["username"] = action.username
            return userstate
        default:
            return state
    }
}
const inittablist = { list: [], active: '' }
export const TabList = (state = inittablist, action = {}) => {
    switch (action.type) {
        case SET_TAB:
            let copystate = Object.assign({}, state)
            let copyaction = Object.assign({}, action)
            let result = copystate.list.find(function (item) {
                return item.url === copyaction.url
            })
            delete copyaction.type;
            let tablist = result === undefined ? [...copystate.list, copyaction] : copystate.list;
            return { 'list': tablist, 'active': copyaction.url }
        case UPDATE_TABACTIVE:
            let tabstate = { ...state }
            tabstate["active"] = action['active']
            return tabstate
        case DEL_TAB:
            const delstate = { ...action.delState }

            return delstate
        default:
            return state
    }

}
const inittodo = { listdata: [], loading: false, filter: "all" }
export const TodoListState = (state = inittodo, action = {}) => {
    switch (action.type) {
        case TODO_BEGIN:
            let begin = Object.assign({}, state)
            begin.loading = true;
            return begin
        case TODO_END:
            let end = Object.assign({}, state)
            end.loading = false;
            return end
        case TODO_INIT:
            let inittodo = Object.assign({}, state);
            inittodo.listdata = action.initdata
            return inittodo
        case TODO_ADD:
            let addtodo = Object.assign({}, state);
            delete action.type;
            addtodo.listdata.push(action);
            return addtodo
        case ChangeTodoActive:
            let changetodo = Object.assign({}, state);
            changetodo.listdata.map((item, index) => {
                if (Number(item.id) === Number(action.id)) {
                    item.active = action.active;
                    return item
                }
            })
            return changetodo
        case CHANGE_FILTER:
            let fliterstate = Object.assign({}, state);
            fliterstate.filter = action.filter;
            return fliterstate
        default:
            return state

    }
}