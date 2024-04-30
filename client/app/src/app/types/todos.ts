type FamilyMembers = "Mom" | "Dad" | "Sister" | "Brother"

export type ITodo = {
    time: Date;
    todo: string;
}

export type ITodos = {
    member: FamilyMembers;
    todos: ITodo[];
}