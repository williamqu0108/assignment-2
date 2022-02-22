/*
* Author         : Haoren Qu
* Date           : Feb 20, 2022
* Description    : Assignment 2 for COMP229
*/
import express from 'express';
const router = express.Router();
export default router;

//instantiate an object of type index controller
import {DisplayHomePage, DisplayAboutPage, DisplayProjectsPage,
DisplayResumePage, DisplayContactPage, DisplayServicesPage, DisplayListPage,
DisplayLoginPage, DisplayRegisterPage, ProcessLogoutPage, ProcessLoginPage, 
ProcessRegisterPage, DisplayUpdatePage, ProcessUpdatePage,
ProcessDeletePage, DisplayAddPage, ProcessAddPage } from '../Controllers/index';

import { AuthGuard } from '../Util/index';

/* GET home page. */
router.get('/', DisplayHomePage);

/* GET home page. */
router.get('/home', DisplayHomePage);

/* GET about page. */
router.get('/about', DisplayAboutPage);

/* GET resume page. */
router.get('/resume', DisplayResumePage);

/* GET projects page. */
router.get('/projects', DisplayProjectsPage);

/* GET services page. */
router.get('/services', DisplayServicesPage);

/* GET contact page. */
router.get('/contact', DisplayContactPage);

/* GET contact list page. */
router.get('/contacts-list', AuthGuard, DisplayListPage);

/* GET display login page. */
router.get('/login', DisplayLoginPage);

/* Post process login page */
router.post('/login', ProcessLoginPage);

/* GET display register page. */
router.get('/register', DisplayRegisterPage);

/* Post process login page */
router.post('/register', ProcessRegisterPage);

/*Get logout page */
router.get('/logout', ProcessLogoutPage);

/*GET display /contacts-list/add page */
router.get('/add', AuthGuard, DisplayAddPage);

/*POST process /contacts-list/add page */
router.post('/add', AuthGuard, ProcessAddPage);

/*GET display update/:id page - with /contacts-list/update:id */
router.get('/update/:id', AuthGuard, DisplayUpdatePage);

/*POST process /contacts-list/update/:id page */
router.post('/update/:id', AuthGuard, ProcessUpdatePage);

/*GET Process /contacts-list/delete/:id */
router.get('/delete/:id', AuthGuard, ProcessDeletePage);

//module.exports = router;
