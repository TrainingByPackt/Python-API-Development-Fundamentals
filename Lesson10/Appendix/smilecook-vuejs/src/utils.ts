// require('dotenv').config();

// const apiUrl = require('../package.json').apiUrl

export function APIHost(): string {
  if (process.env.NODE_ENV === 'production') {
    return 'https://cors-anywhere.herokuapp.com/' + process.env.VUE_APP_API_URL
  } else {
    return '/api/'
  }  
}
