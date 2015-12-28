try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Get user profile data for the user with the given username
function OnSubmitUserProfileData() {
    
    var username = document.updForm.username.value;
    var email = document.updForm.email.value;
    var name = document.updForm.firstName.value;
    var lastname = document.updForm.lastName.value;
    var date = new Date(document.updForm.date.value);
    
    var user = Parse.User.current();
    
    if (username != undefined) user.set('username', username);
    if (email != undefined) user.set('email', email);
    if (name != undefined) user.set('name', name);
    if (lastname != undefined) user.set('lastname', lastname);
    if (date != undefined) user.set('date', date);
    
    user.save(null, {
        success: function (user) {
            alert('Save success!');
            window.location.replace('/webclient');
        }, function (error) {
            alert('Save failed...');
            window.location.replace('/webclient');
        }
    })
    
    return false;
}