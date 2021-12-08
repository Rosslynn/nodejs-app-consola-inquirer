
import inquirer from 'inquirer';
import 'colors';

const questions = [
    {
        type:'list',
        name:'option',
        message:'¿Qué desea hacer?',
        choices:[
            {
                value:'1',
                name:`${'1.'.green} Crear tarea`
            },
            {
                value:'2',
                name:`${'2.'.green} Listar tareas`
            },
            {
                value:'3',
                name:`${'3.'.green} Listar tareas completadas`
            },
            {
                value:'4',
                name:`${'4.'.green} Listar tareas pendientes`
            },
            {
                value:'5',
                name:`${'5.'.green} Completar tarea(s)`
            },
            {
                value:'6',
                name:`${'6.'.green} Borrar tarea`
            },
            {
                value:'0',
                name:`${'0.'.green} Salir`
            },
        ]
    }
];

const iqrMenu = async () => {
    console.clear();
    console.log('======================'.italic);
    console.log('Seleccione una opción'.italic);
    console.log('======================\n'.italic);

    const { option } = await inquirer.prompt(questions);
    
    return option;
}

const iqrPause = async () => {
    console.log('\n');
    await inquirer.prompt({
        name: 'continue',
        message: `Presione ${'ENTER'.green} para continuar \n`,
        validate: function (input) {
            return (input === '') ? true : `Por favor, borra lo que hayas escrito y presiona ${'ENTER'.green}`
        }
    });
}

export {
    iqrMenu,
    iqrPause
}

