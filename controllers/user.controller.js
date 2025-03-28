export const getProfile = async (req, res, next) => {
    try {
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
        let user = req.user;
        const { name, profession } = req.body;

        if (name) user.name = name;
        if (profession) user.profession = profession;
        await user.save()

        res.status(200).json({
            success: true,
            message: 'Profile Updated Successfully',
            data: {
                user: user
            }
        })
    } catch (e) {
        next(e);
    }
}