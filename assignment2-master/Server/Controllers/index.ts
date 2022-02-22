import express, {Request, Response, NextFunction} from 'express';
import fs from 'fs';

import passport from 'passport';

//create an instance of the User Model
import User from '../Models/user';

//get a reference to the Contact Model Class
import ContactList from '../Models/contacts';

//import Util Functions
import { UserDisplayName } from '../Util';
import { NativeError } from 'mongoose';

export function DisplayHomePage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Home', page: 'home', displayName: UserDisplayName(req) });
}

export function DisplayAboutPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'About', page: 'about', displayName: UserDisplayName(req) });
}

export function DisplayProjectsPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Projects', page: 'projects', displayName: UserDisplayName(req) });
}

export function DisplayServicesPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Services', page: 'services', displayName: UserDisplayName(req) });
}

export function DisplayContactPage(req: Request, res: Response, next: NextFunction): void
{
    res.render('index', { title: 'Contact Me', page: 'contact', displayName: UserDisplayName(req) });
}

export function DisplayResumePage(req: Request, res: Response, next: NextFunction): void
{
    let filePath = 'Client/Assets/pdf/Resume.pdf';
    fs.readFile(filePath, function (err,data){
    res.contentType("application/pdf");
    res.send(data);
  });
}

/*functions for authentication */
export function DisplayLoginPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Login', page: 'login', messages: req.flash('loginMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/contacts-list');
}

export function ProcessLoginPage(req: Request, res: Response, next: NextFunction): void
{
    passport.authenticate('local', (err, user, info) =>
    {
        //are there any serer errors?
        if(err)
        {
            console.error(err);
            return next(err);
        }

        //are there any login errors?
        if(!user)
        {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }

        req.login(user, (err) => 
        {
            // are there any db errors?
            if(err)
            {
                console.error(err);
                return next(err);
            }
            return res.redirect('/contacts-list');
        });
    })(req, res, next);
}

export function DisplayRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    if(!req.user)
    {
        return res.render('index', { title: 'Register', page: 'register', messages: req.flash('registerMessage'), displayName: UserDisplayName(req) });
    }

    return res.redirect('/contacts-list');
}

export function ProcessRegisterPage(req: Request, res: Response, next: NextFunction): void
{
    //instantiate new UserObject
    let newUser = new User
    ({
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        displayName: req.body.firstName + " " + req.body.lastName
    });

    User.register(newUser, req.body.password, (err) =>
    {
        if(err)
        {
            console.error('Error: Inserting New User');
            if(err.name == "UserExistsError")
            {               
                console.error('Error: User Already Exists');
            }
            req.flash('registerMessage', 'Registration Error');

            return res.redirect('/register');
        }

        //after successful registration - let's login the user
        return passport.authenticate('local')(req, res, () =>
        {
            return res.redirect('/contacts-list')
        });
    });
}

export function ProcessLogoutPage(req: Request, res: Response, next: NextFunction): void
{
    req.logout();

    res.redirect('/login');
}

//Read in CRUD
export function DisplayListPage(req: Request, res: Response, next: NextFunction): void
{
    //db.list.find()
    ContactList.find((err, contactCollection) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        } 

        res.render('index', { title: 'Contacts List', page: 'contacts-list', list: contactCollection, displayName: UserDisplayName(req) });      
    }).sort({name:'1'});
}

//Display Update Page
export function DisplayUpdatePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    //pass the id to the db 

    //db.list.find({"_id": id})
    ContactList.findById(id, {}, {}, (err, contactsToUpdate) =>
    {
        if(err)
        {
            console.error(err);
            res.end(err);
        }

        //show the update view
        res.render('index', { title: 'Update', page: 'update', list: contactsToUpdate, displayName: UserDisplayName(req)})
    }); 
}

// Process Update page
export function ProcessUpdatePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

    // instantiate a new Contact Item
    let updatedContactList = new ContactList
    ({
      "_id": id,
      "name": req.body.name,
      "number": req.body.number,
      "address": req.body.address,
    });
  
    // find the clothing item via db.clothing.update({"_id":id}) and then update
    ContactList.updateOne({_id: id}, updatedContactList, {}, (err) =>{
      if(err)
      {
        console.error(err);
        res.end(err);
      }
  
      res.redirect('/contacts-list');
    });
}
// Display Create page
export function DisplayAddPage(req: Request, res: Response, next: NextFunction): void
{
    // show the Update view
    res.render('index', { title: 'Add', page: 'update', list: '', displayName: UserDisplayName(req)  });
}

// Process Create page
export function ProcessAddPage(req: Request, res: Response, next: NextFunction): void
{
    // instantiate a new Contact List
  let newContact = new ContactList
  ({
    "name": req.body.name,
    "number": req.body.number,
    "address": req.body.address,
  });

  // db.list.insert({list data is here...})
  ContactList.create(newContact, (err: NativeError) => 
  {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contacts-list');
  });
}

// Process Delete page
export function ProcessDeletePage(req: Request, res: Response, next: NextFunction): void
{
    let id = req.params.id;

  // db.clothing.remove({"_id: id"})
  ContactList.remove({_id: id}, (err) => {
    if(err)
    {
      console.error(err);
      res.end(err);
    }

    res.redirect('/contacts-list');
  });
}


