import { h, app } from 'hyperapp'

const stories = [{
  title: "The Ocean is Sinking",
  author: "Kat Stropher",
}, {
  title: "Ocean life is brutal",
  desc: `
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat.
    `,
  author: "Surphy McBrah",
}, {
  title: "Family friendly fun at the ocean exhibit",
  author: "Guy Prosales"
}]

const init = {
  filter: '',
  filtering: false,
  stories,
  story: stories[0],
  autoUpdate: false
}

const emphasize = (word, string) => (
  string.split(" ").map(w => w.toLowerCase() === word.toLowerCase() ? <strong>{w} </strong> : `${w} `)
)

const StartFiltering = (state) => ({ ...state, filter: '', filtering: true })
const StopFiltering = (state) => ({ ...state, filtering: false })
const changeFilter = (state, event) => ({ ...state, filter: event.target.value })

const FilterComponent = (state) => (
  <div class="filter">
    Filter: {state.filtering ? <input oninput={changeFilter} /> : <span>{state.filter}</span>}
    <button onclick={state.filtering ? StopFiltering : StartFiltering}>&#9998;</button>
  </div>
)

const StoryClick = (state, story) => {
  return { ...state, story }
}

const StoriesComponent = (state) => (
  <div class="stories">
    <ul>
      {state.stories.map(story => (
        <li onclick={[StoryClick, story]} class={story === state.story ? 'reading' : 'unread'}>
          <p class="title">{emphasize(state.filter, story.title)}</p>
          <p class="author">{emphasize(state.filter, story.author)}</p>
        </li>
      ))}
    </ul>
  </div>
)

const StoryComponent = (state) => (
  <div class="story">
    <h1>{state.story.title}</h1>
    <p>{state.story.desc}</p>
    <p class="signature">{state.story.author}</p>
  </div>
)

const SetAutoUpdate = (state, event) => ({ ...state, autoUpdate: event.target.checked })

const view = state => (
  <div class="container">
    {FilterComponent(state)}
    {StoriesComponent(state)}
    {StoryComponent(state)}
    <div class="autoupdate">
      Auto update: <input type="checkbox" onclick={SetAutoUpdate} />
    </div>
  </div >
);

app({ init, view, node: document.getElementById("app") });
