![what](https://img.shields.io/badge/Language%20support-JS%20TS-green)

# Cool Particle Bacground for websites !
this small repo is about a particle background for a website, that can be customised to fit anyone's needs.

### How does it work ?
this simple animated background can be customised by changing the javascript and css files. To put this cool background into context, there is a nav bar added with some sample links to give an overall idea on how this would look on an actual website !

### How to use :
- take the canva element from the html and paste it in the top section in your body
- make a separate js file and link it at the end of the body
- take the css associated with the ***canva*** tag, the other css is there for the nav and links

here is a guide about js and css variables :


#### Javascript :
***PARTICLE_NUMBER_FG*** : defines how many particles there are in the forground.<br />
***PARTICLE_NUMBER_BG*** : defines how many particles there are in the background.<br />
***SPEED_FACTOR_FG*** : defines how fast the particles are moving, higher is faster.<br />
***distanceThresh*** : defines the threshold to start drawing a line between the particles, lower means that the lines will be drawn when 2 particles are close to eachother.<br />
***lineOppacity*** : an integer >= 1, defines the opacity of the line, higher is more transparent, lower is more opaque.<br />
***lineColor*** : has to be either **rgba** or **rgb**.<br />


#### CSS :
--background-color : the background color of the canvas <br />
--text-color : the color of the text


