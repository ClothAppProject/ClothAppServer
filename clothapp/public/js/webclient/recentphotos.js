// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

// Get user profile data for the user with the given username
function getRecentPhotos() {
    
    try {

        var xhttp = new XMLHttpRequest();

        xhttp.onreadystatechange = function () {
            if (xhttp.readyState === 4 && xhttp.status === 200) {
                
                try {

                    var gallery = JSON.parse(xhttp.responseText);

                    var div = document.getElementById("gallery");

                    var content = "";

                    for (var i = 0; i < gallery.length; i += 4) {

                        content += '<div class="row">';

                        content += '<div class="col-md-3 col-sm-6" style="width:180px; height:180px; background-size:cover; background-image:url(\'' + gallery[i].photo.url + '\')" ></div>';

                        if (i + 1 < gallery.length) {
                            content += '<div class="col-md-3 col-sm-6" style="width:180px; height:180px; background-size:cover; background-image:url(\'' + gallery[i + 1].photo.url + '\')" ></div>';
                        }

                        if (i + 2 < gallery.length) {
                            content += '<div class="col-md-3 col-sm-6" style="width:180px; height:180px; background-size:cover; background-image:url(\'' + gallery[i + 2].photo.url + '\')" ></div>';
                        }

                        if (i + 3 < gallery.length) {
                            content += '<div class="col-md-3 col-sm-6" style="width:180px; height:180px; background-size:cover; background-image:url(\'' + gallery[i + 3].photo.url + '\')" ></div>';
                        }

                        content += '</div>';
                    }

                    // alert(content);

                    div.innerHTML = content;
                } catch (e) {
                    alert(e.message);
                }
            }
        };

        xhttp.open("GET", "http://clothapp.parseapp.com/recentphotos", true);
        xhttp.send();
        
    } catch (e) {
        alert(e.message);
    }
}

$(document).ready(function () {
    getRecentPhotos();
});