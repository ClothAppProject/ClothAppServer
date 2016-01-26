try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Get user profile data for the user with the given username
function OnSetData() {
    alert('submitting...');
    try {
        var username = document.setForm.username.value;
        var email = document.setForm.email.value;
        var name = document.setForm.firstName.value;
        var lastname = document.setForm.lastName.value;
        var date = new Date(document.setForm.date.value);
        var city = document.setForm.city.value;

        var user = Parse.User.current();
        
        var Persona = Parse.Object.extend("Persona");
        
        var query = new Parse.Query(Persona);
        query.equalTo('username', user.get("username"));
        query.first({
            success: function(persona) {
                // The object was retrieved successfully.
                alert(persona);
                
                if (username != '') {
                    user.set('username', username);
                    persona.set('username', username);
                }
                if (email != '') {
                    user.set('email', email);
                }
                if (name != '') {
                    user.set('name', name);
                }
                if (lastname != '') {
                    persona.set('lastname', lastname);
                }
                if (date != '') {
                    persona.set('date', date);
                }
                if (city != '') {
                    persona.set('city', city);
                }

                user.save(null, {
                    success: function (user) {
                        alert('User: save success!');
                        
                        persona.save(null, {
                            success: function(persona) {
                                alert('Persona: save success!');
                                
                                window.location.replace('/webclient');
                            },
                            error: function(error) {
                                alert(error.message);
                            }
                        });
                        
                    },
                    error: function (error) {
                        alert(error.message);
                    }
                });
                
            },
            error: function(error) {
                // The object was not retrieved successfully.
                // error is a Parse.Error with an error code and message.
                alert(error.message);
            }
        });
        
    } catch (err) {
        alert(err.message);
    }
    
    return false;
}