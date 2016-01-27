// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Sign up function
function OnSignUp() {
    // alert('Sign Up');
    try {
        
        var username = document.signUpForm.username.value;
        var password = document.signUpForm.password.value;
        var passwordCheck = document.signUpForm.passwordCheck.value;
        var email = document.signUpForm.email.value;
        var emailCheck = document.signUpForm.emailCheck.value;
        var firstname = document.signUpForm.firstName.value;
        var lastname = document.signUpForm.lastName.value;
        var date = new Date(document.signUpForm.date.value);
        var city = document.signUpForm.city.value;
        
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
                        alert('New object created with objectId: ' + persona.id);
                        
                        window.location.replace("http://clothapp.parseapp.com/webclient");
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