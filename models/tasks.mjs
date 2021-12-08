
import Task from './task.mjs';
import { writeFile, readFile } from 'fs/promises';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default class Tasks {

    static #singleTone;
    #_list = {};

    get tasksList () {
        return {...this.#_list}
    }

    constructor() {
        this.readDataFromDB();
        
        if (!!Tasks.#singleTone) {
            return Tasks.#singleTone
        } else {
            return Tasks.#singleTone = this;
        }
    }

    newTask(description) {
        const task = new Task(description);
        this.#_list[task.id] = task;
        this.saveDataToBD();
    }

    async saveDataToBD() {
        try {
            await writeFile('db.json', JSON.stringify(this.tasksList));
        } catch (error) {
            throw error
        }
    }

    async readDataFromDB() {
        try {
            const data = await readFile(path.join(__dirname, `../db.json`), 'utf-8');
            
            if (data) {
                this.#_list = JSON.parse(data);
            }
        } catch (error) {
            throw error
        }
    }
    
    deleteTask(id) {
        delete this.#_list[id];
        this.saveDataToBD();
        console.log('\nTarea borrada.');
    }

    updateTaskStatus(completedTasksArr) {
        for (let i in this.#_list) {
            this.#_list[i].completedAt = null;
        }

        for (let task of completedTasksArr) {
            this.#_list[task].completedAt = new Date().toISOString();
        }

        this.saveDataToBD();
    }
}