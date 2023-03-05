import inquirer from "inquirer";
import * as skeletons from '../menu_skeletons.js'

export async function get_mode_preference() {

    return await inquirer.prompt(skeletons.change_settings_handler_method);
  
}