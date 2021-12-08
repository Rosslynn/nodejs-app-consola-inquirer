import inquirer from 'inquirer';
import 'colors';


import { taskService } from '../index.mjs';

const iqrResponse = async (value) => {
    console.log('\n');
    try {
        const options = {
            1: async () => {
                const { description } = await inquirer.prompt({
                    name: 'description',
                    message: `Escribe la descripción: \n`,
                    validate: function (input) {
                        return (!input) ? `Por favor, ingresa una descripción y presiona ${'ENTER'.green}` : true
                    }
                });
                taskService.newTask(description);
            },
            2: async () => {
                const tasks = Object.values(taskService.tasksList);
                
                for (let i in tasks) {
                    const index = i*1 + 1;
                    console.log(`${index.toString().green} ${tasks[i].desc} :: ${ (!tasks[i].completedAt) ? 'Pendiente'.red : 'Completada'.green  }`);
                }
            },
            3: async () => {
                const completedTasks = Object.values(taskService.tasksList).filter(task => task.completedAt !== null );

                for (let i in completedTasks) {
                    const index = i*1 + 1;
                    console.log(`${index.toString().green} ${completedTasks[i].desc} :: ${ (!completedTasks[i].completedAt) ? 'Pendiente'.red : 'Completada'.green  }`);
                }
            },
            4: async () => {
                const uncompletedTasks = Object.values(taskService.tasksList).filter(task => task.completedAt === null );

                for (let i in uncompletedTasks) {
                    const index = i*1 + 1;
                    console.log(`${index.toString().green} ${uncompletedTasks[i].desc} :: ${ (!uncompletedTasks[i].completedAt) ? 'Pendiente'.red : 'Completada'.green  }`);
                }
            },
            5: async () => {
                const choices = Object.values(taskService.tasksList).map(task => ({ value: task.id, name: task.desc, checked: (!task.completedAt) ? false : true}));
                const { selections } = await inquirer.prompt({
                    type: 'checkbox',
                    name: 'selections',
                    message: 'Selecciona una o varias',
                    choices
                });

                taskService.updateTaskStatus(selections);
            },
            6: async () => {
                const choices = Object.values(taskService.tasksList).map(task => ({ value: task.id, name: task.desc }));
                const { option } = await inquirer.prompt({
                    type: 'list',
                    name: 'option',
                    message: '¿Cuál quieres borrar?',
                    choices
                });
                const confirm = await inquirer.prompt({
                    type:'confirm',
                    name:'delete',
                    message:'¿Estás seguro que quieres borrar la tarea?'

                });
                
                (confirm.delete === true) ? taskService.deleteTask(option) : null;
            },
            default: () => {
                throw Error('Parece que la opción del menú que has seleccionado no está funcionando correctamente');
            }
        }

        return (options[value] || options['default'])();

    } catch (error) {
        throw error
    }
}

export default iqrResponse