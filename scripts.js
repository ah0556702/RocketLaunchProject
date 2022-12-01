/*   Assignment: Launch Library
     JS of Launch Library
     Author: Audrey Harmon
     Date: October 15, 2022
*/

// declare global variables for each button on the navbar
var launchButton = document.getElementById('launch_btn')
var astroButton = document.getElementById('astro_btn')
var libraryButton = document.getElementById('library_btn')
// declare an array to access the ids of the divs in the html
var idArray = ['one', 'two', 'three', 'four', 'five'];

// add an event listener to the launch library option on the navbar
libraryButton.addEventListener('click', function(){
    // declare a variable of the XMLHttpRequest class
    var httpRequest = new XMLHttpRequest();
    // access the api that we are wanting to retrieve data from
    // in this case I used the API provided by NASA for their "Astronomy Picture of the Day"
    httpRequest.open("get", "https://api.nasa.gov/planetary/apod?api_key=gZP4TXT8SmCi1mRK5PUDSpFNudmWY6a7T7FaDa8R");
    // send the request
    httpRequest.send();
    // declare the readystatechange for the library data function
    httpRequest.onreadystatechange = LibraryFunction;
    // function to retrieve and display data
    function LibraryFunction(){
        // if the request was accepted the following statement executes
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            // a for loop executes and hides additional unnecessary columns within the html
            // so that only one col is left to hold the picture and data from the API
            for(var i = 0; i < 4; i++){
                document.getElementById(idArray[i]).style.display = "none";
            }
            // the string form of the data is retrieved
            var library = httpRequest.responseText;
            // the string data is parsed into an object
            var libraryObj = JSON.parse(library)
            // the url property for the image is stored in a variable
            var image = libraryObj.url;
            // the title property is stored in a variable
            var title = libraryObj.title;
            // the remaining col is accessed by id and stored in a variable
            var libraryImage = document.getElementById('five')
            // declares variables for creating the elements
            var imgElement = document.createElement('img');
            var updateTitle = document.createElement('h4');
            var infoBtn = document.createElement('button');
            // the image src is assigned to the img element
            imgElement.src = image;
            // the id is assigned to allow for styling the image in css
            imgElement.id = "library-image"
            // the class is set so that the image can be styled according to bootstrap as well
            imgElement.class = "img-fluid"
            // the title value is added to the inner html of the header element
            updateTitle.innerHTML = title;
            // the button text is set 
            infoBtn.innerHTML = "More Info"
            // the button id is set so that the button can be styled in css
            infoBtn.id = "info-btn"
            // an event listener is added to the button with an anon function
            infoBtn.addEventListener('click', function(){
                // the explanation is pulled from the library object
                var info = libraryObj.explanation;
                // the element that will hold the description is created
                var explanation = document.createElement('p')
                // the explanation is stored in the inner html of the element
                explanation.innerHTML = info;
                // the description replaces the button when the button is clicked
                libraryImage.replaceChild(explanation, infoBtn)
            })
            // the text color is set to white for better readability by user
            libraryImage.style.color = "white"
            // the created elements replace the previous pages elements
            libraryImage.replaceChildren(imgElement, updateTitle, infoBtn);
        }
    }
});

// add an event listener to the launch option on the navbar
launchButton.addEventListener('click', function(){
    document.getElementById('row').style.display = "flex";
    // declare a variable of the XMLHttpRequest class
    var httpRequest = new XMLHttpRequest();
    // access the api that we are wanting to retrieve data from
    httpRequest.open("get", "https://ll.thespacedevs.com/2.2.0/launch/upcoming");
    // send the request
    httpRequest.send();
    // declare the readystatechange for the launch data function
    httpRequest.onreadystatechange = LaunchFunction;
    // function to retrieve and display data
    function LaunchFunction(){
        // if the request was accepted the following statement executes
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            // the string form of the data is retrieved
            var launches = httpRequest.responseText;
            // the string data is parsed into an object
            var launchObj = JSON.parse(launches)
            // retrieves the first five objects from the array within the JSON data
            for(var i = 0; i < 5; i++){
                // declares variables to store the data to display
                var name = launchObj.results[i].name;
                var image = launchObj.results[i].image;
                var status = launchObj.results[i].status.description;
                var lastUpdated = launchObj.results[i].last_updated;
                // grabs each div by id according to the counters variable at present
                var col = document.getElementById(idArray[i]);
                // displays the additional columns
                col.style.display = "inline"
                // declares variables for creating the different elements
                var imgElement = document.createElement('img');
                var nameElement = document.createElement('h3');
                var statusElement = document.createElement('p');
                var updateElement = document.createElement('p');
                // assigns the images src
                imgElement.src = image;
                // assigns the images id so that it can be styled in css
                imgElement.id = "launch-image"
                // assigns a class so that it can be styled according to bootstrap as well
                imgElement.class = "img-fluid"
                // adds the inner html of the name to the header element
                nameElement.innerHTML = name;
                // adds the status property's value 
                statusElement.innerHTML = status;
                // adds the last time the data was updated to the last_updated property's value
                updateElement.innerHTML = lastUpdated;
                // appends all of the created elements onto the page within the html
                col.replaceChildren(imgElement, nameElement, statusElement, updateElement);
            }
        }
    }
});

// assigns a click event listener to the astronaut button on the navbar
astroButton.addEventListener('click', function(){
    document.getElementById('row').style.display = "flex";
    // declare a variable of the XMLHttpRequest class
    var httpRequest = new XMLHttpRequest();
    // access the api that we are wanting to retrieve data from
    httpRequest.open("get", "https://ll.thespacedevs.com/2.2.0/astronaut/");
    // send the request
    httpRequest.send();
    // declare the readystatechange for the astro data function
    httpRequest.onreadystatechange = AstroFunction;
    // function to retrieve and display data
    function AstroFunction(){
        // if the request was accepted the following statement executes
        if(httpRequest.readyState == 4 && httpRequest.status == 200){
            // the string form of the data is retrieved
            var astros = httpRequest.responseText;
            // the string data is parsed into an object
            var astroObj = JSON.parse(astros)
            // retrieves the first five objects from the array within the JSON data
            for(var i = 0; i < 5; i++){
                // declares variables for accessing the property's wanted
                var name = astroObj.results[i].name;
                var image = astroObj.results[i].profile_image;
                var bio = astroObj.results[i].bio;
                var nationality = astroObj.results[i].nationality;
                // accesses the col-sm by id from the idArray declared within js
                var col = document.getElementById(idArray[i]);
                // declares variables for holding the elements being created
                var imgElement = document.createElement('img');
                var nameElement = document.createElement('h3');
                var bioElement = document.createElement('p');
                var natElement = document.createElement('p');
                // sets the images src to the image property
                imgElement.src = image;
                // sets the images id so that it can be styled within css
                imgElement.id = "astro-image"
                // sets the innerHTML to display the astronauts name
                nameElement.innerHTML = name;
                // sets the innerHTML to display the astronauts bio
                bioElement.innerHTML = bio;
                // sets the innerHTML to display their nationality
                natElement.innerHTML = nationality;
                // replaces the previous child elements of the div elements with the 
                // astronauts info so that it isn't duplicated or appended above other data
                col.replaceChildren(imgElement, nameElement, natElement, bioElement);
            }
        }
    }
});



