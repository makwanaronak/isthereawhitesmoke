const axios = require('axios');
const xml2js = require('xml2js');

module.exports = async function (context, req) {
    try {
        // Fetch RSS feed
        const response = await axios.get('https://www.vaticannews.va/en.rss.xml');
        const parser = new xml2js.Parser();
        
        // Parse XML to JSON
        const result = await parser.parseStringPromise(response.data);
        
        // Extract and format news items
        const newsItems = result.rss.channel[0].item.map(item => ({
            title: item.title[0],
            description: item.description[0].replace(/<[^>]*>/g, ''), // Remove HTML tags
            link: item.link[0],
            pubDate: new Date(item.pubDate[0]).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        })).slice(0, 5); // Get only the 5 most recent items

        context.res = {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
            },
            body: {
                news: newsItems
            }
        };
    } catch (error) {
        context.res = {
            status: 500,
            body: {
                error: 'Failed to fetch Vatican News'
            }
        };
    }
}; 