// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Sign up function
function OnSignUp() {
    alert('Sign Up');
    try {
    var username = document.signUpForm.username.value;
    var password = document.signUpForm.password.value;
    var email = document.signUpForm.email.value;
    var firstname = document.signUpForm.firstName.value;
    var lastname = document.signUpForm.lastName.value;
    var date = new Date(document.signUpForm.date.value);
        
    alert(date);
    
    var user = new Parse.User();
    user.set('username', username);
    user.set('password', password);
    user.set('email', email);
    user.set('name', firstname);
    user.set('lastname', lastname);
    user.set('date', date);

    user.signUp(null, {
        success: function (user) {
            window.location.replace("http://clothapp.parseapp.com/webclient");
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