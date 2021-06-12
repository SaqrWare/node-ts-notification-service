export const mongoConfig = {
    connection: process.env.MONGODB_URI || "mongodb://localhost/notification",
    debug: (process.env.DEBUG_MONGO !== "FALSE")
}