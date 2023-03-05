import * as file_functions from '../file_functions/modules.js'
import * as selection_inquirers from '../selection_inquirers/modules.js';
import { resolve } from 'path';
import { existsSync } from 'fs';
import scrapegen from '../../scrapegen-mod/scrapegen.js';
import { generating } from '../ascii_art/ascii_art.js';
import configIni from 'config.ini';

export async function custom_config_generation () {

    let link = await selection_inquirers.get_config_link(); // Get the configuration link from the user
    let config_path = resolve(link.config_link);

    if (!existsSync( config_path )) { // Check if the path is valid
        return console.log(`An error occured. It seems the file ${link} is invalid.`);
    }

    let data = await configIni.load(config_path).Generator;
    let validation = file_functions.validate_prompt_data(data); 

    if (!validation.valid) { // Verify the generation data
        return console.log("An error occured!\nThe application could not verify that your data was in the correct format. Please review the following error:\n" + validation.reason);
    }

    console.log(generating); // Generate
    await scrapegen.generate_from_configini( config_path, file_functions.handle_image_link ).catch(e => {});

}