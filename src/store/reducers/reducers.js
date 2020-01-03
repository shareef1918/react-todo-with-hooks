import _ from "lodash";

const initialState = {
  currentSelection: 0,
  loading: false,
  todos: [],
  todosCopy: [],
  error: null,
  tabs: [
    {
      key: 0,
      title: "All Tasks"
    },
    {
      key: 1,
      title: "Completed Tasks"
    },
    {
      key: 2,
      title: "Pending Tasks"
    }
  ],
  isFormEdited: false,
  isViewItem: false,
  editedFormData: {},
  showModal: false,
  sortField: "title",
  sortType: true,
  groupByList: [],
  isGroupByEnabled: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return {
        ...state,
        loading: false,
        error: null,
        todos: [...state.todos, action.payload],
        todosCopy: [...state.todos, action.payload]
      };
    case "API_CALL_STARTED":
      return {
        ...state,
        loading: true
      };
    case "API_CALL_COMPLETED":
      return {
        ...state,
        loading: false
      };
    case "DELETE_TODO":
      return {
        ...state,
        loading: false,
        error: null,
        todos: state.todos.filter(el => el.id !== action.id),
        todosCopy: state.todos.filter(el => el.id !== action.id)
      };
    case "EDIT_TODO":
      return {
        ...state,
        loading: false,
        error: null,
        todos: state.todos.filter(el => el.id === action.id),
        todosCopy: state.todos.filter(el => el.id === action.id)
      };
    case "UPDATE_TAB":
      return {
        ...state,
        currentSelection: action.tab
      };
    case "UPDATE_MODAL":
      return {
        ...state,
        showModal: !state.showModal
      };
    case "FORM_EDITED":
      return {
        ...state,
        isFormEdited: true,
        editedFormData: action.formObj
      };
    case "UPDATE_FORM_EDIT":
      return {
        ...state,
        isFormEdited: false
      };
    case "UPDATE_TODO":
      let list = state.todos.map(item => {
        if (item.id === action.obj.id) {
          return action.obj;
        }
        return item;
      });
      return {
        ...state,
        isFormEdited: false,
        editedFormData: {},
        todos: list,
        todosCopy: list
      };
    case "SEARCH_LIST":
      const combine = [
        ...state.todosCopy.filter(o =>
          o.title.toLowerCase().includes(action.searchText.toLowerCase())
        ),
        ...state.todosCopy.filter(o =>
          o.priority.toLowerCase().includes(action.searchText.toLowerCase())
        ),
        ...state.todosCopy.filter(o =>
          o.createdAt.toLowerCase().includes(action.searchText.toLowerCase())
        ),
        ...state.todosCopy.filter(o =>
          o.dueDate.toLowerCase().includes(action.searchText.toLowerCase())
        )
      ];
      const result = Array.from(new Set(combine.map(JSON.stringify))).map(
        JSON.parse
      );
      return {
        ...state,
        todos: result,
        isGroupByEnabled: false
      };
    case "VIEW_ITEM":
      return {
        ...state,
        isViewItem: !state.isViewItem,
        editedFormData: !state.isViewItem
          ? state.todos.filter(item => item.id === action.id)[0]
          : {}
      };
    case "UPDATED_ITEM_STATUS":
      let listData = state.todos.map(item => {
        if (item.id === action.id) {
          return {
            ...item,
            currentState: action.state > 1 ? 1 : 2
          };
        }
        return item;
      });
      return {
        ...state,
        todos: listData,
        todosCopy: listData
      };
    case "SORT_LIST":
      const sorted = state.todos.slice().sort(function(a, b) {
        var nameA = a[action.field].toLowerCase(),
          nameB = b[action.field].toLowerCase();
        if (state.sortType) {
          if (nameA < nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        } else {
          if (nameA > nameB) return -1;
          if (nameA > nameB) return 1;
          return 0;
        }
      });
      return {
        ...state,
        todos: sorted,
        sortField: action.field,
        sortType: !state.sortType
      };
    case "GROUP_BY_ENABLE":
      let groupData = _.chain(state.todosCopy)
        .groupBy(action.groupBy)
        .map((value, key) => ({ title: key, rows: value }))
        .value();
      return {
        ...state,
        todos: action.groupBy ? groupData : state.todosCopy,
        isGroupByEnabled: action.groupBy ? true : false
      };
    default:
      return state;
  }
};

export default reducer;
