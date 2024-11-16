async function fetchHackerNewsStories() {
    const response = await fetch('https://hacker-news.firebaseio.com/v0/newstories.json');
    const storyIds = await response.json();
    const stories = await Promise.all(storyIds.slice(0, 10).map(fetchStory));
    displayStories(stories);
}

async function fetchStory(id) {
    const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
    return response.json();
}

function displayStories(stories) {
    const storiesContainer = document.getElementById('hackernews-stories');
    storiesContainer.innerHTML = stories.map(story => `
        <div class="story">
            <h2><a href="${story.url}" target="_blank">${story.title}</a></h2>
            <p>By ${story.by} | ${story.score} points | ${new Date(story.time * 1000).toLocaleString()}</p>
        </div>
    `).join('');
}

document.addEventListener('DOMContentLoaded', fetchHackerNewsStories);