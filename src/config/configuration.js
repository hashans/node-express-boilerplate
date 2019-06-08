if(process.env.MODE === 'dev') {
    const dotenv = require('dotenv');
    dotenv.config();
}

export default {
    env: 'DEV',
    port: 3000,
    errors: require("./configErrors"),
    bcryptSecret: "N's!)N8B2_Q^#bv'O<UUQe]A}~niQd",
    db: {
        mongodb: {
            connectionStr: process.env.MONGODB || "mongodb://<dbuser>:<dbpassword>@<mongoDomain>:<mongoPort>/api"
        }
    },
    collection: {
        user: "User"
    }
};