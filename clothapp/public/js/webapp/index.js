// Parse initialization
try {
    Parse.initialize("JdgT5RtwJaaoDRNe9bx5LF3TyVj20RGXMKMv6jQ8", "MttzOIoQIxkHFd6IuCrsk8AG4FeUy0jTP741gtIg");
} catch (err) {
    alert(err.message);
}

$(document).ready( function () {
    $(".button-collapse").sideNav();
    $('ul.tabs').tabs();
    
    getRecentPhotos();
});

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

                    for (var i = 0; i < gallery.length && i < 32; i += 4) {

                        content += '<div class="row">';

                        content += '<div class="col s6 m6 l3"><div class="card hoverable"><div class="card-image"><img class="materialboxed" width="200" style="margin: 0 auto" src="' + gallery[i] + '"><span class="card-title">Posted by ...</span></div><div class="card-content"><span class="card-title grey-text text-darken-4 valign">Photo title</span></div></div></div>';

                        if (i + 1 < gallery.length) {
                            content += '<div class="col s6 m6 l3"><div class="card hoverable"><div class="card-image"><img class="materialboxed" width="200" style="margin: 0 auto" src="' + gallery[i + 1] + '"><span class="card-title">Posted by ...</span></div><div class="card-content"><span class="card-title grey-text text-darken-4 valign">Photo title</span></div></div></div>';
                        }

                        if (i + 2 < gallery.length) {
                            content += '<div class="col s6 m6 l3"><div class="card hoverable"><div class="card-image"><img class="materialboxed" width="200" style="margin: 0 auto" src="' + gallery[i + 2] + '"><span class="card-title">Posted by ...</span></div><div class="card-content"><span class="card-title grey-text text-darken-4 valign">Photo title</span></div></div></div>';
                        }

                        if (i + 3 < gallery.length) {
                            content += '<div class="col s6 m6 l3"><div class="card hoverable"><div class="card-image"><img class="materialboxed" width="200" style="margin: 0 auto" src="' + gallery[i + 3] + '"><span class="card-title">Posted by ...</span></div><div class="card-content"><span class="card-title grey-text text-darken-4 valign">Photo title</span></div></div></div>';
                        }

                        content += '</div>';
                    }

                    // alert(content);

                    div.innerHTML = content;
                    
                    $('.materialboxed').materialbox();
                } catch (e) {
                    alert(e.message);
                }
            }
        };

        xhttp.open("GET", "http://clothapp.parseapp.com/recentgallery/1/32", true);
        xhttp.send();
        
    } catch (e) {
        alert(e.message);
    }
}