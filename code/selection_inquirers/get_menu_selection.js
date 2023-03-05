import inquirer from "inquirer";
import * as skeletons from '../menu_skeletons.js'

export async function get_menu_selection() {

    return await inquirer.prompt(skeletons.menu_navigation);

}