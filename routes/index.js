'use strict';

///Routing for index factory only calls

const express = require('express');
const router = express.Router();

const dbOperations = require("../config/crudoperations/index");

/* GET home page. */
router.get('/', function(req, res, next) {
    var path = require("path");
    var welcomePage = require("../config/pages");
    var newPath = path.normalize(__dirname+"/..");
    var homePagePath = path.join(newPath,welcomePage);
    res.sendFile(path.resolve(homePagePath));

});

///Check login Status
router.post('/webindex', function(request,response) {
  if(request.session.user){
      var Status={
          "Message":"Hello "+request.session.user["0"].username,
          "Email":request.session.user["0"].useremail, 
      }
      dbOperations.checkActivation(Status,response);
  }
  else{
        var Status={
            "Message":"Login/SignUp",
      }
      response.send(Status);
  }
});

///Send email activation link
router.post('/sendActivationLink',function(request,response){
    if(request.session.user){
        var emailObject={
              "email":request.session.user["0"].useremail
        }
        dbOperations.sendActivationLink(emailObject,response);
    }
    else{
        response.json({message:"unknown"});
    }
});

///Logging out
router.post('/logout',function(request,response){
    const utils = require("../config/utils");
    utils.sessionDestroy(request);
    response.send({message:"success"});
});

module.exports = router;
