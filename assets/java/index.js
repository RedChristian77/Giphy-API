let apiKey = "h4SafWEYbovdBJlYMX2oZGrMQmHsN9qx";
let search = "http://api.giphy.com/v1/gifs/search?rating=g";


document.getElementById("submitSearch").addEventListener("click", function(event){
    event.preventDefault();
    let searchWord = document.getElementById("searchBar").value;
    console.log(searchWord)
    //searchWord.replace(" ","+");
    let queryURL = search + "&api_key=" + apiKey+ "&q=" + searchWord;
    console.log(queryURL);

fetch(queryURL).then(function(response) {
    return response.json()
  }).then(function(responseJson) {
    for(i=0; i < responseJson.data.length; i++){
        let newGifBox = document.createElement("div");
        let gif = document.createElement("img");
        gif.setAttribute("src",responseJson.data[i].images.downsized.url);
        gif.setAttribute("class","test");
        newGifBox.append(gif);
        document.getElementById("gifSection").append(newGifBox);
    }
  });


});