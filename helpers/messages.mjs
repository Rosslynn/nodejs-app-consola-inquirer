import colors from 'colors';
import readline from 'readline';


// READLINE ya viene con node, pero brina más comoidad inquirer
const showMenu = () => {
    return new Promise((resolve, rejected) => {
        console.clear();
        // Texto
        console.log('======================'.italic);
        console.log('Seleccione una opción'.italic);
        console.log('======================\n'.italic);

        // Opciones
        console.log(`${'1.'.green} Crear tarea`);
        console.log(`${'2.'.green} Listar tareas`);
        console.log(`${'3.'.green} Listar tareas completadas`);
        console.log(`${'4.'.green} Listar tareas pendientes`);
        console.log(`${'5.'.green} Completar tarea(s)`);
        console.log(`${'6.'.green} Borrar tarea`);
        console.log(`${'0.'.green} Salir \n`);

        // Leer información por consola
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Se lee la información
        rl.question('Selecciona una opción: \n', (option) => {
            rl.close();
            resolve(option);
        });
    });
}

const pause = () => {
    return new Promise((resolve, rejected) => {
        // Leer información por consola
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        // Se lee la información
        rl.question(`\nPresione ${'ENTER'.green} para continuar \n`, (option) => {
            rl.close();
            resolve();
        });
    });
}

export {
    showMenu,
    pause
}