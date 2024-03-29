/* generated by 'bin/methodTemplateGenerate.js' */
type Task = Function;
type TaskList = Array<Task>;
interface IProcessTask {
    start(): Promise<any>;
    pause(): Promise<any>;
    restart(): Promise<any>;
    startAt(index: number): Promise<any>;
};
enum Status {
    Pending = 'Pending',
    Fulfilled = 'Fulfilled',
    Rejected = 'Rejected'
}

export class ProcessTask implements IProcessTask {
    private index: number = 0;
    private result: any[] = [];
    private reason: any = '';
    private paused: boolean = false;
    private taskList: TaskList = [];
    private status: Status = Status.Pending;

    constructor(list: TaskList) {
        this.taskList = list;
    }

    private reset(taskIndex = 0) {
        this.index = taskIndex;
        this.paused = true;
        this.result = [];
        this.reason = '';
        this.status = Status.Pending;
    }

    start() {
        return new Promise(async (resolve, reject) => {
            if (this.status === Status.Fulfilled) {
                resolve(this.result);
                return;
            }
            if (this.status === Status.Rejected) {
                reject(this.reason);
                return;
            }

            this.paused = false;

            while(this.index < this.taskList.length) {
                const task: Task = this.taskList[this.index];
                try {
                    const res = await task();
                    this.result.push(res);
                } catch (error) {
                    this.paused = true;
                    this.reason = error;
                    this.status = Status.Rejected;
                    reject(error);
                } finally {
                    this.index++;
                    if (this.paused) return;
                }
            }

            this.paused = true;
            this.status = Status.Fulfilled;
            resolve(this.result);
        })
    }

    restart() {
        return new Promise((resolve, reject) => {
            this.reset();
            this.start().then(resolve, reject);
        });
    }

    startAt(number: number) {
        return new Promise((resolve, reject) => {
            const taskIndex = number - 1;
            if (taskIndex >= 0 && taskIndex < this.taskList.length) {
                this.reset(taskIndex);
                this.start();
                resolve(taskIndex);
            } else {
                reject(new Error('taskIndex is out of range'));
            }
        });
    }

    pause() {
        return new Promise((resolve, reject) => {
            if (this.status === Status.Fulfilled) {
                reject(new Error('process has been fulfiled'));
            } else if (this.status === Status.Rejected) {
                reject(new Error('process has been rejected'))
            } else if (this.paused) {
                resolve(true);
            } else {
                this.paused = true;
                resolve(true);
            }
        });
    }
}