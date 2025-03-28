export const getProfile = async (req, res, next) => {
    try {
        if (!req.user) {
            let error = new Error('User Not Found');
            error.status = 404;
            throw error
        }

        const user = req.user;
        res.status(200).json({
            success: true,
            message: 'User Profile Found',
            data: {
                user: user
            }
        })
    } catch (e) {
        next(e);
    }
}

export const updateProfile = async (req, res, next) => {
    try {

    } catch (e) {
        next(e);
    }
}