"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.default = router;
const index_1 = require("../Controllers/index");
const index_2 = require("../Util/index");
router.get('/', index_1.DisplayHomePage);
router.get('/home', index_1.DisplayHomePage);
router.get('/about', index_1.DisplayAboutPage);
router.get('/resume', index_1.DisplayResumePage);
router.get('/projects', index_1.DisplayProjectsPage);
router.get('/services', index_1.DisplayServicesPage);
router.get('/contact', index_1.DisplayContactPage);
router.get('/contacts-list', index_2.AuthGuard, index_1.DisplayListPage);
router.get('/login', index_1.DisplayLoginPage);
router.post('/login', index_1.ProcessLoginPage);
router.get('/register', index_1.DisplayRegisterPage);
router.post('/register', index_1.ProcessRegisterPage);
router.get('/logout', index_1.ProcessLogoutPage);
router.get('/add', index_2.AuthGuard, index_1.DisplayAddPage);
router.post('/add', index_2.AuthGuard, index_1.ProcessAddPage);
router.get('/update/:id', index_2.AuthGuard, index_1.DisplayUpdatePage);
router.post('/update/:id', index_2.AuthGuard, index_1.ProcessUpdatePage);
router.get('/delete/:id', index_2.AuthGuard, index_1.ProcessDeletePage);
//# sourceMappingURL=index.js.map