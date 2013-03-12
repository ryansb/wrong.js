//Inverts all colors on the page
function invertColors()
{
	//Get array of all elements
	var allElements = document.getElementsByTagName("*");
	var arrayOfElements = Array.prototype.slice.call(allElements);

	//Go through all elements, inverting color properties
	for(var  i = 0; i < arrayOfElements.length; i++)
	{
		var color = null;

		//if we can't find this property or it's null, assume it's black
		if (!arrayOfElements[i].style.color)
			color = new RGBColor('rgb(0,0,0)'); 
		else		//create RGBColor object
			color = new RGBColor(arrayOfElements[i].style.color);

		if (color.ok) { 
			//subtract each color component from 255
			arrayOfElements[i].style.color = 'rgb(' + (255 - color.r) + ', ' + (255 - color.g) + ', ' + (255 - color.b) + ')';
		}
		color = null; //some cleanup
	}

	//Go through all elements, inverting background-color properties for text-holding elements
	for(var  i = 0; i < arrayOfElements.length; i++)
	{
		var tagName = arrayOfElements[i].tagName;
		if(tagName == 'P' 
				|| tagName == 'LI' 
				|| tagName == 'UL' 
				|| tagName == 'A' 
				|| tagName == 'H1'
				|| tagName == 'H2'
				|| tagName == 'H3'
				|| tagName == 'H4'
				|| tagName == 'H5'
				|| tagName == 'H6')
		{
			var background_color = null;

			//if we can't find this property or it's null, assume it's white
			if (!arrayOfElements[i].style.background) 
				background_color = new RGBColor('rgb(255,255,255)'); 
			else		//create RGBColor object
				background_color = new RGBColor(arrayOfElements[i].style.background);
	
			if (background_color.ok) { 
				//subtract each color component from 255
				arrayOfElements[i].style.background = 'rgb(' + (255 - background_color.r) + ', ' + (255 - background_color.g) + ', ' + (255 - background_color.b) + ')';
			}
			background_color = null; //some cleanup
		}
	}
}

//Switch alignment on text
function switchAlignment()
{
	//Get array of all elements
	var allElements = document.getElementsByTagName("P");
	var arrayOfElements = Array.prototype.slice.call(allElements);
	//Go through all elements, altering alignments
	for(var  i = 0; i < arrayOfElements.length; i++)
	{
		//If no textAlign property exists, set it to be explicitly left justified
		if(!arrayOfElements[i].style.textAlign)
			arrayOfElements[i].style.textAlign = 'left';

		//Make everything right justified, except for things already right justified,
		//which we will make left justified.
		switch(arrayOfElements[i].style.textAlign)
		{
			case 'left':
				arrayOfElements[i].style.textAlign = 'right';
				break;
			case 'center':
				arrayOfElements[i].style.textAlign = 'right';
				break;
			case 'right':
				arrayOfElements[i].style.textAlign = 'left';
				break;
			case 'justify':
				arrayOfElements[i].style.textAlign = 'right';
				break;
			default:
				arrayOfElements[i].style.textAlign = 'right';
				break;
		}


	}
}

//Makes all links scroll marquee style. 
//Must be called from <head>!
function blinkLinks()
{
	var animation = 'a\
{\
		animation-name:myfirst;\
		animation-duration:1s;\
		animation-timing-function:linear;\
		animation-iteration-count:infinite;\
		animation-play-state:running;\
		/* Firefox: */\
		-moz-animation-name:myfirst;\
		-moz-animation-duration:1s;\
		-moz-animation-timing-function:linear;\
		-moz-animation-iteration-count:infinite;\
		-moz-animation-play-state:running;\
		/* Safari and Chrome: */\
		-webkit-animation-name:myfirst;\
		-webkit-animation-duration:1s;\
		-webkit-animation-timing-function:linear;\
		-webkit-animation-iteration-count:infinite;\
		-webkit-animation-play-state:running;\
		/* Opera: */\
		-o-animation-name:myfirst;\
		-o-animation-duration:1s;\
		-o-animation-timing-function:linear;\
		-o-animation-iteration-count:infinite;\
		-o-animation-play-state:running;\
}\
\
@keyframes myfirst\
{\
		0%   {visibility:visible}\
		50%  {visibility:visible}\
		51%  {visibility:hidden}\
		100%  {visibility:hidden}\
}\
\
@-moz-keyframes myfirst /* Firefox */\
{\
		0%   {visibility:visible}\
		50%  {visibility:visible}\
		51%  {visibility:hidden}\
		100%  {visibility:hidden}\
}\
\
@-webkit-keyframes myfirst /* Safari and Chrome */\
{\
		0%   {visibility:visible}\
		50%  {visibility:visible}\
		51%  {visibility:hidden}\
		100%  {visibility:hidden}\
}\
\
@-o-keyframes myfirst /* Opera */\
{\
		0%   {visibility:visible}\
		50%  {visibility:visible}\
		51%  {visibility:hidden}\
		100%  {visibility:hidden}\
}'

	var css  = document.createElement('style');
	css.type = 'text/css';

	if(css.styleSheet) css.styleSheet.cssText = animation;
	else css.appendChild(document.createTextNode(animation));

	document.getElementsByTagName("head")[0].appendChild(css);
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

