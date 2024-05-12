import { Injectable } from '@angular/core';
import { ITodos, Todos } from '../../types/todos';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  todos: Todos = {
    mother: {
      todos: [
        {
          time: new Date(),
          todo: "test 1"
        }
      ]
    },
    father: {
      todos: [
        {
          time: new Date(),
          todo: "test 2"
        }
      ]
    },
    sister: {
      todos: []
    },
    brother: {
      todos: [
        {
          time: new Date(),
          todo: "test 3"
        }
      ]
    }
  };

  constructor() {
    this.loadTodos();
  }

  loadTodos() {
    // fetch
  }

  getTodos(){
    return this.todos;
  }

  getTodosOf(member: string){
    return 
  }

  addTodo(){

  }

  removeTodo(todo: string){

  }

  getListOfAllTodos(){
    const todosList: Todos = this.todos;
    const entries = Object.entries(todosList);
    const todoMembers = entries.map(([key, _]) => key);

    let todos: ITodos[] = [];
    todoMembers.forEach(user => {
        todos.push({
            member: user,
            todos: todosList[user].todos
        })
    });

    return todos;
}

}
