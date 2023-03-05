// In-built imports (process exit function)
import { exit } from 'process';
// Importing option handlers
import * as option_handlers from '../code/option_handlers/modules.js';
// Importing ASCII art
import * as ascii_art from '../code/ascii_art/ascii_art.js';

console.log(ascii_art.title);
console.log('\nAutomatically gathering data from ./configuration/CONFIG.ini\n\n');

await option_handlers.default_config_generation( '../configuration/CONFIG.ini' ).catch( x => exit(x) );

exit(0)