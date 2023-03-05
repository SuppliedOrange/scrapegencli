# scrapegencli
 A Command Line Interface for [scrapegen](https://github.com/SuppliedOrange/scrapegen), an webscraper for unlimited free text2image.

<br>

# How do I install this?
- Go to [the releases tab](https://github.com/SuppliedOrange/scrapegen/releases) and install the latest version of the project ( a .zip file ).
- Install [NodeJS](https://nodejs.org/en/download/).
- Unzip the .zip file and run `DEPENDENCY-INSTALLER.BAT`.
- Finally, run `START.BAT`. Yay!

<br>

# What is this?
I made a webscraper called [scrapegen](https://github.com/SuppliedOrange/scrapegen) for a certain website that uses the Deep Dream AI image generator. This webscraper bypasses the paywall by generating new accounts each time it is initialized. Free AI art, forever. 
### "That's it?"
There's img2img, inpainting and more but honestly why would I program that when I could be playing R6S while drinking my favourite cold coffee. Jokes aside, this is about as powerful as an early stablediffusion model that runs on CPU proccessing. So yeah, that's it.

<br>

# Menu options

### `Generate manually`

- This setting lets you generate an image by entering the prompt details in a survey form. Straight-forward and simple.

### `Generate through data from ./configuration/CONFIG.ini`

- There is a file named `CONFIG.ini` in the folder named `configuration`. This command basically reads the data from that file and processes it. You can modify said file and use this setting.

### `Generate through data from a custom .ini file`
- The above setting uses a specific file named `CONFIG.ini`. You can provide the path to your own .ini file to generate data with this setting.

<br>

- ##### (This would probably work great as a path-level program with arguements being the file path.)

### `Change what happens after retrieving the image`
- When the image is retrieved by the program, you can choose what you want the program to do with it

- You can either *open the image in your default browser* or *log the image to the console*.

### `Allow images to be downloaded to /generated/images`
- Allows you to choose whether the program should automatically download the image to the `images` folder inside the `generated` folder. Off by default.

<br>

# Prompt settings

- If you're clueless about the models and the settings, I highly recommend visiting [this site](https://deepdreamgenerator.com/how-it-works) for details or using the instruction sheet in the `configuration/config.ini` file.

- [Here's a link to a guide I made anyway](https://github.com/SuppliedOrange/scrapegen/blob/main/prompt_guide.md)

<br>

# Parallel processing
There's a file called `START_WITH_CONGIG.BAT` in the folder. This starts the app, immediately reads content from `configuration/config.ini`. It generates the image and closes automatically.

It is highly recommended you use this with `Log to console` setting and `Download image after generation` setting while running multiple processes of this file at once. This will generate tons of images and store them in the generated folder.

<br>

# Notes

This was created with ease of accessibility in mind. There's an entire ES6 port of scrapegen in the repo, I have a really good explanation I promise. I'll tell you once I'm done watching the entire One Piece series.

This has a lot more potential but honestly if I had the motivation to make half the things I think of, I probably won't be sitting here playing video games.

<br>

# Dependencies

- [scrapegen](https://github.com/SuppliedOrange/scrapegen) (Not yet)
- [clipboardy](https://github.com/sindresorhus/clipboardy)
- [config.ini](https://github.com/martinswiderski/config.ini)
