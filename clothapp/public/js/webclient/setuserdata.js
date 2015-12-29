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
        var date = document.setForm.date.value;

        var user = Parse.User.current();

        if (username != '') {
            user.set('username', username);
        }
        if (email != '') {
            user.set('email', email);
        }
        if (name != '') {
            user.set('name', name);
        }
        if (lastname != '') {
            user.set('lastname', lastname);
        }
        if (date != '') {
            user.set('date', new Date(date));
        }

        user.save(null, {
            success: function (user) {
                // alert('Save success!');
                window.location.replace('/webclient');
            },
            error: function (error) {
                // alert('Save failed...');
                window.location.replace('/webclient');
            }
        });
    } catch (err) {
        alert(err.message);
    }
    
    return false;
}