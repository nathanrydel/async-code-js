"use strict";

const BASE_URL = "http://numbersapi.com";

// Write a function, showNumberTrivia, that makes a request to the Numbers API (http://numbersapi.com) to get trivia about your favorite number. (Make sure you get back JSON — you may need to look at the documentation of the API to see how to do this: Details.) Log the piece of trivia to the console.


/**
 * Request trivia about your favorite number and log the fact
 * @param {number} num - Your favorite number
 */

async function showNumberTrivia(num) {
  console.debug("running showNumberTrivia");

  const resp = await fetch(`${BASE_URL}/${num}?json`);
  const respData = await resp.json();

  console.log("showNumberTrivia results:", respData.text);
}




// Have a “race”: make a new function, showNumberRace, that asks for
// trivia about four different numbers (using four separate requests),
// but, as soon as one request returns, log the piece of trivia for
// the winning number to the console.

/** Request trivia about 4 different numbers, and the fastest
 *  response is saved. Logs the trivia for the number with the
 *  fastest response.
 */
async function showNumberRace(num1, num2, num3, num4) {

  const promise1 = fetch(`${BASE_URL}/${num1}?json`);
  const promise2 = fetch(`${BASE_URL}/${num2}?json`);
  const promise3 = fetch(`${BASE_URL}/${num3}?json`);
  const promise4 = fetch(`${BASE_URL}/${num4}?json`);

  const raceWinner = await Promise.race(
    [promise1,
     promise2,
     promise3,
     promise4
    ]
  )

  const trivia = await raceWinner.json();

  console.log(trivia.text);
}