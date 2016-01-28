// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Get user profile data for the user with the given username
function getUserProfilePhoto() {
    
    try {
        
        var username = document.userProfilePhotoForm.username.value;

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                
                try {

                    // alert(xhttp.responseText);
                    
                    var file = JSON.parse(xhttp.responseText);

                    var div = document.getElementById("gallery");

                    var content = '<div class="row"><div class="col-sm-6 col-sm-push-3" style="width:300px; height:300px; background-size:cover; background-image:url(\'' + file.profilePhoto.url + '\')" ></div></div>';

                    // alert(content);

                    div.innerHTML = content;
                } catch (e) {
                    alert(e.message);
                }
            }
        };

        xhttp.open("GET", "http://clothapp.parseapp.com/users/" + username + "/profilePhoto", true);
        xhttp.send();
        
    } catch (e) {
        alert(e.message);
    }
    
    return false;
}