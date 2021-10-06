//
/**/

function displayContent (eventId, eventValue) {
  document.getElementById(eventId).style.display = eventValue
}
function displayInnerHTML (eventId, eventValue) {
  document.getElementById(eventId).innerHTML = eventValue
}
function addOpacity (eventId, eventValue) {
  document.getElementById(eventId).style.opacity = eventValue
}

// DOM elements
const allGridBoxes = document.querySelectorAll(".grid_box")
//
const setPlayerNameBtn = document.getElementById("set_player_name_btn")
const resetGameScoreBtn = document.getElementById("reset_game_score_btn")
const changePlayersBtn = document.getElementById("change_players_btn")
const aboutGameBtn = document.getElementById("about_game_btn")
const closeAboutGameBtn = document.getElementById("close_about_game_btn")
const exitGameBtn = document.getElementById("exit_game_btn")
// Name 
const playerOneName = document.getElementById("player_one_name")
const playerTwoName = document.getElementById("player_two_name")
// Score
let playerOneScore = 1
let playerTwoScore = 0
// Booleans
let playerOneBoolean = false
// Text Values
let playerOneText = "x"
let playerTwoText = "o"


// Possible wining ways array of objects
const allPossibleWinningWays = [
  { firstValue: "top_left", secondValue: "top_middle", thirdValue: "top_right" },                              
  { firstValue: "top_left", secondValue: "middle_middle", thirdValue: "bottom_right" },                              
  { firstValue: "top_left", secondValue: "middle_left", thirdValue: "bottom_left" },                              
  { firstValue: "top_middle", secondValue: "middle_middle", thirdValue: "bottom_middle" },                              
  { firstValue: "top_right", secondValue: "middle_right", thirdValue: "bottom_right" },                              
  { firstValue: "top_right", secondValue: "middle_middle", thirdValue: "bottom_left" },                              
  { firstValue: "middle_left", secondValue: "middle_middle", thirdValue: "middle_right" },                              
  { firstValue: "bottom_left", secondValue: "bottom_middle", thirdValue: "bottom_right" }                              
]


document.querySelector("body").onload = () => {
  addOpacity("game_container", .1)
  displayContent("player_names", "block")
}

