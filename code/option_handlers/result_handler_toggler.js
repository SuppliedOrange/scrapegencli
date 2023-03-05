import * as file_functions from '../file_functions/modules.js'
import * as selection_inquirers from '../selection_inquirers/modules.js';

export async function result_handler_toggler () {

    let new_setting = await selection_inquirers.get_mode_preference()
    let line_to_change = /mode = '(open|log)'/g;
    let new_line = `mode = '${(new_setting.link_handler_mode == 'Open it in a browser') ? 'open' : 'log'}'`;
    await file_functions.change_setting(line_to_change, new_line);

}