// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Get user profile data for the user with the given username
function OnSubmitUserProfileData() {
    var username = document.updForm.username.value;
    
    var xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            
            var user = JSON.parse(xhttp.responseText)[0];
            
            alert(xhttp.responseText);
            
            document.getElementById("updObjectID").setAttribute('value', user.objectId);
            document.getElementById("updUsername").setAttribute('value', user.username);
            document.getElementById("updEmail").setAttribute('value', user.email);
            document.getElementById("updFirstName").setAttribute('value', user.name);
            document.getElementById("updLastName").setAttribute('value', user.lastname);
            document.getElementById("updBirthday").setAttribute('value', Date(user.date.iso));
        }
    };
    
    xhttp.open("GET", "http://clothapp.parseapp.com/users/" + username, true);
    xhttp.send();
    
    return false;
}