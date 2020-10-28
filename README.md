This project was created for demonstration purposes. The UI for this application was taken from https://github.com/drehimself/laravel-movies-example
![movie_react_app1](https://user-images.githubusercontent.com/29778020/97429458-35e2a780-18f6-11eb-8b8d-debc9ee85113.png)

## MovieDb React App
This application allows users to see information about popular shows and movies. The data is provided by
[TheMovieDatabase](https://www.themoviedb.org/) Api service. 
This application was made with the following tools/ npm packages:

1. [Create-react App](https://github.com/facebook/create-react-app) to bootstrap [ReactJS](https://github.com/facebook/react/)
2. [TailwindCss](https://github.com/tailwindlabs/tailwindcss) for the UI
3. [PostCss](https://github.com/postcss/postcss) to process CSS
4. [React-loading-skeleton](https://github.com/dvtng/react-loading-skeleton) to add loading indicators
5. [Axios](https://github.com/axios/axios)

### Architecture
while the majority of the components used in the application are function based the components used as the pages
and the main App component are class based. Converting the entire application to function based using React Hooks will
be done at a later date.


### Todo
1. Update UI
2. Convert remaining class based application to function based using [React Hooks](https://reactjs.org/docs/hooks-intro.html)
3. Add State management for better performance using [Redux](https://redux.js.org/) or MobX(https://mobx.js.org/README.html)
4. Make the application more responsive
5. Add Search functionality to top searchbar
6. Complete Search/filter functionality to browse page
