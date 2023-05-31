

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);


function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);



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

  
function navFavoritesClick(evt) {
    console.debug("navFavoritesClick", evt)
    hidePageComponents()
    $favoritesList.show()
  }
  
  $body.on("click", "#nav-favorites", navFavoritesClick)
