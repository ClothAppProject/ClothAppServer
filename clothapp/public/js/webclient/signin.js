// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Sign in function
function OnLogin() {
    try {
    var username = document.signInForm.username.value;
    var password = document.signInForm.password.value;
    
    Parse.User.logIn(username, password, {
        success: function (user) {
            var currentUser = Parse.User.current();
            window.location.replace("http://clothapp.parseapp.com/webclient");
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