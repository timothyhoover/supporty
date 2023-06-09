# Supporty (Help Desk App)

Built with Feathers.js, React.js and Tailwind CSS

### Demo

https://web-production-3b91.up.railway.app/

## Getting Started

1. Make sure you have NodeJS and npm installed.
2. Concurrently install dependencies for client and server.

   ```
   cd <path>/supporty
   npm install
   ```

3. Ensure you have a postgresql downloaded
4. Make a pg database and update the `/server/config/default.js` (postgresql) file with your pg credentials.

5. Run database migration.

   ```
   npm run migrate
   ```

Concurrently start the client and server apps with:
`npm start:dev`

Steps to use that app:

1. Submit a few support tickets via the 'Submit a Ticket' button
2. Create an admin account
3. In the admin dashboard, you should see the various requests and be able to update the status or respond.
4. Alternatively you can open an incognito window to submit tickets and see them show in realtime in the admin dashboard.

### Screenshots

![Home Screen](./app-images/homescreen.png)
![Admin Dashboard](./app-images/admin-dashboard.png)
![Login](./app-images/login.png)
![Admin Dashboard](./app-images/admin-dashboard.png)
![Ticket Response](./app-images/reply-to-ticket.png)
![Submit Ticket](./app-images/submit-ticket.png)
