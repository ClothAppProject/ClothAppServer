module.exports = function (app) {

    // Request: GET '/users'
    // Result: Test message.
    app.get('/users', function (req, res) {
        res.send("Welcome to /users.");
    });
     

 
    // Request: GET '/users/:username'
    // Result: Get the user profile of the user with the given username.
    app.get('/users/:username', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
            try{
                //TODO: aggiungere le informazioni a seconda se user è una persona, negozio o negozioOnline
                if(results.length===0) res.send("this username doesn't exist");
                res.send(results);
            }catch(err){res.send("error: "+err.message)}
            },
            error: function () {
                res.send("failed");
            }
        });
    });

     // Request: GET '/users/:name'
     // Result: Get the user profiles of the user with the given name.
     app.get('/users/:name', function (req, res) {
          var query = new Parse.Query(Parse.User);
          query.equalTo("name", req.params.name);
          query.find({
              success: function (results) {
              try{
                  //TODO: aggiungere le informazioni a seconda se user è una persona, negozio o negozioOnline
                  if(results.length===0) res.send("this name doesn't exist");
                  res.send(results);
              }catch(err){res.send("error: "+err.message)}
              },
              error: function () {
                  res.send("failed");
              }
          });
     });

    // Request: GET '/users/:username/profilePhoto'
    // Result: Get the user profile photo of the user with the given username.
    app.get('/users/:username/profilePhoto', function (req, res) {
        var userphoto = Parse.Object.extend("UserPhoto");
        var query = new Parse.Query(userphoto);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                try{
                    //console.log("lunghezza: "+results.length);
                    if(results.length===0) res.send("this username haven't profile photo or doesn't exist");
                    else{
                        var utente= results[0];
                        var foto=utente.get("ProfilePhoto");
                        res.send(foto);
                    }
                }
                catch(err){res.send("error: "+err.message)}
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     

    // Request: GET '/users/:username/gallery'
    // Result: Get the gallery of the user with the given username.
    app.get('/users/:username/gallery', function (req, res) {
        var photo = Parse.Object.extend("Photo");
        var query = new Parse.Query(photo);
        query.equalTo("user", req.params.username);
        query.find({
            success: function (results) {
                if(results.length=== 0) res.send("this username haven't profile photo or doesn't exist");
                else res.send(results);
            },
            error: function () {
                res.send("failed");
            }
        });
    });


    // Request: GET '/recentphotos'
    // Result: Get the recent 20 photos of the gallery.
    app.get('/recentphotos', function (req, res) {
        var photo = Parse.Object.extend("Photo");
        var query = new Parse.Query(photo);
        query.descending("createdAt");
        query.find({
            success: function (results) {
                if(results.length=== 0) res.send("no photo found");
                else res.send(results);
            },
            error: function () {
                res.send("failed");
            }
        });
    });


    // Request: GET '/users/:username/galleryLike'
    // Result: Get first photos of a user with the given username order by like.
    app.get('/users/:username/gallerylike/:limit', function (req, res) {
            var photo = Parse.Object.extend("Photo");
            var query = new Parse.Query(photo);

            query.equalTo("user", req.params.username);
            query.descending("numeroLike");

            query.limit(parseInt(req.params.limit));
         //   if(limi!=null){
          //  query.limit(limi);}

            query.find({
                success: function (results) {
                    if(results.length=== 0) res.send("this username haven't profile photo or doesn't exist");
                    else res.send(results);
                },
                error: function () {
                    res.send("failed");
                }
            });
        });


    // Request: POST '/recentphotos?username=myusername&password=mypassword'  body=poto file
    // Result: upload a photo.

    app.post('/users/updatephoto', function (req, res) {
        var express = require('express');
        var app = express();
        app.use(express.bodyParser());
        var username=req.param('username');
        var password=req.param('password');
        console.log("body= "+req.body);
        var file=req.body.foto;
        console.log("tipo= "+typeof req.body);
        Parse.User.logIn(username, password, {
          success: function(user) {
          try{
                var foto=file;
                var parseFile = new Parse.File('photo.jpg',foto);
                var photo = new Parse.Object("Photo");
                photo.set("username",username);
                photo.set("photo", parseFile);
                photo.save();

                res.send("update success");
          }catch(err){res.send("error: "+err.message+ " file="+file)}

          },
          error: function(user, error) {
            res.send("login error");
          }
        });

    });



    // Request: GET '/users/:username/followers'
    // Result: Get the users who follow the user with the given username.
    app.get('/users/:username/followers', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                try{
                    if(results.length=== 0) res.send("this username doesn't exist");
                    else{
                        var utente= results[0];
                        var followers=utente.get('followers');
                        //console.log("DEBUG "+utente.get('followers'));
                        if(typeof followers=='undefined') res.send('undefined');
                        else res.send(utente.get('followers'));
                    }
                }catch(err){res.send("error: "+err.message)}
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     
    // Request: GET '/users/:username/following'
    // Result: Get the followed users of the user with the given username.
    app.get('/users/:username/following', function (req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                try{
                    if(results.length=== 0) res.send("this username doesn't exist");
                    else{
                        var utente= results[0];
                        var following=utente.get('following');
                        if(typeof following=='undefined') res.send('undefined');
                        else res.send(utente.get('following'));
                    }
                }catch(err){res.send("error: "+err.message)}
            },
            error: function () {
                res.send("failed");
            }
        });
    });


    // Request: GET '/users/:username/shops'
    // Result: Get the favorite shops of the user (person) with the given username.
    app.get('/users/:username/shops', function (req, res) {
        var persona = Parse.Object.extend("Persona");
        var query = new Parse.Query(persona);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
            try{
            //console.log("DEBUG: "+results.length);
                if(results.length=== 0) res.send("this username doesn't exist");
                else{
                    var utente= results[0];
                    var local=utente.get('preferiti');
                    var online=utente.get('preferitiOnline')
                    if(typeof local=='undefined'){
                        if(typeof online=='undefined') res.send("undefined");
                        else{ res.send(online);}
                    }
                    else{if(typeof online=='undefined') res.send(local);
                         else{
                            var shops=local.concat(online);
                            res.send(shops);
                         }
                    }
                }
            }catch(err){res.send("error:"+err.message);}
            },
            error: function () {
                res.send("failed");
            }
        });
    });
     
    // Request: GET '/users/:username/shops'
    // Result: Get the favorite virtualshops of the user with the given username.
    app.get('/users/:username/virtualshops', function (req, res) {
        var persona = Parse.Object.extend("Persona");
        var query = new Parse.Query(persona);
        query.equalTo("username", req.params.username);
        query.find({
            success: function (results) {
                try{
                    if(results.length=== 0) res.send("this person doesn't exist");
                    else{
                        var utente= results[0];
                        var online=utente.get('preferitiOnline');
                        if(typeof online=='undefined') res.send("undefined");
                        else res.send(online);
                    }
                }catch(err){res.send("error: "+err.message)}
            },
            error: function () {
                res.send("failed");
            }
        });
    });

     // Request: GET '/users/:username/shops'
     // Result: Get the favorite virtualshops of the user with the given username.
     app.get('/users/:username/localshops', function (req, res) {
         var persona = Parse.Object.extend("Persona");
         var query = new Parse.Query(persona);
         query.equalTo("username", req.params.username);
         query.find({
              success: function (results) {
                 try{
                    if(results.length=== 0) res.send("this person doesn't exist");
                    else{
                        var utente= results[0];
                        var local=utente.get('preferiti');
                        if(typeof local=='undefined') res.send("undefined");
                        else res.send(local);
                    }
                 }catch(err){res.send("error: "+err.message)}
              },
              error: function () {
                 res.send("failed");
              }
         });
     });

     // Request: GET '/users/:username/person'
     // Result: Get the person profile of the user (person) with the given username.
     app.get('/users/person/:username', function (req, res) {
         var persona = Parse.Object.extend("Persona")
         var query = new Parse.Query(persona);
         query.equalTo("username", req.params.username);
         query.find({
             success: function (results) {
                 if(results.length=== 0) res.send("this person doesn't exist");
                 else{
                    var utente=results[0];
                    res.send(utente);
                 }
             },
             error: function () {
                 res.send("failed");
             }
         });
     });

     // Request: GET '/users/:username/plocalshop'
     // Result: Get the person profile of the user (person) with the given username.
     app.get('/users/localshop/:username', function (req, res) {
         var local = Parse.Object.extend("LocalShop")
         var query = new Parse.Query(local);
         query.equalTo("username", req.params.username);
         query.find({
             success: function (results) {
                 if(results.length=== 0) res.send("this localshop doesn't exist");
                 else{
                    var utente=results[0];
                    res.send(utente);
                 }
             },
             error: function () {
                 res.send("failed");
             }
         });
     });


     // Request: GET '/users/:username/plocalshop'
     // Result: Get the person profile of the user (person) with the given username.
     app.get('/users/virtualshop/:username', function (req, res) {
         var online = Parse.Object.extend("VirtualShop")
         var query = new Parse.Query(online);
         query.equalTo("username", req.params.username);
         query.find({
             success: function (results) {
                 if(results.length=== 0) res.send("this virtualshop doesn't exist");
                 else{
                    var utente=results[0];
                    res.send(utente);
                 }
             },
             error: function () {
                 res.send("failed");
             }
         });
     });


    /*
        // Request: POST '/users/signup'
        // Result: Create a new user with the given username, password, email.
        app.post('/users/signup', function (req, res) {
            var user = new Parse.User();
            user.set("username", req.body.username);
            user.set("password", req.body.password);
            user.set("email", req.body.email);

            user.signUp(null, {
                success: function (user) {
                    // Hooray! Let them use the app now.
                    res.send('sigup success');
                },
                error: function (user, error) {
                    // Show the error message somewhere and let the user try again.
                    // alert("Error: " + error.code + " " + error.message);
                    res.send('error');
                }
            });
        });

        // Request: POST '/users/login'
        // Result: Log in a user with the given username and password.
        app.post('/users/login', function (req, res) {
            Parse.User.logIn(req.body.username, req.body.password, {
                success: function (user) {
                    //fare cose dopo il login di successo.
                    res.send('signin success');
                },
                error: function (user, error) {
                    // Accesso non riuscito. Controllare l'errore per capire perchè.
                    res.send('error');
                }
            });
        });
        */

        // Request: GET '/users/:username/profileThumbnail'
            // Result: Get the user profile thumbnail of the user with the given username.
          //  app.get('/users/:username/profileThumbnail', function (req, res) {
                // non serve?
            //    res.send('Profile Thumbnail: Da implementare...');
           // });


    // Request: GET '/users/:username/brands'
    // Result: Get the favorite brands of the user with the given username.
    //app.get('/users/:username/brands', function (req, res) {
       /* var query = new Parse.Query(Parse.User);
        query.equalTo("user", req.params.username);
        query.find({
            success: function (results) {
                var utente= results;
                res.send(utente.get('brand'));
            },
            error: function () {
                res.send("failed");
            }
        });
         res.send('Profile Thumbnail: Da implementare...'); */
  //  });
};
