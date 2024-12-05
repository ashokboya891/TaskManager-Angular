import { Project } from "./project";

export class TaskPriority {
    taskPriorityID: number | null;
    taskPriorityName: string | null;

    constructor() {
        this.taskPriorityID = null;
        this.taskPriorityName = null;
    }
}

export class TaskStatusDetail {
    taskStatusDetailID: number | null;
    taskID: number | null;
    taskStatusID: number | null;
    userID: string | null;
    description: string | null;
    statusUpdationDateTime: string | null;
    statusUpdationDateTimeString: string | null;
    user: any | null;
    taskStatus:any|null;

    constructor() {
        this.taskStatusDetailID = null;
        this.taskID = null;
        this.taskStatusID = null;
        this.userID = null;
        this.description = null;
        this.statusUpdationDateTime = null;
        this.statusUpdationDateTimeString = null;
        this.user = null;
    }
}

export class Task {
    taskID: number | null;
    taskName: string | null;
    description: string | null;
    createdOnString: string | null;
    projectID: number | null;
    createdBy: string | null;
    assignedTo: string | null;
    taskPriorityID: number | null;
    lastUpdatedOn: string | null;
    currentStatus: string | null;
    currentTaskStatusID: number | null;

    project: Project | null;
    createdByUser: any | null;
    assignedToUser: any | null;
    taskStatusDetails: TaskStatusDetail[] | null;
    taskPriority: TaskPriority | null;

    constructor() {
        this.taskID = null;
        this.taskName = null;
        this.description = null;
        this.createdOnString = null;
        this.projectID = null;
        this.createdBy = null;
        this.assignedTo = null;
        this.taskPriorityID = null;
        this.lastUpdatedOn = null;
        this.currentStatus = null;
        this.currentTaskStatusID = null;

        this.project = null;
        this.createdByUser = null;
        this.assignedToUser = null;
        this.taskStatusDetails = [];
        this.taskPriority = null;
    }
}
