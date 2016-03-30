// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

$(document).ready( function () {
    // Initialize collpse button for side menu navigation on mobile devices
    $(".button-collapse").sideNav();
    
    // Initialize tabs
    $('ul.tabs').tabs();
    
    // Initialize date picker for signup form
    $('.datepicker').pickadate({
        container: 'body',
        selectMonths: true, // Creates a dropdown to control month
        selectYears: 200, // Creates a dropdown of 15 years to control year
        format: 'dd/mm/yyyy'
    });
    
    checkLogin();
    
    getRecentPhotos(1, 32);
});

// Get user profile data for the user with the given username
function getRecentPhotos(start, end) {
    
    $("#recentGalleryProgress").show();
    
    try {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                
                try {

                    var gallery = JSON.parse(xhttp.responseText);
                    
                    // alert(gallery[0].thumbnail.url);
                    // alert(gallery[0].hashtag);

                    var div = document.getElementById("gallery");

                    var content = "";

                    for (var i = 0; i < gallery.length && i < 32; i += 4) {

                        content += '<div class="row">';

                        content += createCard(i, gallery[i].thumbnail.url, gallery[i].user, gallery[i].tipo, gallery[i].hashtag);

                        if (i + 1 < gallery.length) {
                            content += createCard(i + 1, gallery[i + 1].thumbnail.url, gallery[i + 1].user, gallery[i + 1].tipo, gallery[i + 1].hashtag);
                        }

                        if (i + 2 < gallery.length) {
                            content += createCard(i + 2, gallery[i + 2].thumbnail.url, gallery[i + 2].user, gallery[i + 2].tipo, gallery[i + 2].hashtag);
                        }

                        if (i + 3 < gallery.length) {
                            content += createCard(i + 3, gallery[i + 3].thumbnail.url, gallery[i + 3].user, gallery[i + 3].tipo, gallery[i + 3].hashtag);
                        }

                        content += '</div>';
                    }

                    // alert(content);
                    
                    $("#recentGalleryProgress").hide();

                    div.innerHTML = content;
                    
                    var fadeImmediately = 8;
                    
                    if (window.innerWidth <= 600) {
                        fadeImmediately = 1;
                    } else if (window.innerWidth <= 992) {
                        fadeImmediately = 4;
                    }
                    
                    for (var i = 0; i < fadeImmediately; i++) {
                        Materialize.fadeInImage("#image" + i);
                    }
                    
                    var options = [];
                    
                    for (var i = fadeImmediately; i < gallery.length; i++) {
                        var id = "#image" + i;
                        options.push({selector: id, offset: 0, callback: 'Materialize.fadeInImage("' + id + '")' });
                    }
                    
                    Materialize.scrollFire(options);
                    
                } catch (e) {
                    alert(e.message);
                }
            }
        };

        xhttp.open("GET", "http://clothapp.parseapp.com/recentgallery/" + start + "/" + end, true);
        xhttp.send();
        
    } catch (e) {
        alert(e.message);
    }
}

function createCard(i, imageUrl, username, tipo, hashtags) {
    
    var strTipo;
    
    try {
        strTipo = tipo.toString();
    } catch (e) {
        strTipo = "Vestito";
    }
    
    var hashtagHtml = createHashtagHTML(hashtags);
    
    var result = ' \
        <div class="col s12 m6 l3"> \
            <div id="image' + i +'" class="card hoverable" style="opacity: 0"> \
                <div class="card-image waves-effect waves-block waves-light"> \
                    <img class="activator" width="250" style="margin: 0 auto" src="' + imageUrl + '"> \
                </div> \
                <div class="card-content"> \
                    <div class="row valign-wrapper" style="margin-bottom: 0"> \
                        <div class="col s8 activator"> \
                            <span class="card-title grey-text text-darken-4 activator">'+ strTipo + '</span> \
                            <p class="activator">By ' + username + '</p> \
                        </div> \
                        <div class="col s4 valign"> \
                            <h5 class="valign center-align"> \
                                <a class="btn-floating btn-large waves-effect waves-light red darken-4"> \
                                    <i class="fa fa-heart"></i> \
                                </a> \
                            </h5> \
                        </div> \
                    </div> \
                </div> \
                <div class="card-reveal" style="background: rgba(255,255,255,0.9)"> \
                    <div class="row" style="margin-bottom: 0"> \
                        <span class="card-title grey-text text-darken-4"><i class="material-icons right">close</i></span> \
                    </div> \
                    <div class="row valign-wrapper"> \
                        <div class="col s5 valign"> \
                            <img src="http://placehold.it/64" class="circle z-depth-1" /> \
                        </div> \
                        <div class="col s7 valign"> \
                            <h6>Uploaded by</h6> \
                            <h5>' + username + '</h5> \
                        </div> \
                    </div> \
                    ' + hashtagHtml + ' \
                    <div class="row" style="margin-top: 20px"> \
                        <span class="grey-text text-darken-4"><i class="material-icons left">loyalty</i> Photo item 1</span> \
                    </div> \
                    <div class="row"> \
                        <span class="grey-text text-darken-4"><i class="material-icons left">loyalty</i> Photo item 2</span> \
                    </div> \
                    <hr> \
                    <div style="text-align: center"> \
                        <a class="waves-effect waves-light btn red darken-4" style="margin-top: 20px"> \
                            <i class="material-icons right">zoom_in</i>View \
                        </a> \
                    </div> \
                </div> \
            </div> \
        </div> \
    ';
    
    return result;
}

