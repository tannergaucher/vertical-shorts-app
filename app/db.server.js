"use strict";
exports.__esModule = true;
exports.prisma = void 0;
var client_1 = require("@prisma/client");
var prisma;
exports.prisma = prisma;
// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
// in production we'll have a single connection to the DB.
if (process.env.NODE_ENV === "production") {
    exports.prisma = prisma = new client_1.PrismaClient();
}
else {
    if (!global.__db__) {
        global.__db__ = new client_1.PrismaClient();
    }
    exports.prisma = prisma = global.__db__;
    prisma.$connect();
}
