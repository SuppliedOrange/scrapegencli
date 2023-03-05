import https from 'https';
import fs from 'fs';
import { basename } from 'path';
import configIni from 'config.ini';

export async function download_file (image_link) {

    // Check if they have image save option enabled
    let valid_setting = configIni.load('./configuration/SETTINGS.ini').SaveImage.save;
    if (valid_setting != 'true') return;

    const destination_path = './generated/images/' + basename(image_link);
    console.log("> SAVING IMAGE TO " + destination_path);

    fs.writeFile(destination_path, '', function (err) { });

    const file = fs.createWriteStream( destination_path );

    https.get(image_link, function(response) {

        response.pipe(file);

        file.on("finish", () => {
            file.close();
        });

        file.on('error', () => {
            console.log(`! Could not download the generated image.`);
            fs.unlink(destination_path);
        })

    })

}