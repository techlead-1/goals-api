import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 })
        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) res.status(429).json({error: 'Rate limit exceeded, please try again later.'})
            if (decision.reason.isBot()) res.status(403).json({error: 'Bot detected'})

            res.status(403).json({error: 'Access Denied'})
        }
        next()
    } catch (e) {
        console.error(`Arcjet Middleware Error: ${e}`);
        next(e);
    }
}

export default arcjetMiddleware;