// Functions 
//  A function to start making move
function makeMoveFunction () {
  // Loop through all grid boxes
  allGridBoxes.forEach(eachGridBox => {
    // Click on each grid box
    eachGridBox.onclick = () => {
      // Return if the clicked space is not empty
      if (eachGridBox.innerText) return 
      // Check for players turn 
      playerOneBoolean == false ? playerOneBoolean = true : playerOneBoolean= false
      // Display innerText in box
      eachGridBox.innerText = playerOneBoolean ? playerOneText : playerTwoText
      // Update players turn
      updatePlayersTurnFunction()
      
      allPossibleWinningWays.forEach(eachPossibleWinningWay => {
        let firstValue = eachPossibleWinningWay.firstValue
        let secondValue = eachPossibleWinningWay.secondValue
        let thirdValue = eachPossibleWinningWay.thirdValue
    
        let firstGridBoxInnerText = document.getElementById(firstValue).innerText
        let secondGridBoxInnerText = document.getElementById(secondValue).innerText
        let thirdGridBoxInnerText = document.getElementById(thirdValue).innerText
        
        if (firstGridBoxInnerText && firstGridBoxInnerText == secondGridBoxInnerText && firstGridBoxInnerText == thirdGridBoxInnerText) {
          if (firstGridBoxInnerText == playerOneText) playerOneScore += 1
          if (firstGridBoxInnerText == playerTwoText) playerTwoScore += 1
            updatePlayersScoreFunction()
            return clearAllGridBoxContentFunction()
        }
      })
      // Call this function to check current game is a draw
      return checkForDrawFunction()
    }
  })
}
// Call the makeMoveFunction
makeMoveFunction()
// Clear all game innerText
function clearAllGridBoxContentFunction () {
  allGridBoxes.forEach(eachGridBox => {
    eachGridBox.innerText = ""
  })
}
// Update and display players score
function updatePlayersScoreFunction () {
  displayInnerHTML("player_one_score", ` <span class="big_font_2">  ${playerOneName.value}'s (${playerOneText}) Score </span> : <span class="big_font_1"> ${playerOneScore} </span> `)                                                                                            //
  displayInnerHTML("player_two_score", ` <span class="big_font_2"> ${playerTwoName.value}'s (${playerTwoText})  Score </span> : <span class="big_font_1"> ${playerTwoScore} </span> `)
}
// Check if game is a tie
function checkForDrawFunction () {
  // Check if any field id empty and return
  if (!document.getElementById("top_left").innerText) return 
  if (!document.getElementById("top_middle").innerText) return 
  if (!document.getElementById("top_right").innerText) return 
  if (!document.getElementById("middle_left").innerText) return 
  if (!document.getElementById("middle_middle").innerText) return 
  if (!document.getElementById("middle_right").innerText) return 
  if (!document.getElementById("bottom_left").innerText) return 
  if (!document.getElementById("bottom_middle").innerText) return 
  if (!document.getElementById("bottom_right").innerText) return 

  alert("Game is a tie 😄😄")
  // Clear all fields if game is a draw
  clearAllGridBoxContentFunction()
}
// Reset game function
function resetGameScoreFunction () {
  playerOneScore = 0
  playerTwoScore = 0
  playerOneBoolean = false
  updatePlayersTurnFunction()
  updatePlayersScoreFunction()
  clearAllGridBoxContentFunction()
}
// Check next players turn and display it to the gamers 
function updatePlayersTurnFunction () {
  if (playerOneBoolean) {
    displayInnerHTML("players_turn", ` <span class="big_font_2"> ${playerTwoName.value}'s (${playerTwoText}) </span> turn`)
  } else {
    displayInnerHTML("players_turn", ` <span class="big_font_2"> ${playerOneName.value}'s (${playerOneText}) </span> turn`)
  }
}
// Display player name modal box function
function changePlayerNamesFunction () {
  let confirmNewSetOfPlayers = confirm("Are you sure you want to change players and restart game?")
  if (confirmNewSetOfPlayers) {
    addOpacity("game_container", .1)
    displayContent("player_names", "block")
  } else return
}
// Set new player name and start new game function
function startNewGameFunction () {
  if (!playerOneName.value || !playerTwoName.value) return alert("Check for empty input field")
  if (playerOneName.value.length < 3) return alert("Player One name cannot be less than three (3) character")
  if (playerTwoName.value.length < 3) return alert("Player Two name cannot be less than three (3) character")
  if (playerOneName.value == playerTwoName.value) return alert("Player Names can't be the same")
  
  addOpacity("game_container", 1)
  displayContent("player_names", "none")
  resetGameScoreFunction()
}


// Onclick events
// Reset game button
resetGameScoreBtn.onclick = () => {
  let confirmReset = confirm("Are you sure you want to reset your score?")
  if (confirmReset) {
    resetGameScoreFunction()
  } else return 
}
// Change player button
changePlayersBtn.onclick = () => changePlayerNamesFunction() 
// Set new player button
setPlayerNameBtn.onclick = () => startNewGameFunction() 
// About game button
aboutGameBtn.onclick = () => {
  displayContent("about_game", "block")
  addOpacity("game_container", .1)
}
// Close about game modal box button
closeAboutGameBtn.onclick = () => {
  displayContent("about_game", "none")
  addOpacity("game_container", 1)
}
// Exit game button
exitGameBtn.onclick = () => {
  let confirmExit = confirm("Are you sure you want to exit this game?")
  if (confirmExit) {
    alert("Game reset activated ... We don't want you to leave our page 🌚🌚... Thank you 🤗🤗... We love you 💖💖")
    resetGameScoreFunction()
  } else return 
}







/**/