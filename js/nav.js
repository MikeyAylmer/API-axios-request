"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// 
function navSubmitClick(evt){
    console.debug("navSubmitClick", evt)
    hidePageComponents()
    $storyForm.show()
}

$body.on('click', '#nav-submit', navSubmitClick);


// function navFavClick(evt) {
//     console.debug("navFavClick", evt)
//     hidePageComponents()
//     $favoritesList.show()
//   }
  
//   $body.on("click", "#nav-favorites", navFavClick)
  
function navFavoritesClick(evt) {
    console.debug("navFavoritesClick", evt)
    hidePageComponents()
    $favoritesList.show()
  }
  
  $body.on("click", "#nav-favorites", navFavoritesClick)