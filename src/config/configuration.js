if(process.env.MODE === 'dev') {
    const dotenv = require('dotenv');
    dotenv.config();
}

export default {
    env: 'DEV',
    port: 3000,
    errors: require("./configErrors"),
    db: {
        mongodb: {
            connectionStr: process.env.MONGODB || "mongodb://<dbuser>:<dbpassword>@<mongoDomain>:<mongoPort>/api"
        }
    }
};