function createHashtagHTML(hashtags) {
    
    if (hashtags == null) {
        return "";
    }
    
    var result = "";
    
    for (var i = 0; i < hashtags.length; i++) {
        result += '<div class="chip red darken-4 white-text">' + hashtags[i] + '</div>';
    }
    
    return result;
}

// Check if a user is currently logged in.
function checkLogin() {
    
    var currentUser = Parse.User.current();
    
    if (currentUser) {
        $("#loginBtn").remove();
        $("#signupBtn").remove();
        $("#loginSideBtn").remove();
        $("#signupSideBtn").remove();
        
    } else {
        $("#logoutBtn").remove();
        $("#logoutSideBtn").remove();
        $("#capture").prop('disabled', true);
        $("#actionButton").fadeTo('fast', 0.5);
    }
}

// Login function
function login() {
    
    try {
        var username = document.loginForm.username.value;
        var password = document.loginForm.password.value;

        Parse.User.logIn(username, password, {
            success: function (user) {
                var currentUser = Parse.User.current();
                window.location.replace("http://clothapp.parseapp.com/webapp");
            },
            error: function (user, error) {
                alert(error.message);
            }
        });
        
    } catch (err) {
        alert(err.message);
    }
    
    return false;
}

// Logout function
function logout() {
    try {
        Parse.User.logOut();
        window.location.replace("http://clothapp.parseapp.com/webapp");
    } catch (err) {
        alert(err.message);
    }
    return false;
}

// Sign up function
function signup() {
    // alert('Sign Up');
    try {
        
        var username = document.signupForm.username.value;
        var password = document.signupForm.password.value;
        var passwordCheck = document.signupForm.passwordCheck.value;
        var email = document.signupForm.email.value;
        var emailCheck = document.signupForm.emailCheck.value;
        var firstname = document.signupForm.firstname.value;
        var lastname = document.signupForm.lastname.value;
        var date = new Date(document.signupForm.birthday.value);
        var city = document.signupForm.city.value;
        
        if (password != passwordCheck) {
            alert("Le password inserite non corrispondono...");
            return false;
        }
        
        if (email != emailCheck) {
            alert("Le email inserite non corrispondono...");
            return false;
        }

        // alert(date);

        var user = new Parse.User();
        user.set('username', username);
        user.set('password', password);
        user.set('email', email);
        user.set('name', firstname);
        user.set('flagISA', "Persona");

        user.signUp(null, {
            success: function (user) {
                var Persona = Parse.Object.extend("Persona");
                var persona = new Persona();
                
                persona.set("city", city);
                persona.set("date", date);
                persona.set("lastname", lastname);
                persona.set("username", username);

                persona.save(null, {
                    success: function(persona) {
                        // Execute any logic that should take place after the object is saved.
                        // alert('New object created with objectId: ' + persona.id);
                        
                        window.location.replace("http://clothapp.parseapp.com/webapp");
                    },
                    error: function(gameScore, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
            },
            error: function (user, error) {
                alert(error.message);
            }
        });

    } catch(err) {
        alert(err.message);
    }
    
    return false;
}

function upload() {
    
    // alert("Uploading...");
    
    try {
    
        // Questa riga di codice non funziona (errore stupido)?
        // var photo = document.getElementById("#capture");

        // Siccome non riesco a far funzionare la riga sopra, utilizzo questo workaround
        var inputImageList = document.getElementsByName("inputImage");
        var photo = inputImageList[0];

        // alert(photo);
        // alert(inputImageList[0].value);

        if (photo.files.length > 0) {

            var fullPath = photo.value;
            
            if (fullPath) {
                
                var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
                var filename = fullPath.substring(startIndex);
                
                if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                    filename = filename.substring(1);
                }
                
                // alert(filename);

                var file = photo.files[0];
                var name = filename;

                var parseFile = new Parse.File(name, file);

                parseFile.save().then(function() {
                    // The file has been saved to Parse.

                    // alert("New parse file successfully saved!");

                    var PhotoObj = Parse.Object.extend("Photo");
                    var photoObj = new PhotoObj();

                    photoObj.set("photo", parseFile);
                    photoObj.set("user", Parse.User.current().get("username"));

                    photoObj.save(null, {
                        success: function(photoObj) {
                            // Execute any logic that should take place after the object is saved.
                            // alert("Created new photoObj with id " + photoObj.id);

                            var xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function (e) {
                                if (xhttp.readyState === 4 && xhttp.status === 200) {
                                    window.location.replace("http://clothapp.parseapp.com/webapp");
                                }
                            };
                            xhttp.open("GET", "http://clothapp.parseapp.com/createthumbnail/" + photoObj.id, false);
                            xhttp.send();
                        },
                        error: function(gameScore, error) {
                            // Execute any logic that should take place if the save fails.
                            // error is a Parse.Error with an error code and message.
                            alert('Failed to create new object, with error code: ' + error.message);
                        }
                    });

                }, function(error) {
                    // The file either could not be read, or could not be saved to Parse.
                    alert(error.message);
                });
            }
        }
        
    } catch (e) {
        alert(e.message);
    }
    
    return false;
}

