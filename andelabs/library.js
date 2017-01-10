
	'use strict'

	module.exports = {

		words: function (param) {
			let response = {};
			let count = 0;
			let arrayOfWords = param.replace(/[\r\n\s\t]/g, " ").replace("  ", " ").split(" ");
			
			for (let i = 0; i < arrayOfWords.length; i++) {
				let checkWord = arrayOfWords[i];
				count = 0;

				for (let j = 0; j < arrayOfWords.length; j++) {
					if (checkWord === arrayOfWords[j]) {
						count++;
					}
				}

				response[checkWord] = count;
			}

			return response;
		},

		reverseString: function (param) {
			return "";
		}

	}
