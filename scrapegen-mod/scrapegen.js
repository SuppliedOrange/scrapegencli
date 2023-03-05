import webscraper from './webscraper.js';
import configIni from 'config.ini';
const exampleData = configIni.load('./config.ini').Generator;

async function generate ( config, callback = null ) {

    let webscraped_link = await webscraper(config);
    if (callback) await callback(webscraped_link);
    return webscraped_link;

}

async function generate_from_configini( config_file_path, callback = null ) {

    const data = await configIni.load(config_file_path).Generator;
    return await generate( data, callback );

}

export default { generate: generate, generate_from_configini: generate_from_configini, exampleData: exampleData }