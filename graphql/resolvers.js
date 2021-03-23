module.exports = {
    hello() {
        return {
            text: 'Hellow World!',
            counter: '123'
        }
    },

    createUser({ userInput }, req) {
        const email = userInput.email;
        // create use robject, save it to the database, handle database errors
        return {
            _id: 'user1',
            name: 'user1 name',
            email: 'user1@email.com',
            password: 'user1pwd',
            status: 'new'
        }
    }
};