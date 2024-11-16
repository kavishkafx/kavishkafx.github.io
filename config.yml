<!-- layouts/_default/hackernews.html -->
{{ define "main" }}
<div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">{{ .Title }}</h1>
    
    <!-- Container for Hacker News stories -->
    <div id="hackernews-stories" class="space-y-6">
        <!-- Stories will be loaded here -->
    </div>
</div>

<!-- Include the JavaScript -->
<script>
// Configuration
const API_BASE_URL = 'https://hacker-news.firebaseio.com/v0';
const STORIES_TO_FETCH = 10;

// Fetch stories from Hacker News API
async function fetchHackerNewsStories() {
    try {
        const storiesContainer = document.getElementById('hackernews-stories');
        if (!storiesContainer) {
            console.error('Stories container element not found');
            return;
        }

        // Show loading state
        storiesContainer.innerHTML = '<div class="loading">Loading stories...</div>';

        const response = await fetch(`${API_BASE_URL}/newstories.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const storyIds = await response.json();
        const stories = await Promise.all(
            storyIds
                .slice(0, STORIES_TO_FETCH)
                .map(id => fetchStory(id))
        );

        // Filter out any null results from failed story fetches
        const validStories = stories.filter(story => story !== null);
        displayStories(validStories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        document.getElementById('hackernews-stories').innerHTML = 
            '<div class="error">Error loading stories. Please try again later.</div>';
    }
}

// Fetch individual story details
async function fetchStory(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/item/${id}.json`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const story = await response.json();
        return story;
    } catch (error) {
        console.error(`Error fetching story ${id}:`, error);
        return null;
    }
}

// Display stories in the container
function displayStories(stories) {
    const storiesContainer = document.getElementById('hackernews-stories');
    
    if (stories.length === 0) {
        storiesContainer.innerHTML = '<div class="no-stories">No stories available at the moment.</div>';
        return;
    }

    const storiesHTML = stories.map(story => {
        // Handle cases where story.url might be undefined (like for Ask HN posts)
        const title = story.title || 'Untitled';
        const url = story.url || `https://news.ycombinator.com/item?id=${story.id}`;
        const timestamp = new Date(story.time * 1000).toLocaleString();
        
        return `
            <div class="story bg-white p-4 rounded shadow">
                <h2 class="text-xl font-semibold">
                    <a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800">
                        ${title}
                    </a>
                </h2>
                <p class="text-gray-600 mt-2">
                    By ${story.by || 'anonymous'} | ${story.score || 0} points | ${timestamp}
                </p>
            </div>
        `;
    }).join('');

    storiesContainer.innerHTML = storiesHTML;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', fetchHackerNewsStories);

// Add refresh functionality
function addRefreshButton() {
    const button = document.createElement('button');
    button.textContent = 'Refresh Stories';
    button.className = 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4';
    button.onclick = fetchHackerNewsStories;
    document.getElementById('hackernews-stories').before(button);
}

document.addEventListener('DOMContentLoaded', addRefreshButton);
</script>

<!-- Add some basic styles -->
<style>
.loading {
    padding: 1rem;
    text-align: center;
    color: #666;
}

.error {
    padding: 1rem;
    text-align: center;
    color: #ff0000;
    background-color: #fff;
    border: 1px solid #ff0000;
    border-radius: 0.25rem;
}

.no-stories {
    padding: 1rem;
    text-align: center;
    color: #666;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 0.25rem;
}

.story {
    transition: transform 0.2s;
}

.story:hover {
    transform: translateY(-2px);
}
</style>
{{ end }}