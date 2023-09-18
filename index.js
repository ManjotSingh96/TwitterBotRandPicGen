require("dotenv").config({ path: __dirname + "/.env" });
const { twitterClient } = require("./twitterClient.js");
const CronJob = require("cron").CronJob;
const express = require('express')
const { download } = require("./utilities");

const app = express()
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})


const tweet = async () => {

    const uri = "https://picsum.photos/200/300";
    const filename = "image.png";

    download(uri, filename, async function(){
        try {
            const mediaId = await twitterClient.v1.uploadMedia("./image.png");
            console.log(mediaId)
            await twitterClient.v2.tweet({
                text: "Hello world! This is an image of something!!",
                media: {
                    media_ids: [mediaId]
                }
            });
        } catch (e) {
            console.log(e)
        }
    });
}


const interval = setInterval(tweet, 1800000);

// To stop the interval at some point, you can use:
// clearInterval(interval);

