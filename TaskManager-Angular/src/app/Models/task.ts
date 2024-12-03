import { Project } from "./project";

export class TaskPriority {
    taskPriorityID: number | null;
    taskPriorityName: string | null;

    constructor() {
        this.taskPriorityID = null;
        this.taskPriorityName = null;
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
    lastUpdatedOn: number | null;
    currentStatus: number | null;
    currentTaskStatusID: number | null;

    project: Project | null;
    createdByUser: any | null;
    assignedToUser: any | null;
    taskStatusDetails: any | null;
    taskPriority: TaskPriority | null; // Add this property

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
        this.taskStatusDetails = null;
        this.taskPriority = null; // Initialize
    }
}
