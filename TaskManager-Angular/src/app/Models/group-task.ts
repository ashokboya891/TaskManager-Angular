import { Task } from './task';

export class GroupedTask
{
    taskStatusName: number|null;
    tasks: Task[]|null;

    constructor()
    {
        this.taskStatusName = null;
        this.tasks = null;
    }
}
