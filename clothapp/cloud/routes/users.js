module.exports = function(app) {



    //----------------------------------------------------------------------------------FUNZIONI DI TEST--------------------------------------------------------------------------------------
    // Request: GET '/users'
    // Result: Test message.
    app.get('/users', function(req, res) {
        res.send("Welcome to /users.");
    });


    //----------------------------------------------------------------------------------FUNZIONI DELL'UTENTE-------------------------------------------------------------------------------
    // Request: GET '/users/:username'
    // Result: Get the user profile of the user with the given username.
    app.get('/users/:username', function(req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(user) {
                res.send(user);
            },
            error: function() {
                res.send("failed");
            }
        });
    });

    // Request: GET '/users/:name'
    // Result: Get the user profiles of the user with the given name.
    app.get('/users/name/:name', function(req, res) {
        var query = new Parse.Query(Parse.User);
        query.equalTo("name", req.params.name);

        query.find({
            success: function(results) {
                res.send(results);
            },
            error: function() {
                res.send("failed");
            }
        });
    });

    // Request: GET '/users/:username/profilePhoto'
    // Result: Get the user profile photo of the user with the given username.
    app.get('/users/:username/profilePhoto', function(req, res) {

        var UserPhoto = Parse.Object.extend("UserPhoto");

        var query = new Parse.Query(UserPhoto);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(photo) {
                res.send(photo);
            },
            error: function() {
                res.send("failed");
            }
        });
    });


    // Request: GET '/users/:username/gallery'
    // Result: Get the gallery of the user with the given username from start to end.
    app.get('/users/:username/gallery/:start/:end', function(req, res) {
        try {

            var start = req.params.start;
            var end = req.params.end;
            var delta = end - start + 1;

            if (delta <= 0) {
                res.send("Invalid parameters (start < end)");
            }

            var Photo = Parse.Object.extend("Photo");

            var query = new Parse.Query(Photo);

            query.equalTo("user", req.params.username);
            query.skip(start - 1);
            query.limit(delta);
            query.descending("numeroLike");

            query.find({
                success: function(results) {
                    var Image = require("parse-image");

                    var resizedImages = [];

                    for (var i = 0; i < results.length; i++) {

                        var thumbnail = results[i].get("thumbnail");

                        if (thumbnail != null) {
                            resizedImages.push(thumbnail.url());
                        }
                    }

                    res.send(resizedImages);
                },
                error: function() {
                    res.send("failed");
                }
            });

        } catch (e) {
            res.send(e.message);
        }
    });


    // Request: GET '/users/:username/galleryLike'
    // Result: Get first photos of a user with the given username order by like.
    app.get('/users/:username/gallerylike/:start/:end', function(req, res) {
        try {

            var start = req.params.start;
            var end = req.params.end;
            var delta = end - start + 1;

            if (delta <= 0) {
                res.send("Invalid parameters (start < end)");
            }

            var Photo = Parse.Object.extend("Photo");

            var query = new Parse.Query(Photo);

            query.equalTo("user", req.params.username);
            query.skip(start - 1);
            query.limit(delta);
            query.descending("numeroLike");

            query.find({
                success: function(results) {
                    var Image = require("parse-image");

                    var resizedImages = [];

                    for (var i = 0; i < results.length; i++) {

                        var thumbnail = results[i].get("thumbnail");

                        if (thumbnail != null) {
                            resizedImages.push(thumbnail.url());
                        }
                    }

                    res.send(resizedImages);
                },
                error: function() {
                    res.send("failed");
                }
            });

        } catch (e) {
            res.send(e.message);
        }
    });


    // Request: GET '/users/:username/followers'
    // Result: Get the users who follow the user with the given username.
    app.get('/users/:username/followers', function(req, res) {

        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(user) {

                var followers = user.get("followers");

                if (followers != null) {
                    res.send(followers);
                } else {
                    res.send([]);
                }
            },
            error: function() {
                res.send("failed");
            }
        });
    });


    // Request: GET '/users/:username/following'
    // Result: Get the followed users of the user with the given username.
    app.get('/users/:username/following', function(req, res) {

        var query = new Parse.Query(Parse.User);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(user) {

                var following = user.get("following");

                if (following != null) {
                    res.send(following);
                } else {
                    res.send([]);
                }
            },
            error: function() {
                res.send("failed");
            }
        });
    });


    // Request: GET '/users/:username/shops'
    // Result: Get the favorite shops of the user (person) with the given username.
    app.get('/users/:username/shops', function(req, res) {

        var Persona = Parse.Object.extend("Persona");

        var query = new Parse.Query(Persona);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(user) {

                // res.send(user);

                var shops = user.get("preferiti");
                var onlineShops = user.get("preferitiOnline");

                var result = [];

                if (shops != null) {
                    result = result.concat(shops);
                }

                if (onlineShops != null) {
                    result = result.concat(onlineShops);
                }

                res.send(result);
            },
            error: function() {
                res.send("failed");
            }
        });
    });

    // Request: GET '/users/:username/shops'
    // Result: Get the favorite virtualshops of the user with the given username.
    app.get('/users/:username/virtualshops', function(req, res) {

        var Persona = Parse.Object.extend("Persona");

        var query = new Parse.Query(Persona);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(user) {
                var onlineShops = user.get("preferitiOnline");

                if (onlineShops != null) {
                    res.send(onlineShops);
                } else {
                    res.send([]);
                }
            },
            error: function() {
                res.send("failed");
            }
        });
    });

    // Request: GET '/users/:username/shops'
    // Result: Get the favorite virtualshops of the user with the given username.
    app.get('/users/:username/localshops', function(req, res) {

        var Persona = Parse.Object.extend("Persona");

        var query = new Parse.Query(Persona);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(user) {
                var shops = user.get("preferiti");

                if (shops != null) {
                    res.send(shops);
                } else {
                    res.send([]);
                }
            },
            error: function() {
                res.send("failed");
            }
        });
    });

    // Request: GET '/users/:username/person'
    // Result: Get the person profile of the user (person) with the given username.
    app.get('/users/person/:username', function(req, res) {

        var Persona = Parse.Object.extend("Persona");

        var query = new Parse.Query(Persona);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(user) {
                res.send(user);
            },
            error: function() {
                res.send("failed");
            }
        });
    });


    //-----------------------------------------------------------------------------------FUNZIONI NEGOZI---------------------------------------------------------------------------------
    

    // Request: GET '/users/:username/plocalshop'
    // Result: Get the person profile of the user (person) with the given username.
    app.get('/users/localshop/:username', function(req, res) {

        var LocalShop = Parse.Object.extend("LocalShop");

        var query = new Parse.Query(LocalShop);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(localShop) {
                res.send(localShop);
            },
            error: function() {
                res.send("failed");
            }
        });
    });


    // Request: GET '/users/:username/plocalshop'
    // Result: Get the person profile of the user (person) with the given username.
    app.get('/users/virtualshop/:username', function(req, res) {

        var VirtualShop = Parse.Object.extend("VirtualShop");

        var query = new Parse.Query(VirtualShop);
        query.equalTo("username", req.params.username);

        query.first({
            success: function(virtualShop) {
                res.send(virtualShop);
            },
            error: function() {
                res.send("failed");
            }
        });
    });


    //------------------------------------------------------------------------------FUNZIONI DI ORDINAMENTO FOTO GENERALI----------------------------------------------------------------
    

    // Request: GET '/recentgallery/:start/:end'
    // Result: Get most recent uploaded photo from "start" to "end".
    app.get('/recentgallery/:start/:end', function(req, res) {

        try {

            var start = req.params.start;
            var end = req.params.end;
            var delta = end - start + 1;

            if (delta <= 0) {
                res.send("Invalid parameters (start < end)");
            }

            var Photo = Parse.Object.extend("Photo");

            var query = new Parse.Query(Photo);
            query.skip(start - 1);
            query.limit(delta);
            query.descending("createdAt");

            query.find({
                success: function(results) {
                    var Image = require("parse-image");

                    var resizedImages = [];

                    for (var i = 0; i < results.length; i++) {

                        var thumbnail = results[i].get("thumbnail");

                        if (thumbnail != null) {
                            resizedImages.push(thumbnail.url());
                        }
                    }

                    res.send(resizedImages);
                },
                error: function() {
                    res.send("failed");
                }
            });

        } catch (e) {
            res.send(e.message);
        }
    });


    // Request: GET '/generalGalleryLike/:start/:end'
    // Result: Get most liked photo from "start" to "end".
    app.get('/generalGalleryLike/:start/:end', function(req, res) {

        try {

            var start = req.params.start;
            var end = req.params.end;
            var delta = end - start + 1;

            if (delta <= 0) {
                res.send("Invalid parameters (start < end)");
            }

            var Photo = Parse.Object.extend("Photo");

            var query = new Parse.Query(Photo);
            query.skip(start - 1);
            query.limit(delta);
            query.descending("numeroLike");

            query.find({
                success: function(results) {
                    var Image = require("parse-image");

                    var resizedImages = [];

                    for (var i = 0; i < results.length; i++) {

                        var thumbnail = results[i].get("thumbnail");

                        if (thumbnail != null) {
                            resizedImages.push(thumbnail.url());
                        }
                    }

                    res.send(resizedImages);
                },
                error: function() {
                    res.send("failed");
                }
            });

        } catch (e) {
            res.send(e.message);
        }
    });

    
    //------------------------------------------------------------------------FUNZIONI UTILI----------------------------------------------------------------------------

    
    app.get('/createthumbnail/:id', function(req, res) {

        var id = req.params.id;
        var photoObject;

        var Photo = Parse.Object.extend("Photo");

        var query = new Parse.Query(Photo);
        query.equalTo("objectId", id);

        query.first({
            success: function(photo) {

                photoObject = photo;

                var Image = require("parse-image");

                Parse.Cloud.httpRequest({
                    url: photo.get("photo").url()

                }).then(function(response) {
                    var image = new Image();
                    return image.setData(response.buffer);

                }).then(function(image) {
                    var size = Math.min(image.width(), image.height());

                    return image.crop({
                        left: (image.width() - size) / 2,
                        top: (image.height() - size) / 2,
                        width: size,
                        height: size
                    });

                }).then(function(image) {
                    return image.scale({
                        width: 300,
                        height: 300
                    });

                }).then(function(image) {
                    return image.setFormat("JPEG");

                }).then(function(image) {
                    return image.data();

                }).then(function(buffer) {
                    var base64 = buffer.toString("base64");
                    var cropped = new Parse.File("thumbnail.jpg", {
                        base64: base64
                    });
                    return cropped.save();

                }).then(function(cropped) {
                    photoObject.set("thumbnail", cropped);
                    return photoObject.save();

                }).then(function(photo) {
                    res.send(photo);

                }, function(error) {
                    res.send(error);
                });
            },
            error: function() {
                res.send("failed");
            }
        });
    });

};
