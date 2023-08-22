//////////////Functions to further process the data to meet my needs///////////////////////////////

//changing degrees to compass directions////////////////////////
function degreesToCompassDirection(degrees) {
  const directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
    "North",
  ];
  const index = Math.round((degrees % 360) / 45);
  return directions[index];
}

//Rounding temp numbers/////////////////
function RoundTheTemp(Fahrenheit) {
  return Math.round(Fahrenheit);
}

////Converting unix time into 24 hour am pm time////////////////
function convertUnixTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); //unix is in seconds, I convert to milliseconds, JS's Date object expects Milliseconds not seconds
  let hours = date.getHours(); //getting the hours, by default it is in 24 hour format
  const minutes = "0" + date.getMinutes(); //getting the minoutes , adding a 0 to before the number to ensure we alway get 2 digits (9 =>09)
  const suffix = hours >= 12 ? "PM" : "AM"; //if number is after 12, then the string PM will be rendered, if not, then AM is rendered
  hours = hours % 12 || 12; // Converting the 24 hour format to 12 hour format

  return `${hours}:${minutes.substr(-2)} ${suffix}`; //subracting 2 will get the last 2 characters of the string( if I didnt include this then 1:45 PM would show up as 1:04 PM, since I added a 0 to every minute string earlier)
}

//////////////////////////////////////////////////////////////////////////////////////////////////

export { convertUnixTime, degreesToCompassDirection, RoundTheTemp };
