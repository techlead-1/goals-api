import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req, { requested: 1 });

        if (decision.isDenied()) {
            if (decision.reason.isRateLimit()) {
                return res.status(429).json({ error: 'Rate limit exceeded, please try again later.' });
            }

            if (decision.reason.isBot()) {
                return res.status(403).json({ error: 'Bot detected' });
            }

            return res.status(403).json({ error: 'Access Denied' });
        }

        // ✅ Only continue if request is safe
        next();
    } catch (e) {
        console.error(`Arcjet Middleware Error:`, e);

        // Prevent headers-sent crash
        if (!res.headersSent) {
            return res.status(500).json({ error: 'Internal server error (Arcjet)' });
        }

        next(e); // pass error to global error handler
    }
};

export default arcjetMiddleware;