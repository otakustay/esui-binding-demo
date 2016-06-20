import u from 'underscore';
import ui from 'esui';
import Control from 'esui/Control';
import {defaults, set} from 'diffy-update';
import {Engine} from 'etpl';
import TEMPLATE from 'text!./app.tpl.html';
import TodoList from '../todoList/TodoList';
import Button from 'esui/Button';
import Panel from 'esui/Panel';
import 'css!./app.css';

let engine = new Engine();
engine.parse(TEMPLATE);

export default class App extends Control {
    get type() {
        return 'App';
    }

    get defaultProperties() {
        return {
            username: 'Anonymous',
            todos: []
        };
    }

    constructor(options) {
        super(options);

        // 顶层组件特有
        this.owner = this;

        this.helper.setTemplateEngine(engine);
    }

    initOptions(options) {
        let properties = defaults(options, null, this.defaultProperties);
        this.setProperties(properties);
    }

    repaint() {
        this.disposeChildren();
        this.main.innerHTML = this.helper.renderTemplate('main', this);
        this.helper.initConnectedChildren();
    }

    initApp() {
        let username = 'Gray Zhang';
        let todos = [
            {
                id: 1,
                title: '吃饭',
                content: '**一定**要吃饱',
                dueDate: new Date(),
                completed: false
            },
            {
                id: 2,
                title: '睡觉',
                content: '睡得香',
                dueDate: new Date(),
                completed: false
            },
            {
                id: 3,
                title: '打豆豆',
                content: '豆豆是谁？',
                dueDate: new Date(),
                completed: false
            }
        ];
        this.setProperties({username, todos});
    }

    removeCard(todo) {
        let newTodos = u.without(this.todos, todo);
        this.set('todos', newTodos);
    }

    markComplete(todo) {
        let index = this.todos.indexOf(todo);
        let newTodos = set(this.todos, [index, 'completed'], true);
        this.set('todos', newTodos);
    }

    createTodo() {
        console.log('create');
    }

    updateTodo(todo) {
        let index = this.todos.findIndex(item => item.id === todo.id);
        let newTodos = set(this.todos, [index], todo);
        this.set('todos', newTodos);
    }
}

ui.register(App);