"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();
  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

function putFavoritesOnPage() {
    console.debug("putFavoritesOnPage");
  
    $favoritesList.empty();
  
    // loop through the stories in currentUser.favorites and generate HTML
    for(let favorite of currentUser.favorites) {
      const $favorite = generateStoryMarkup(favorite);
      $favoritesList.append($favorite);
    }
  }
  
  $storyForm.on('submit', async function(event){
    event.preventDefault()
    const title = $("#story-title").val();
    const author = $("#story-author").val();
    const url = $("#story-url").val();
    await StoryList.addStory(currentUser,{title,author,url})
    $storyForm.trigger("reset")
  })
  
  $allStoriesList.on("click", ".far", async function(){
    const id = $(this).parent().attr("id")
    await currentUser.markStoryAsFavorite(id)
    $(this).removeClass("far").addClass("fas")
  })
  
  $allStoriesList.on("click", ".fas", async function(){
    const id = $(this).parent().attr("id")
    await currentUser.unmarkStoryAsFavorite(id)
    $(this).removeClass("fas").addClass("far")
  })
  
  $allStoriesList.on("click", ".delete", async function(){
    const id = $(this).parent().attr("id")
    await currentUser.removeOwnStory(id)
    $(this).parent().remove()
    alert("YOUR STORY SHOULD NOW BE DELETED")
  })
  