type FamilyMembers = "Mom" | "Dad" | "Sister" | "Brother"

export type ITodo = {
    time: Date;
    todo: string;
}

export type ITodos = {
    
    member: string;
    todos: ITodo[];
}

// Option two
export interface Todo {
    time: Date;
    todo: string;
  }
  
export  interface Todos {
    [key: string]: {
      todos: Todo[];
    };
  }