//Inverts all colors on the page
function invertColors()
{
	//iterate through every element
	var allElements = document.getElementsByTagName("*");
	var arrayOfElements = Array.prototype.slice.call(allElements);
	for(var  i = 0; i < arrayOfElements.length; i++)
	{
		var color = null;

		//if we can't find this property or it's null, assume it's black
		if (!arrayOfElements[i].style.color)
			color = new RGBColor('rgb(0,0,0)'); 
		else		//create RGBColor object
			color = new RGBColor(arrayOfElements[i].style.color);

		if (color.ok) { 
			//good to go, let's build up this RGB baby!
			//subtract each color component from 255
			arrayOfElements[i].style.color = 'rgb(' + (255 - color.r) + ', ' + (255 - color.g) + ', ' + (255 - color.b) + ')';
		}
		color = null; //some cleanup
	}
	for(var  i = 0; i < arrayOfElements.length; i++)
	{
		var background_color = null;

		//if we can't find this property or it's null, assume it's white
		if (!arrayOfElements[i].style.background) 
			background_color = new RGBColor('rgb(255,255,255)'); 
		else		//create RGBColor object
			background_color = new RGBColor(arrayOfElements[i].style.background);

		if (background_color.ok) { 
			//good to go, let's build up this RGB baby!
			//subtract each color component from 255
			arrayOfElements[i].style.background = 'rgb(' + (255 - background_color.r) + ', ' + (255 - background_color.g) + ', ' + (255 - background_color.b) + ')';
		}
		background_color = null; //some cleanup
	}
}

/**
 * A class to parse color values
 * @author Stoyan Stefanov <sstoo@gmail.com>
 * @link   http://www.phpied.com/rgb-color-parser-in-javascript/
 * @license Use it if you like it
 */
function RGBColor(color_string)
{
    this.ok = false;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^(\w{2})(\w{2})(\w{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^(\w{1})(\w{1})(\w{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
}

