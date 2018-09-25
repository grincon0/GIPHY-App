const strings = ["happy", "sad", "mad", "love", "determined", "worried", "empowered", "aloof", "concentrated", "seriously", "insane"];


const renderButtons = (strings) =>  {
    $("#btn-div").empty();
    strings.forEach((term) => {
        let btn = $('<button>', {
            id: `submit-query`,
            class: "btn btn-primary emotion",
            search: term,
            type: "button",
            text: term
        });
      
        $("#btn-div").append(btn);
    });
}

const getPictures = (caller) => {

    const apiKey = "8GVaytATdSSwaU1NWa4z9MoufR2eIw54";
    let userInput = $(caller).attr("search");
    console.log(caller);
   
    let search = `${userInput}`;
    let query = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";
    
    $.ajax({
        url : query,
        method : "GET"
    }).then(function(response){
        $("#img-results").empty();
        let source = response.data;

        for(var i = 0; i < source.length; i++){
            let newDiv = $('<div>');
            let header = $(`<h6> Rated : ${source[i].rating}</h6>`);
            let img = $(`<img id="gif" src=${source[i].images.fixed_height.url} data-still=${source[i].images.fixed_height_still.url}></img>`);
            
            $(newDiv).append(header).append(img);
            $("#img-results").append(newDiv);
        }
    }).catch(function(err){
        throw err;
    });
}


$(document).ready(function () {
    renderButtons(strings);

    $(".emotion").on("click", function(){

        console.log(this);

        let caller = $(this);
        getPictures(caller);
    });

    //$("#submit-query").on("click", function () {
      //  let input = $(this).text();

        //$("#img-results").empty();
        
      //  getPictures(input);
      //  console.log('ye');

  //  });


});

