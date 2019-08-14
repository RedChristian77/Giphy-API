let apiKey = "h4SafWEYbovdBJlYMX2oZGrMQmHsN9qx";
let search = "http://api.giphy.com/v1/gifs/search?rating=g";
let searcharray = ["dungeons and dragons","dark souls","Monster Hunter","League of Legends"]

function resetbutt(){
    document.getElementById("buttonsarea").innerHTML = "";
searcharray.forEach(element => {
   let arrayBut = document.createElement("button");
    arrayBut.setAttribute("class","arrayBut");
    arrayBut.innerHTML = element;
    arrayBut.setAttribute("data-value",element);
    document.getElementById("buttonsarea").append(arrayBut);
    
});
}
resetbutt();

// for search button
document.getElementById("submitSearch").addEventListener("click", function(event){
    event.preventDefault();
    let searchWord = document.getElementById("searchBar").value;
    console.log(searchWord)
    searchWord.replace(" ","+");
    let queryURL = search + "&api_key=" + apiKey+ "&q=" + searchWord + "&limit=10";
    console.log(queryURL);
    runquery(queryURL);
    searcharray.unshift(searchWord);
    if(searcharray.length > 4){
        searcharray.pop();
    }
    resetbutt();
});
    
function runquery(queryURL){
fetch(queryURL).then(function(response) {
    return response.json()
  }).then(function(responseJson) {
      //creates the multiple gif divs
      document.getElementById("gifSection").innerHTML = "";
    for(i=0; i < responseJson.data.length; i++){
        let newGifBox = document.createElement("div");

        //title for box
        let title = document.createElement("div");
        title.innerHTML = responseJson.data[i].title;
        newGifBox.append(title);

        //rating, appened after gif
        let rating = document.createElement("div");
        rating.innerHTML = "Rating: " + responseJson.data[i].rating;

        //area for picture
        let gif = document.createElement("img");
        newGifBox.setAttribute("class","test");
        gif.setAttribute("data-active",responseJson.data[i].images.fixed_height.url);
        gif.setAttribute("data-nonactive",responseJson.data[i].images.fixed_height_still.url);
        gif.setAttribute("data-isactive","active");
        gif.setAttribute("src",responseJson.data[i].images.fixed_height.url);
        gif.setAttribute("class","freezeframe");
        newGifBox.append(gif);
        newGifBox.append(rating);
        document.getElementById("gifSection").append(newGifBox);
    }
    
document.querySelectorAll(".freezeframe").forEach(function (img) {
    img.addEventListener("click", function (event) {
        let state = event.target.getAttribute("data-isactive");
        if(state === "active"){
            event.target.setAttribute("src", event.target.getAttribute("data-nonactive"));
            event.target.setAttribute("data-isactive","still");
        }
        else{
            event.target.setAttribute("src", event.target.getAttribute("data-active"));
            event.target.setAttribute("data-isactive","active");
        }

    })
})
  });
};

//search for buttons
document.querySelectorAll(".arrayBut").forEach(function (test) {
    test.addEventListener("click", function (event) {
        let search1 = event.target.getAttribute("data-value");
        search1.replace(" ","+");
        let queryURL = search + "&api_key=" + apiKey+ "&q=" + search1 + "&limit=10";
        runquery(queryURL);
    })}
);