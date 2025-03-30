import arcjet, { shield, detectBot, tokenBucket } from "@arcjet/node";
import {ARCJET_KEY, ARCJET_ENV} from "./env.js";

const aj = arcjet({
    key: ARCJET_KEY,
    env: ARCJET_ENV || "development",
    characteristics: ["ip.src"],
    rules: [
        shield({ mode: "LIVE" }),
        detectBot({
            mode: "LIVE",
            allow: [
                "CATEGORY:SEARCH_ENGINE",
                "TOOL:POSTMAN",
                "TOOL:CURL",
                "CATEGORY:DEVELOPER", // general dev tools
                "LIBRARY:FETCH" // modern fetch-based requests (like from frontend)
            ],        }),        tokenBucket({
            mode: "LIVE",
            refillRate: 5, // Refill 5 tokens per interval  
            interval: 10, // Refill every 10 seconds  
            capacity: 10, // Bucket capacity of 10 tokens  
        }),
    ],});

export default aj;