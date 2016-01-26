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
    } else {
        var setUserDataBtn = document.getElementById('setUserDataBtn');
        var uploadPhotoBtn = document.getElementById('uploadPhotoBtn');
        var getUserGallery = document.getElementById('getUserGallery');
        
        setUserDataBtn.className = setUserDataBtn.className + ' disabled';
        uploadPhotoBtn.className = uploadPhotoBtn.className + ' disabled';
        getUserGallery.className = getUserGallery.className + ' disabled';
        
    }
}