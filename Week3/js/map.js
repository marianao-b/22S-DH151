	// let's create some data
    // from index.html to clean code
    let good = [
        {
            'title':'Alfred Coffee',
            'id': 0,
            'lat': 34.06160885167875,
            'lon': -118.44450106955448,
            'description': "This shop is my favorite. I am a big fan of their Chaga Cold Brew, and their breakfast burrito.",
            'image' : '<img src= https://cdn.shopify.com/s/files/1/2182/5585/files/Westwood-1.jpg?v=1625585601 width= "300px">',
            },
        {
            'title':'Ministry of Coffee',
            'id': 1,
            'lat': 34.06207944274682,
            'lon': -118.44397000203386,
            'description': "MOC is across the stree from where I live, which is why it is one of my favorites. Hands down the best black Cold Brew, I can drink it without any sweetners too! Their food items are a bit pricey though.",
            'image' : '<img src= https://img.hoodline.com/uploads/story/image/51290/Ministry_Of_Coffee_Photo_3_Enhanced.jpg width= "300px">'
            },
        {
            'title':'Lo/Cal',
            'id': 2,
            'lat': 34.026727984650805,
            'lon': -118.46781961290898,
            'description': "I recenlty spent $20 for a 20oz Cold Brew and a Breakfast Sandwhich. The Cold Brew was not the best, but the sandwhich was delicious! Toasted, with egg, bacon avocado and creamy chipotle sauce.",
            'image' : '<img src= https://media.timeout.com/images/101677033/image.jpg width= "300px">'
            },
        {
            'title':'Philz',
            'id': 3,
            'lat': 34.01843725475083,
            'lon': -118.49453771400839,
            'description': "I have not tried much here, but their creamy Mojito Latte is to die for!",
            'image' : '<img src= https://331mrnu3ylm2k3db3s1xd1hg-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/Sprudge-PhilzCoffee-TatianaErnst-Phliz-interior-740x494.jpg width= "300px">'
            }
        ];

    var up = new L.icon({
        iconUrl: './markers/up.png',
        iconSize: [70, 35]
        })
    // Bad shops

    let bad = [
        {
            'title':'Goodboybob Coffee Roasters',
            'id': 0,
            'lat': 34.0283672704018,
            'lon': -118.47622827976005,
            'description': "Hands down, one of the worst coffee shops I have been to. Over priced, bitter Cold Brew, and they do not give lids for the drinks! The people who work here are amazing though.",
            'image' : '<img src= https://cdn.shopify.com/s/files/1/0245/3431/9153/files/GOODBOYBOB120119-2_1024x1024.jpg?v=1576785045 width= "300px">'
            },
        {
            'title': 'Blueys Kitchen and Market',
            'id': 1,
            'lat': 34.03174854548063,
            'lon': -118.46283213087001,
            'description': 'The food here was amazing (try the aquash pancakes!). However, the coffee was watered down and flavorless.' ,
            'image': '<img src= https://images.squarespace-cdn.com/content/v1/5335fd12e4b0b385ae7758a0/1601484838455-DEXTEQLXQAGX81E194DI/Screen+Shot+2020-09-30+at+09.47.36.png?format=1500w width= "300px">'
        }
        ]; 
    var down = new L.icon({
        iconUrl: './markers/down.png',
        iconSize: [25, 25]
        })
    
    // capital L refers to Leafleat
    let map = L.map('map').setView([34.06913427747729, -118.44514891552696], 15);

    // map does not have quotes, it's a variable; adding map we created earlier
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        id: 'mapbox/streets-v11',
    }).addTo(map);


    // function to fly to a location by a given id number
    function flyToIndex(index){
	    map.flyTo([good[index].lat,good[index].lon],18)
        myMarkers.getLayers()[index].openPopup()
    }

    function badflyToIndex(index){
	    map.flyTo([bad[index].lat,bad[index].lon],18)
	    myMarkers2.getLayers()[index].openPopup()
    }

   // before looping the data, create an empty FeatureGroup
    let myMarkers = L.featureGroup();
    let myMarkers2 = L.layerGroup();

    // loop through data
    good.forEach(function(item){
	    let marker = L.marker([item.lat,item.lon], 
            {title: item.title,
             icon: up
        })
             
        .bindPopup(`<div><strong>${item.title}</strong><br>${item.image}<br>${item.description}</div>`)
	    
        myMarkers.addLayer(marker)
	   
        $('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${item.id})">${item.title}</div>`)
    });
    bad.forEach(function(item){
	    let marker = L.marker([item.lat,item.lon], 
            {title: item.title,
             icon: down
        })
        
        .bindPopup(`<div><strong>${item.title}</strong><br>${item.image}<br>${item.description}</div>`)

	    myMarkers2.addLayer(marker)
	   
        $('.sidebar').append(`<div class="sidebar-item" onclick="badflyToIndex(${item.id})">${item.title}</div>`)
    }); 



// after loop, add the FeatureGroup to map
myMarkers.addTo(map)
myMarkers2.addTo(map)


// define layers
let layers = {
	"good": myMarkers,
    "bad": myMarkers2
}

// add layer control box
L.control.layers(null,layers).addTo(map)













// slide show
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}


