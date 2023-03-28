import { app } from './src/app'

// Load our database connection info from the app configuration
const config = app.get('postgresql')

module.exports = config
