import inquirer from "inquirer";
import * as skeletons from '../menu_skeletons.js'

export async function get_generation() { // Get the prompt for generation manually

    return await inquirer.prompt(skeletons.generation);
  
}