export const change_settings_handler_method = [ // skeleton for change settings inquiry

  {
    type: 'list',
    name: 'link_handler_mode',
    message: 'What should the application do after recieving a rendered image?',
    choices: [
      {
        name: 'Open it in a browser'
      },
      {
        name: 'Just log it to the terminal'
      }
    ]
  },

]

export const change_settings_save_image = [

  {
    type: 'list',
    name: 'save_image',
    message: 'Should the rendered image be downloaded to /generated/images?',
    choices: [
      {
        name: 'Yes, download the images.'
      },
      {
        name: 'No, don\'t download the images'
      }
    ]
  },

]

export const ask_for_config_link = [ // Skeleton for config link inquiry

{
  type: 'input',
  name: 'config_link',
  message: 'Enter your config.ini file\'s path here.\n',
},

]

export const menu_navigation = [ // Skeleton for menu navigation inquiry

{
  type: 'list',
  message: "What do you want to do?",
  name: 'menu_choice',
  choices: [
    {
      name: 'Generate Manually'
    },
    {
      name: 'Generate through data from ./configuration/CONFIG.ini'
    },
    {
      name: "Generate through data from a custom .ini file"
    },
    {
      name: "Change what happens after retrieving the image"
    },
    {
      name: "Allow images to be downloaded to /generated/images"
    },
    {
      name: 'Exit'
    }     
  ]
},

]

export const generation = [ // Skeleton for generation inquiry
  
{
  type: 'input',
  name: 'prompt',
  message: 'Enter your prompt here. Be verbose.\n',
},

{
  type: 'input',
  name: 'negative_prompt',
  message: 'Enter your negative prompt here. You will see less of that in the image. [Optional]\n',
},

{
  type: 'list',
  message: 'Choose the model that best suits your image',
  name: 'model',
  choices: [
    {
      name: 'Fusion',
      short: 'Using Fusion | Consistent high quality visually appealing images'
    },  
    {
      name: 'Artistic',
      short: 'Using Artistic | High-quality artistic images'
    },
    {
      name: 'Fantasy',
      short: 'Using Fantasy | High-quality fantasy and 3D anime images'
    },
    {
      name: 'PhotoReal',
      short: 'Using Photoreal | Photorealistic images and people'
    },
    {
      name: 'Stable (Old)',
      short: 'Using Stable (Old) | DeepDreamGenerator (V1)'
    },
    {
      name: 'Cyberspace (v2)',
      short: 'Using Cyberspace (v2) | High-quality 3D images with a sci-fi aesthetic'
    },
    {
      name: 'Quantum (v2)',
      short: 'Using Quantum (v2) | High-quality 3D images with a gaming aesthetic'
    },
    {
      name: 'Stable (v2)',
      short: 'Using Stable (v2) | DeepDreamGenerator (V2)'
    }
  ]
},

{
  type: 'list',
  message: 'Aspect ratio of the image',
  name: 'aspect_ratio',
  choices: [
    {
      name: 'Landscape'
    },
    {
      name: 'Square'
    },
    {
      name: 'Portrait'
    },        
  ]
},

{
  type: 'list',
  message: 'Quality of generated image',
  name: 'quality',
  choices: [
    {
      name: 'Normal'
    },
    {
      name: 'High',
      short: "High | You cannot use 2MP upscaling)"
    },
  ]
},

{
  type: 'list',
  message: 'Enable face enhance to improve facial features\' clarity?',
  name: 'face_enhance',
  choices: [
    {
      name: 'None'
    },
    {
      name: 'Normal'
    }      
  ]
},

{
  type: 'list',
  message: 'Upscale And Enhance Image? Less noise & more resolution.',
  name: 'upscale_and_enhance',
  choices: [
    {
      name: 'None'
    },
    {
      name: '1MP'
    },
    {
      name: '2MP'
    },        
  ]
},

{
  type: 'list',
  message: 'Follow model style?',
  name: 'follow_model_style',
  choices: [
    {
      name: 'false'
    },
    {
      name: 'true',
      short: 'Using model style, image will adhere to style of training data'
    }     
  ]
},

];

export default {}