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
  );

  const trivia = await raceWinner.json();

  console.log(trivia.text);
}



// Get all: make a new function, showNumberAll. that asks for trivia
// about about different numbers. Make all of the requests at the same
// time, but handle them once all requests are completed.

// However, at least one of the “numbers” you use should be an invalid
//  thing, like the string “WRONG”.

// Log to the console the array of trivia for responses with a
// successful status code, and the array of error messages for the
//  responses with a failed status code.

async function showNumberAll(nums) {
  console.debug("Running showNumberAll");

  const gatheredResponses = nums
    .map(num => fetch(`${BASE_URL}/${num}?json`));

  console.log("gatheredResponse: ", gatheredResponses);

  // Accepts an array of promises, returns a new Promise
  const resultsPromises = await Promise.allSettled(gatheredResponses);


  const validResponses = resultsPromises
    .filter(result => result.status === "fulfilled"
      && result.value.ok); // This is creating an array of valid promises


  // iterate thru valid validResponses
  let triviaFacts = [];
  for (const response of validResponses) {
    const fact = await response.json();
    // grab the text element and add to an array
    triviaFacts.push(fact.text);
  }
  // console log the array
  console.log("showNumberAll fulfilled:", triviaFacts);

  // Log the trivia of the validResponses
  // validResponses.map(response => console.log(response.json().text));
  // validResponses.map(response => console.log(response.value.json()));

  const invalidResponses = resultsPromises
    .filter(result => result.status === "fulfilled"
      && result.value.ok === false);


  let errors = [];
  for (const response of invalidResponses) {
    const error = await response.json();
    errors.push(`${error.status}: ${error.statusText}`);
  }
  // invalidResponses.map(fail => console.log(fail.value.json()));

  console.log("showNumberAll rejected: ", errors);



  // const invalidResponses = results
  //   .filter(result => result.status === "fullfilled"
  //           && result.value.ok === false);

  // Log array of error messages for failed attempts
  //invalidResponses.map(fail => console.log(fail.))

}