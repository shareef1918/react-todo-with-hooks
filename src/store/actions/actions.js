 export const addTodo = (obj) => {
     return { type: 'ADD_TODO', payload: obj}
 }

 export const addTodoAsync = (val) => {
    return dispatch => {
        dispatch(apiCallStarted());
        setTimeout(()=>{
            dispatch(addTodo(val));
            dispatch(apiCallCompleted());
        }, 3000);
    }
}

export const deleteTodo = (id) => {
    return { type: 'DELETE_TODO', id: id}
}

export const updateTodo = (obj) => {
    return { type: 'UPDATE_TODO', obj: obj}
}

export const editTodo = (id) => {
    return { type: 'EDIT_TODO', id: id}
}

export const apiCallStarted = () => ({
    type: 'API_CALL_STARTED'
});
   
export const apiCallCompleted = () => ({
    type: 'API_CALL_COMPLETED'
});

export const updateTab = (tab) => {
    return { type: 'UPDATE_TAB', tab: tab}
}

export const updateModal = () => ({
    type: 'UPDATE_MODAL'
})

export const formEdited = (formObj) => {
    return {type: 'FORM_EDITED', formObj: formObj}
}

export const searchList = (searchText) => {
    return {type: 'SEARCH_LIST', searchText: searchText}
}

export const updateViewItem = (id) => {
    return {type:'VIEW_ITEM', id: id}
}

export const updateFormEdit = () => ({
    type: 'UPDATE_FORM_EDIT'
})

export const updateItemStatus = (id, state) => {
    return {type: 'UPDATED_ITEM_STATUS', id: id, state:state}
}

export const sortList = (field) => {
    return {type: 'SORT_LIST', field: field}
}

export const groupByEnable = (groupBy) =>{
    return {type: 'GROUP_BY_ENABLE', groupBy: groupBy}
}