import inquirer from "inquirer";
import * as skeletons from '../menu_skeletons.js'

export async function get_config_link() {

    return await inquirer.prompt(skeletons.ask_for_config_link);
  
}