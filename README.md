# Fetch Frontend Takehome
## Intro
Hey, I'm [Matt Vaccaro, a Product Engineer](https://www.mattvaccaro.dev/) from Houston, Texas! Stoked for you to review my work. The app is a fairly simple React app with two screens: auth and home. All data handling is managed through actions and loaders. You can learn more about this in the [React Router Docs](https://reactrouter.com/start/modes).

## Setup

1. Setup the node modules like any old react app
```bash
npm install
```

2. Start the app up!
```bash
npm run dev
```
I would include some unit and E2E tests in a project, but I ran out of time 🤷.


## Using the app
On the auth screen, just enter a name and a valid email. A cookie will then be added to your browser.

The search feature allows you to add any number of breeds and get results. You can favorite any pup by clicking the ❤️ button, which stores it in local storage. You can manage your favorites by clicking "Edit Favorites" and selecting the X on any pup you're no longer interested in. Lastly, clicking "Show Match" will reveal which pup is destined to be your new friend.

## Final Thoughts
I'm pretty happy with how this little app turned out given the time I had. There are a few things I wish I could have spent more time on:

**Zod schema and types**– Implementing strong types for all data between the client and server.

**Improved hydration** – Right now, every small change forces the actions to run again, which isn’t very optimal.

**Loading and prefetching** – The loading states are a bit rough and could be improved by implementing prefetching (which might eliminate them entirely).

**Mobile design improvements** – The mobile UI could use some more refinement.
