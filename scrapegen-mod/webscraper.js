import TempMail from 'node-temp-mail';
import { generateUsername } from 'unique-username-generator';
import puppeteer from 'puppeteer';
const urlregex = /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:\/~+#-]*[\w@?^=%&\/~+#-])/gm

let status = { success: false, tries: 0, error: 'Out of tries' }
let link = '';

/* https://deepdreamgenerator.com/sign-up */

async function getConfirmationMessage(email) {

    var address = new TempMail(email);
    // console.log('Using address:')
    // console.log(address.getAddress())

    address.fetchEmails(async function(err,emails){

        // console.log("Attempting to fetch email data")
        status.error = "Could not fetch email data"
        if (!emails) return;

        // console.log("Attempting to fetch list of emails recieved")
        status.error = "Could not fetch list of emails recieved"
        if (!emails.messages) return;

        // console.log("Attempting to find the correct email")
        let email = emails.messages.filter(x => x.subject == 'Registration Confirmation')[0];
        if (!email) {
            status.error = "Could not find correct email"
            return;
        }
        // console.log("Found it")

        // console.log("Checking if the message is valid...")
        status.error = 'invalid email body'
        if (!email.message) return
        
        // Find the URL
        // console.log("Finding regex")
        let confirm_link = email.message.match(urlregex);
        status.error = "Could not find confirmation URL in the email."
        if (!confirm_link) return

        confirm_link = confirm_link[2];
        // console.log("Found confirmation link:")
        // console.log(confirm_link);
        link = confirm_link;
        status.success = true;
        return link;
    });

    if (!status.success) {
        // console.log(status.error)
        return
    }

    else return link;

}

const generate_image = (async (generation) => {

    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();

    let details = {}
    details.name = generateUsername();
    let email = new TempMail(details.name);
    details.email = email.getAddress().address;
    details.password = 'Coconut_Hog123'

    // console.log(details)
  
    await page.goto('https://deepdreamgenerator.com/sign-up');
  
    await page.setViewport({width: 1080, height: 1024});
  
    await page.evaluate(async (details) => { 
        document.getElementsByName('name')[0].value = details.name + ' doog';
        document.getElementsByName('email')[0].value = details.email;
        document.getElementsByName('password')[0].value = details.password;
        document.getElementsByName('password_confirmation')[0].value = details.password;
        document.getElementsByTagName('button')[0].click()
    }, details)

    await page.waitForSelector('.top-dreamers-btn', { visible: true, timeout: 30000 });

    link = ''
    status = { success: false, tries: 0, error: 'Out of tries' }

    while (!link) {

        status.tries++; // Increase number of tries, see if we've got the message

        if (status.tries > 10) {
            console.log("Failed to validate account.")
            return null
        } // Break if we're 10 tries over

        // console.log("Waiting 8 seconds before next attempt")
        await new Promise(r => setTimeout(r, 8000))
        // console.log("Attempt: " + status.tries);
        if (link) break
        link = await getConfirmationMessage(details.name) 
    }

    await page.goto(link,{ // Follow the redirect link. We get redirected to a mangled link.
        waitUntil: "domcontentloaded"
    });

    let mangled_link = await page.evaluate(async () => { return document.URL }) // Fix that mangled link
    let decrypted_link = mangled_link.match(urlregex)[1];

    await page.goto(decrypted_link,{ // Go to the fixed verification link
        waitUntil: "domcontentloaded"
    });

  // Verification automatically throws us to the generation page
    
    page.evaluate(async (generation) => {
            
            function getDropdownValuesArranged (id) { // Function to get all the names and values of each option in a dropdown.
                let options = {};
                let option_list = document.getElementById(id).children;
                for (const option of option_list) {
                    if (!option.disabled) options[option.innerHTML] = option.value
                }
                return options;
            }
            
            // Getting models and arranging them by value
            let models = getDropdownValuesArranged('drop-aiModel');
            document.getElementById('drop-aiModel').value = models[generation.model];

            // Getting asepct ratios and arranging them by value
            let ratios = getDropdownValuesArranged('drop-aspectRatio');
            document.getElementById('drop-aspectRatio').value = ratios[generation.aspect_ratio];


            
            function getRadioOptions (id) { // Function to get the names of all the options under a radio and arrange it in an array.
                let options = [];
                let option_list = document.getElementById(id).children;
                for (let option of option_list) {
                    option = option.children; // A html collection of radios/spans.
                    if (!option.disabled) options.push(option[1].innerHTML);
                }
                return options;
            }

            // Editing the prompt
            try {
                document.getElementById('text-prompt').value = generation.prompt;
            } catch (e) { throw 'Hit an error while attempting to enter text into the prompt text area' }

            // Getting Qualities from the radio options
            let qualities = getRadioOptions('radios-quality');
            try {
                document.getElementsByName('quality')[qualities.indexOf(generation.quality)].click();
            } catch (e) { throw 'Hit an error while attempting to select the correct item from the Quality dropdown' }

            // Getting Negative Prompts from the radio options 
            // let negative_prompts = getRadioOptions('radios-negativePrompt');
            if (!generation.negative_prompt) { // If a negative prompt was not provided,
                try {
                    document.getElementsByName('negativePrompt')[0].click(); // Select auto.
                } catch (e) { throw 'Hit an error while attempting to select the correct radio for Negative Prompt (To select Auto)' }
            } 
            else { // Else,
                try {
                    document.getElementsByName('negativePrompt')[2].click(); // Select custom
                    document.getElementById('negative-prompt').value = generation.negative_prompt; // Enter the custom negative responsive into the text area
                } catch (e) { throw 'Hit an error while attempting to enter details into the text area for Negative Prompt' }
            }

            // Getting Face Enhance from the radio options
            let face_enhance = getRadioOptions('radios-faceEnhance');
            try {
                document.getElementsByName('faceEnhance')[face_enhance.indexOf(generation.face_enhance)].click()
            } catch (e) { throw 'Hit an error while attempting to select the correct radio for Face Enhance'}

            // Getting Upscale & Enhance from the radio options 
            let upscale_enhance = getRadioOptions('radios-aiUpscale');
            try {
                document.getElementById('radios-aiUpscale').children[upscale_enhance.indexOf(generation.upscale_and_enhance)].click()
            } catch (e) { throw 'Hit an error while attempting to select the correct radio for Upscale/Enhance'}

            // Checking the follow model style setting
            if (!document.getElementById('id-useModelStyle').checked && generation.follow_model_style == 'true') {
                try {
                    document.getElementById('id-useModelStyle').click()
                } catch (e) { throw 'Hit an error while attempting to select the check/uncheck the option for Use Model Style' }
            }

            // Clicking the generate button
            try {
                document.getElementsByClassName('submit generator-submit btn btn-orange')[0].click()
            } catch (e) { throw 'Hit an error while attempting to click the button that generates the image, did you select High quality with 2MP upscaling?'}

    }, generation).catch(e => console.log(`scrapegen: ${e}`))

    await page.waitForSelector('.img-responsive', {timeout: 0}); // Wait until we get the image
    let image_link = await page.evaluate( async () => { return document.querySelector('.img-responsive').src } ) // Get the image

    await browser.close();

    return image_link

});

export default generate_image;