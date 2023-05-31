"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";


class Story {

  constructor({ storyId, title, author, url, username, createdAt }) {
    this.storyId = storyId;
    this.title = title;
    this.author = author;
    this.url = url;
    this.username = username;
    this.createdAt = createdAt;
  }

  getHostName() {
    let hostStart;
    if ((this.url).includes('//')){
      hostStart = (this.url).indexOf('//') + 2;
    } else {
      hostStart = (this.url).indexOf(':') + 1;
    };
    const hostEnd = (this.url).indexOf('.com') + 4;
    const hostName = (this.url).slice(hostStart,hostEnd);
    return hostName;
  }
}

class StoryList {
  constructor(stories) {
    this.stories = stories;
  }

  static async getStories() {

    const response = await axios({
      url: `${BASE_URL}/stories`,
      method: "GET",
    });

 
    const stories = response.data.stories.map(story => new Story(story));

   
    return new StoryList(stories);
  }

  

 static async addStory( user, newStory) {
    // UNIMPLEMENTED: complete this function!
    const {title, author, url} = newStory;
    const res = await axios({
      method: "POST",
      url: `${BASE_URL}/stories`,
      data: {token: user.loginToken, story: {author, title, url}}
    })
   const story = res.data.story
   return new Story(story)
}

}



class User {
    constructor({
                username,
                name,
                createdAt,
                favorites = [],
                ownStories = []
              },
              token) {
    this.username = username;
    this.name = name;
    this.createdAt = createdAt;

    // instantiate Story instances for the user's favorites and ownStories
    this.favorites = favorites.map(s => new Story(s));
    this.ownStories = ownStories.map(s => new Story(s));

    // store the login token on the user so it's easy to find for API calls.
    this.loginToken = token;
  }

  

  static async signup(username, password, name) {
    const response = await axios({
      url: `${BASE_URL}/signup`,
      method: "POST",
      data: { user: { username, password, name } },
    });

    let { user } = response.data

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

 

  static async login(username, password) {
    const response = await axios({
      url: `${BASE_URL}/login`,
      method: "POST",
      data: { user: { username, password } },
    });

    let { user } = response.data;

    return new User(
      {
        username: user.username,
        name: user.name,
        createdAt: user.createdAt,
        favorites: user.favorites,
        ownStories: user.stories
      },
      response.data.token
    );
  }

  
  static async loginViaStoredCredentials(token, username) {
    try {
      const response = await axios({
        url: `${BASE_URL}/users/${username}`,
        method: "GET",
        params: { token },
      });

      let { user } = response.data;

      return new User(
        {
          username: user.username,
          name: user.name,
          createdAt: user.createdAt,
          favorites: user.favorites,
          ownStories: user.stories
        },
        token
      );
    } catch (err) {
      console.error("loginViaStoredCredentials failed", err);
      return null;
    }
  }
  /**Marks a story as one of the user's favs*/
  async markStoryAsFav(storyId) {
    console.debug("markStoryAsFav")
    await axios({
      url: `https://hack-or-snooze-v3.herokuapp.com/users/${this.username}/favorites/${storyId}`,
      method: "POST",
      data: {token: this.loginToken}
    })
  }
  
  /**Unlists a given fav story*/
  async unmarkStoryAsFav(storyId) {
    console.debug("unmarkStoryAsFav")
    await axios({
      url: `https://hack-or-snooze-v3.herokuapp.com/users/${this.username}/favorites/${storyId}`,
      method: "DELETE",
      data: {token: this.loginToken}
    })
  }

  /**Deletes a story*/
  async removeOwnStory(storyId) {
    console.debug("removeOwnStory")
    await axios({
      url: `https://hack-or-snooze-v3.herokuapp.com/stories/${storyId}`,
      method: "DELETE",
      data: {token: this.loginToken}
    })
  }
}
  
