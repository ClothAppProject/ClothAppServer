// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Check if a user is currently logged in.
function checkLogin() {
    
    var currentUser = Parse.User.current();
    
    if (currentUser) {
        var username = currentUser.get('username');
        document.getElementById('userInfo').innerHTML = 'You are currently logged in as ' + username;
    }
}

/*
// Log in function
function OnLogin() {
    
    alert('OnLogin function...');
    
    var username = document.signInForm.username.value;
    var password = document.signInForm.password.value;
    
    alert('OnLogin function...');
    
    Parse.User.logIn(username, password, {
        success: function (user) {
            var currentUser = Parse.User.current();
            window.location.replace("http://clothapp.parseapp.com/webclient");
        },
        error: function (user, error) {
            alert(error.message);
        }
    });
    
    return false;
}*/

// Get user profile data for the user with the given username
/*function OnSubmitUserProfileData() {
    var username = document.updForm.username.value;
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            var user = JSON.parse(xhttp.responseText)[0];
            alert(xhttp.responseText);
            document.getElementById("updObjectID").setAttribute('placeholder', user.objectId);
            document.getElementById("updUsername").setAttribute('placeholder', user.username);
            document.getElementById("updEmail").setAttribute('placeholder', user.email);
            document.getElementById("updFirstName").setAttribute('placeholder', user.name);
            document.getElementById("updLastName").setAttribute('placeholder', user.lastname);
            document.getElementById("updBirthday").setAttribute('placeholder', Date(user.date.iso));
        }
    };
    
    xhttp.open("GET", "http://clothapp.parseapp.com/users/" + username, true);
    xhttp.send();
    
    return false;
}*/