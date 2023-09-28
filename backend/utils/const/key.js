const mysqlKey = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
    port: process.env.port
}

const sessionOptions = {
    secret: process.env.secretKey

}
const hello = "hol"
module.exports = {
    mysqlKey,
    sessionOptions
}