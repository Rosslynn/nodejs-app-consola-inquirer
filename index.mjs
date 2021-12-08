import colors from 'colors';

import { iqrPause, iqrMenu } from './helpers/inquirer.mjs';
import iqrResponse from './helpers/responses.mjs';
import TaskService from './models/tasks.mjs';

export const taskService = new TaskService();

(async () => {
    let option = '';

    do {
        console.clear();
        option = await iqrMenu();

        if (option !== '0') await iqrResponse(option);

        if (option !== '0') await iqrPause();

    } while (option != '0');
})()