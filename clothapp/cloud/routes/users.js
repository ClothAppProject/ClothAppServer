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
                res.send(results[0]);
            }catch(err){res.send("error: "+err.message)}
            },
            error: function () {
                res.send("failed");
            }
        });
    });

     // Request: GET '/users/:name'
     // Result: Get the user profiles of the user with the given name.
     app.get('/users/name/:name', function (req, res) {
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
        query.first({
            success: function (result) {
                res.send(result);
                /*try{
                    //console.log("lunghezza: "+results.length);
                    if(results.length===0) res.send("this username haven't profile photo or doesn't exist");
                    else{
                        var utente= results[0];
                        var foto=utente.get("ProfilePhoto");
                        res.send(foto);
                    }
                }
                catch(err){res.send("error: "+err.message)}*/
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
    // Result: Get the recent :limit photos of the gallery.
    app.get('/recentphotos/:limit', function (req, res) {
        var photo = Parse.Object.extend("Photo");
        var query = new Parse.Query(photo);
        query.limit(parseInt(req.params.limit));
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




    // Request: GET '/users/:username/followers'
    // Result: Get the users who follow the user with the given username.
    app.get('/users/:username/followers', function (req, res) {
        var photo = Parse.Object.extend("Follow");
        var query = new Parse.Query(photo);
        query.equalTo("to", req.params.username);
        query.find({
            success: function (results) {
                try{
                    if(results.length=== 0) res.send("this username doesn't exist");
                    else{
                        var followers=[];
                        for(i = 0; i < results.length; i++) followers.push(results[i].get("from"));
                        res.send(followers);
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
        var photo = Parse.Object.extend("Follow");
        var query = new Parse.Query(photo);
        query.equalTo("from", req.params.username);
        query.find({
            success: function (results) {
                try{
                    if(results.length=== 0) res.send("this username doesn't exist");
                    else{
                        var following=[];
                        for(i = 0; i < results.length; i++) following.push(results[i].get("to"));
                        res.send(following);
                    }
                }catch(err){res.send("error: "+err.message)}
            },
            error: function () {
                res.send("failed");
            }
        });
    });

/*
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
     app.get('/users/:username/shops', function (req, res) {
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
*/
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


     // Request: GET '/users/:username/shop'
     // Result: Get the profile of the shop with the given username.
     app.get('/users/shop/:username', function (req, res) {
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

        /*
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
*/
};
