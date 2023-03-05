import * as file_functions from '../file_functions/modules.js'
import * as selection_inquirers from '../selection_inquirers/modules.js';

export async function image_save_toggler () {

    let new_setting = await selection_inquirers.get_image_save_preference();
    let line_to_change = /save = '(true|false)'/g;
    let new_line = `save = '${(new_setting.save_image == 'Yes, download the images.') ? 'true' : 'false'}'`;
    await file_functions.change_setting(line_to_change, new_line);

}