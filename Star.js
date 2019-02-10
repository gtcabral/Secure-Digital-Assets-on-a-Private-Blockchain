/* ===== Star Class ===============================
|  Class with a constructor for star 			   |
|  ===============================================*/

/*
	Here is an example of how star coordinates are represented:
		RA 13h 03m 33.35sec, Dec -49° 31’ 38.1” Mag 4.83 Cen

	Here is what each of these abbreviations stands for.
		RA = Right Ascension
		DEC = Declination
		CEN = Centaurus
		MAG = Magnitude
	Note: Mag stands for magnitude, which is the brightness of the star.
*/

class Star {
	constructor(){
		this.ra = "",
		this.dec = "",
		this.mag = "",
		this.cen = "",
		this.story = "",
		this.storyDecoded = ""
	}
}

module.exports.Star = Star;