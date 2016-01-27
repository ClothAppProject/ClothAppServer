// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Upload a photo to the server
function OnUpload() {
    
    // alert("Uploading...");
    
    try {
    
    var photo = document.uploadForm.photo;
    
    if (photo.files.length > 0) {
        
        var fullPath = photo.value;
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            // alert(filename);
            
            var file = photo.files[0];
            var name = filename;
            
            var parseFile = new Parse.File(name, file);
            
            parseFile.save().then(function() {
                // The file has been saved to Parse.
                
                alert("New parse file successfully saved!");
                
                try {
                
                var PhotoObj = Parse.Object.extend("Photo");
                var photoObj = new PhotoObj();
                
                photoObj.set("photo", parseFile);
                photoObj.set("user", Parse.User.current().get("username"));
                
                photoObj.save(null, {
                    success: function(photoObj) {
                        // Execute any logic that should take place after the object is saved.
                        alert("Created new photoObj with id " + photoObj.id);
                        
                        window.location.replace("http://clothapp.parseapp.com/webclient");
                    },
                    error: function(gameScore, error) {
                        // Execute any logic that should take place if the save fails.
                        // error is a Parse.Error with an error code and message.
                        alert('Failed to create new object, with error code: ' + error.message);
                    }
                });
                    
                } catch (e) {
                    alert(e.message);
                }
            }, function(error) {
                // The file either could not be read, or could not be saved to Parse.
                alert(error.message);
            });
        }
    }
        
    } catch (e) {
        alert(e.message);
    }
    
    return false;
}