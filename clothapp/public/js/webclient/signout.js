// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Sign in function
function OnLogout() {
    try {
        Parse.User.logOut();
    } catch (err) {
        alert(err.message);
    }
    return false;
}