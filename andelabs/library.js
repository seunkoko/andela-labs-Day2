
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
			let response = "";
    
			if (typeof (param) != "string") {
				response = "test only for string";
			} else if (!param) {
				response = null;
			} else if (param === generateReverse(param)) {
				response = true;
			} else {
				response = generateReverse(param);
			}
			
			return response;
		}

	}

	function generateReverse(param) {
    let paramArray = param.split("");
    let paramLength = paramArray.length;
    let newParam = "";
    
    for (let i = (paramLength - 1); i >= 0; i--) {
      newParam += paramArray[i]; 
    }
    
    return newParam;
  }
