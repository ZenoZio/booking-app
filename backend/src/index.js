"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("./routers/users"));
const auth_1 = __importDefault(require("./routers/auth"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
mongoose_1.default.connect(process.env.MONGODB_CONNECTION_SRTING);
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.FRONTEND_URLS,
    methods: ['GET', 'POST']
}));
app.use('/api/auth', auth_1.default);
app.use('/api/users', users_1.default);
app.listen(3000, () => {
    console.log("Hello world from the server, localhost:3000");
});
