import { Injectable, inject } from '@angular/core';
import { ITodos, Todos, Todo } from '../../types/todos';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  httpClient = inject(HttpClient);

  todos: Todos = {
    mother: [
        {
          time: new Date(),
          todo: "test 1",
          isDone: false,
        },
        {
          time: new Date(),
          todo: "test 2",
          isDone: false,
        }
      ],
    father: [
        {
          time: new Date(),
          todo: "test 2",
          isDone: false,
        }
      ],
    sister: [],
    brother: [
        {
          time: new Date(),
          todo: "test 3",
          isDone: false,
        }
      ]
  };

  members = Object.keys(this.todos as object);

  private url = 'https://localhost:8080';

  constructor() {
    this.loadTodos();
  }

  loadTodos() {
    // const url = `${this.url}/todos`;
    // return this.httpClient.get<Todos[]>(url);
    return of(this.todos)
  }

  getTodos(){
    return this.todos;
  }

  getMembers(){
    return this.members;
  }

  getTodosOf(member: string){
    return of(this.todos[member]);
  }

  addTodo(){

  }

  addTodoTo(member: string, td: Todo){
    this.todos[member].push(td);
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
            todos: todosList[user]
        })
    });

    return todos;
}

}
