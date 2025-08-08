

export interface User{
    id: string;
    email: string;
    name: string;
    role: 'Admin' | 'User';
}


export interface createUser{
    name: string;
    email: string;
    role: 'Admin' | 'User'
}

export interface createTodo{
    title: string;
    description: string;
    status: 'Todo' | 'In Progress' | 'On Hold' | 'Done' | 'Will Not Do' ;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    expected_completion_at: Date;
}