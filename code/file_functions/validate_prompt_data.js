import * as skeletons from '../menu_skeletons.js'

export function validate_prompt_data( data ) {

    const fail = (reason) => { return { valid: false, reason: reason } }
    const pass = () => { return { valid: true } }
  
    const required_keys = skeletons.generation.map(x => x.name) // Check if all properties are present.
  
    // Check if the provided data contains all the required settings.
    if (!required_keys.every( key => Object.keys(data).includes(key) )) return fail( "Data format is incorrect. Follow the format in CONFIG.ini in the configuration folder." )
  
    for (const property of Object.keys(data)) {
      // If the key isn't negative_prompt (which is an optional property) and has no value, it's invalid.
      if (property != 'negative_prompt' && !data[property]) return fail( `The '${property}' property was not provided. Follow the format in CONFIG.ini in the configuration folder.` )
    }
  
    if (data.quality == 'High' && data.upscale_and_enhance == '2MP') return fail("You tried to use High quality setting with 2MP upscaling/enhancing. This is forbidden as it goes over token limits."); // Validate token usage doesn't exceed 20.
    
    return pass(); // Passed
  
  }