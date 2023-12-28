/** 
Author: Build Rise Shine with Nyros (BRS) 
Created: 2023 
Library / Component: Script file
Description: Speech Synthesis
(c) Copyright by BRS with Nyros. 
**/

/* Get Our Elements */
// Create a SpeechSynthesisUtterance object, used to configure speech synthesis options
//  Interface in the Web Speech API
const msg = new SpeechSynthesisUtterance();

// An array to store available voices
let voices = [];

// Get the elements from the DOM
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.getElementById("speak");
const stopButton = document.getElementById("stop");

// Set the initial text for speech synthesis
msg.text = document.querySelector('[name="text"]').value;

// default theme
let chathams_blue = "#1A4B84";

// Function to populate available voices in the dropdown
function populateVoices() {
// getVoices() method of the SpeechSynthesis interface returns a list of SpeechSynthesisVoic
  voices = this.getVoices(); 
  
  console.log(voices);
  // Filter available voices for English and create options for the dropdown
  voicesDropdown.innerHTML = voices
    .filter((voice) => voice.lang.includes("en"))
    .map(
      (voice) =>
        `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`
    )
    .join("");
}

// Function to set the selected voice for speech synthesis
function setVoice() {
  msg.voice = voices.find((voice) => voice.name === this.value);
  toggle();
}

// Function to cancel and restart speech synthesis
function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(msg);
  }
}

// Function to set options (rate, pitch, etc.) for speech synthesis
function setOption() {
  console.log(this.name, this.value);
  msg[this.name] = this.value; // this.name --> rate or pitch
  toggle();
}

// Event listener for the 'voiceschanged' event, which triggers when the list of available voices is loaded or changes
speechSynthesis.addEventListener("voiceschanged", populateVoices);

// Event listeners for user interactions
voicesDropdown.addEventListener("change", setVoice);
options.forEach((option) => option.addEventListener("change", setOption));

speakButton.addEventListener("click", toggle);
stopButton.addEventListener("click", () => toggle(false));

// Set theme
function setTheme(theme) {
  document.documentElement.style.setProperty("--primary-color", theme);
  localStorage.setItem("movie-theme", theme);
}

// Set the initial theme to the value stored in local storage or the default 'chathams_blue'
setTheme(localStorage.getItem("movie-theme") || chathams_blue);
