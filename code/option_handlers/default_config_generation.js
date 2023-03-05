import * as file_functions from '../file_functions/modules.js';
import scrapegen from '../../scrapegen-mod/scrapegen.js';
import path from 'path';
import { generating } from '../ascii_art/ascii_art.js';
import configIni from 'config.ini';

export async function default_config_generation( cfgpath = './configuration/CONFIG.ini' ) {

    let data = await configIni.load(cfgpath).Generator;
    let validation = file_functions.validate_prompt_data(data);

    if (!validation.valid) { // Verify the generation data
      return console.log("An error occured!\nThe application could not verify that your data was in the correct format. Please review the following error:\n" + validation.reason)
    }

    console.log(generating) // Generate
    let config_path = path.resolve('./configuration/CONFIG.ini');
    await scrapegen.generate_from_configini( config_path, file_functions.handle_image_link ).catch(e => { });

}