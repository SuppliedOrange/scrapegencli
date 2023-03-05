import fsp from 'fs/promises'

export async function change_setting(line_to_change, new_line) { // Toggle the setting in SETTINGS.ini

    const config_settings_path = './configuration/SETTINGS.ini';
    
    let current_data = await fsp.readFile(config_settings_path, {encoding: 'utf8'});
    let formatted = current_data.replace(line_to_change, new_line);
    await fsp.writeFile(config_settings_path, formatted, 'utf8', function (err) {
        if (err) return console.log(err);
    });
  
    console.log("| Done! Setting has been updated.");

}