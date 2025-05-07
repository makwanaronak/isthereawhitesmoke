# Is There a White Smoke?

A real-time status website that checks if there's white smoke from the Vatican chimney, indicating the election of a new pope.

## Features

- Real-time status updates from environment variables
- Dynamic content based on status
- Responsive design using Tailwind CSS
- Social media sharing integration
- Google Analytics tracking
- Google AdSense integration
- Mobile-first approach

## Setup Instructions

1. Replace placeholder values:
   - Google Analytics ID (`G-XXXXXXXXXX`)
   - Google AdSense client ID (`ca-pub-XXXXXXXXXX`)
   - AdSense ad slot IDs (`XXXXXXXXXX`)
   - Smoke image URLs in `script.js`

2. Set up environment variables in Azure Static Web Apps:
   ```bash
   # Set the SMOKE_STATUS environment variable
   az staticwebapp appsettings set --name your-app-name --setting-names SMOKE_STATUS=black
   ```

   Valid values for SMOKE_STATUS:
   - `white` - A new pope has been elected
   - `black` - No pope elected yet

3. Deploy to Azure Static Web Apps:
   ```bash
   # Install Azure CLI
   npm install -g @azure/static-web-apps-cli

   # Login to Azure
   az login

   # Deploy
   swa deploy
   ```

   Or deploy to GitHub Pages:
   ```bash
   # Create a new repository
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main

   # Enable GitHub Pages in repository settings
   ```

## Development

1. Clone the repository
2. Make changes to the files
3. Test locally using a static file server:
   ```bash
   npx serve
   ```

## File Structure

- `index.html` - Main HTML file
- `styles.css` - Custom CSS styles
- `script.js` - JavaScript for dynamic content
- `api/get-smoke-status/index.js` - API function for status
- `README.md` - This file

## Environment Variables

The website uses the following environment variable:
- `SMOKE_STATUS` - Current status of the Vatican conclave
  - `white` - A new pope has been elected
  - `black` - No pope elected yet

## Maintenance

1. Regularly update the SMOKE_STATUS environment variable
2. Update smoke images if needed
3. Monitor Google Analytics for performance
4. Check AdSense performance and adjust ad placements if necessary

## License

MIT License - Feel free to use and modify as needed. 