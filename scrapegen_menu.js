// In-built imports (process exit function)
import { exit } from 'process';
// Importing selection inquirers
import * as selection_inquirers from './code/selection_inquirers/modules.js';
// Importing option handlers
import * as option_handlers from './code/option_handlers/modules.js';
// Importing ASCII art
import * as ascii_art from './code/ascii_art/ascii_art.js';

// Runtime code

console.log(ascii_art.title);
console.log('\nConfused about what to generate? Check the CONFIG.ini file in the configuration folder for some detailed help.\n\n');

export async function start() {

  while (true) {

    let present_menu = null;
    present_menu = await selection_inquirers.get_menu_selection();
    let chosen_option = present_menu.menu_choice;

    switch (chosen_option) {

      case 'Generate Manually':
        await option_handlers.manual_generation();
        continue;

      case 'Generate through data from ./configuration/CONFIG.ini':
        await option_handlers.default_config_generation();
        continue;
      
      case "Generate through data from a custom .ini file":
        await option_handlers.custom_config_generation();
        continue;
      
      case "Change what happens after retrieving the image":
        await option_handlers.result_handler_toggler();
        continue;
      
      case "Allow images to be downloaded to /generated/images":
        await option_handlers.image_save_toggler();
        continue;

      case "Exit":
        exit(0);
    }

  }

}

start();