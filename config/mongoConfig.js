"use strict";
exports.__esModule = true;
exports.mongoConfig = void 0;
exports.mongoConfig = {
    connection: process.env.MONGODB_URI || "mongodb://localhost/notification",
    debug: (process.env.DEBUG_MONGO !== "FALSE")
};
