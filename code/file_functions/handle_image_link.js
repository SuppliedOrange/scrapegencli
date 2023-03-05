import fsp from 'fs/promises';
import configIni from 'config.ini';
import clipboard from 'clipboardy';
import open from 'open'
import { download_file } from './download_file.js';

export async function handle_image_link(link) { // Log to default log then open the render link or log it to the console.

    if (link) await clipboard.write(link)
    .then(x => { // Copy result to clipboard
        console.log("\n> RESULT WAS COPIED TO THE CLIPBOARD | CTRL + V TO PASTE IT")
    })
    .catch(err => {
        console.log("| Could not copy result to clipboard")
    })

    await fsp.appendFile('./generated/GENERATION_LOGS.txt', link + '\n', (err) => { } ); // Log to generation logs

    await download_file(link); // If enabled, download the image to generated/images.
  
    let mode = configIni.load('./configuration/SETTINGS.ini').OnImageRender.mode;
    
    if (mode == 'open') return open(link) // Open link in default web browser / image viewer
    
    // Otherwise, log it to the console.
    else if (mode == 'log') return console.log(`

    \n\n\n> GENERATED IMAGE LINK | ${link} |\n\n\n
    
    `)
  
    else return console.log("| Error: Could not do anything with the link provided.\n" + link || 'No Link');
  
  }