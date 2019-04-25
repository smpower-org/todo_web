import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { reducer as authReducer } from './components/auth/';
import { reducer as registerReducer } from './register/';
import { reducer as loginReducer } from './login/';
import { reducer as checkUsernameReducer } from './components/checkUsername/';
import { reducer as checkEmailReducer } from './components/checkEmail/';
import { reducer as navigationReducer } from './components/navigation/';
import { reducer as taskListReducer } from './content/';
import { reducer as userboxReducer } from './components/userBox/';
import { reducer as addTodoReducer } from './components/addTodo/';
import { reducer as deleteTodoReducer } from './components/deleteTodo/';
import { reducer as toggleTodoCheckedReducer } from './components/toggleTodoChecked/';
import { reducer as toggleTasklistVisibleReducer } from './components/toggleTasklistVisible/';
import { reducer as toggleModalVisibleReducer } from './components/modal/';
import { reducer as taskToolBoxReducer } from './components/taskToolBox/';
import { reducer as createListReducer } from './components/createList/';

const reducer = combineReducers({
  auth: authReducer,
  register: registerReducer,
  login: loginReducer,
  checkUsername: checkUsernameReducer,
  checkEmail: checkEmailReducer,
  navigation: navigationReducer,
  taskList: taskListReducer,
  userbox: userboxReducer,
  addTodo: addTodoReducer,
  deleteTodo: deleteTodoReducer,
  toggleTodoChecked: toggleTodoCheckedReducer,
  toggleTasklistVisible: toggleTasklistVisibleReducer,
  toggleModalVisible: toggleModalVisibleReducer,
  taskToolBox: taskToolBoxReducer,
  createList: createListReducer
});

// export default createStore(reducer, applyMiddleware(thunkMiddleware));
export default createStore(reducer, composeWithDevTools(
  applyMiddleware(thunkMiddleware)
));

