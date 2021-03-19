This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### This repository contains code for a public calendar and event-sharing app
![app home page](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.28.49%20AM.png "calendar home page")<br />

The app has the following features and capabilities:

Create public calendars<br />
Create public events within individual calendars<br />
Enter details for individual events<br />
Search calendar repository<br />
Search for event information within individual calendars<br />
View a calendar in month or day mode<br />
Navigate through calendars either chronologically or by typing in month and year<br />
Click on any event to pull up event details<br />
Responsive sizing if the app is opened on a computer, tablet, or phone browser<br />

I began researching authentication and sketched out a rough draft front-end of what an authentication-based system might feel like. I moved on to other projects before implementing the back-end.

Here are some more screenshots to give a sense of the feel of the app.

## Creating a calendar
customize the URL, provide a description and keywords, decide if it's public or private (privacy & authentication structures were never fully implemented in the back-end, but the front end was mostly built out)

![creating a calendar](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.29.35%20AM.png "creating a calendar")<br />

## Calendar view
![calendar view](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.31.13%20AM.png "calendar view")<br />

## Create an event within a calendar
![creating an event](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.31.21%20AM.png "creating an event")<br />

![mini calendar in event creation](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.31.50%20AM.png "mini calendar in event creation")<br />

## After creating an event, it shows up in your calendar
![after creating an event](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.34.19%20AM.png "new events show up in the calendar")<br />

## Drill-down into event details
When you click on an event in the calendar, it pops up a modal with the event details. A unique key is generated for each event and stored in the database -- edit and delete functionality is fully operable with the key.
![drill-down into events](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.34.35%20AM.png "event drill-down")<br />

## Calendar Navigation
Typing a month and year into the text box and hitting return will zip the user to that month. Users can also navigate by clicking the names of the previous or next month.
![calendar navigation](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.35.26%20AM.png "calendar navigation to September 2150")<br />

![September 2150](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.35.36%20AM.png "the calendar for September 2150")<br />

## Clicking on the month and year takes us into Day Mode
When the mouse is over the month and year, it changes color to indicate it can be clicked. When it's clicked, it toggles Day Mode.
![switching to day mode](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.35.45%20AM.png "switching to day mode")<br />

![day mode](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.36.27%20AM.png "day mode")<br />

## Searching a calendar
With lots of events, it's helpful to have a search function. Here's a calendar with three events.
![calendar with three events](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.39.52%20AM.png "calendar with three events")<br />
The Search page shows a scroll-controlled window of all the events in that calendar, plus a search bar. The search bar is responsive to each keystroke and filters out results in real time. Here are some examples...
![search results](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.40.02%20AM.png "search results")
![search results](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.40.16%20AM.png "search results")
![search results](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.40.26%20AM.png "search results")
![search results](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.40.48%20AM.png "search results")
## Back to the home screen
Navigating back to the home screen of the app, we can see the calendar we originally made. With multiple calendars, we can filter them out by title, keyword, description and so forth, the same way we just did with events in a calendar.
![app home page](https://github.com/jsugarmoore/openCalendar/blob/a8118d8637e5bec9fc5fc901473c4eb5af9f21dd/public/Screen%20Shot%202021-03-19%20at%203.41.09%20AM.png "calendar home page")
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
