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