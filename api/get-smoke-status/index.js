module.exports = async function (context, req) {
    // Get the smoke status from environment variable
    const smokeStatus = process.env.SMOKE_STATUS || 'black';

    context.res = {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
        },
        body: {
            smokeStatus: smokeStatus
        }
    };
}; 
