$(document).ready(function() {
  // Real example of words from a terminal
  // The answer is "shot"
  var wordArray = [
    "shot",
    "hurt",
    "sell",
    "give",
    "sure",
    "gear",
    "sent",
    "fire",
    "glow",
    "week",
    "ones",
    "sick"
  ];

  var getHeighestWeighted = function(obj) {
    var char = '';
    var weight = 0;
    for(var key in obj) {
      if(weight <  obj[key]) {
        char = key;
        weight = obj[key];
      }
    }

    return char;
  };

  var prepWeights = function(length) {
    weights = [];

    for(var i = 0; i < length; i++) {
      weights[i] = {};
    }

    return weights;
  }

  var compareWords = function(testWord, likelyWord) {
    var length = testWord.length;
    var matched = 0;

    for(var i = 0; i < length; i++) {
      if(testWord.charAt(i) === likelyWord.charAt(i)) {
        matched++;
      }
    }

    return (matched / length);
  };

  var sortByKey = function(array, key) {
    return array.sort(function(a, b) {
        var x = a[key];
        var y = b[key];

        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
  }

  var buildLikelyWord = function(wordArray) {
    var wordLength = wordArray[0].length;
    var characterWeights = prepWeights(wordLength);
    var likelyWord = '';

    for(var i = 0; i < wordLength; i++) {
      for(var j = 0; j < wordArray.length; j++) {
        var char = wordArray[j].charAt(i);

        if(characterWeights[i][char] === undefined) {
          characterWeights[i][char] = 1;
        } else {
          characterWeights[i][char]++;
        }
      }
    }

    for(var i = 0; i < wordLength; i++) {
      likelyWord += getHeighestWeighted(characterWeights[i]);
    }

    return likelyWord;
  };

  var getProbabilities = function(words) {
    var lw = buildLikelyWord(words);
    var wordPercentageRelationship = prepWeights(words.length);

    for(var i = 0; i < words.length; i++) {
      wordPercentageRelationship[i] = {
        word : words[i],
        probability : compareWords(words[i], lw)
      };
    }

    return sortByKey(wordPercentageRelationship, 'probability').reverse();
  };

  var p = getProbabilities(wordArray);

  console.log(p);
});
