import inquirer from "inquirer";
import * as skeletons from '../menu_skeletons.js'

export async function get_image_save_preference() {

    return await inquirer.prompt(skeletons.change_settings_save_image);
  
}