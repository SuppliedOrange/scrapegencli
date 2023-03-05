import * as file_functions from '../file_functions/modules.js';
import * as selection_inquirers from '../selection_inquirers/modules.js';
import scrapegen from '../../scrapegen-mod/scrapegen.js';
import { generating } from '../ascii_art/ascii_art.js';

export async function manual_generation () {

    let data = await selection_inquirers.get_generation();
    let validation = file_functions.validate_prompt_data(data);

    if (!validation.valid) { // Verify the generation data
      return console.log("An error occured!\nThe application could not verify that your data was in the correct format. Please review the following error:\n" + validation.reason);
    }

    console.log(generating); // Generate
    await scrapegen.generate( data, file_functions.handle_image_link ).catch(e => {});;

}