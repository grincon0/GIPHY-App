var strings = ["happy", "sad", "mad", "love", "determined", "worried", "empowered", "aloof", "concentrated", "seriously", "insane"];

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

    $(".emotion").on("click", function(){
        let caller = $(this);
        getPictures(caller);
    });
}

const getPictures = (caller) => {

    const apiKey = "8GVaytATdSSwaU1NWa4z9MoufR2eIw54";
    let userInput = $(caller).attr("search");
  
    let search = `${userInput}`;
    let query = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=" + apiKey + "&limit=10";   
    $.ajax({
        url : query,
        method : "GET"
    }).then(function(response){
        $("#img-results").empty();
        console.log(response);
        let source = response.data;

        for(var i = 0; i < source.length; i++){
            let newDiv = $('<div>');
            let id = source[i].id;
            let header = $(`<h6> Rated : ${source[i].rating}</h6>`);
            let img = $(`<img id=${id} src=${source[i].images.fixed_height.url} data-state=anim data-anim=${source[i].images.fixed_height.url} 
            data-still=${source[i].images.fixed_height_still.url}></img>`);

            $(newDiv).append(header).append(img);
            $("#img-results").append(newDiv);

            $(`#${id}`).on("click", function () {
                let gif = $(this);
                console.log(gif);
                toggleGif(gif);
                
            });
        }

        
    }).catch(function(err){
        throw err;
    });
}

const toggleGif = (gif) => {
    let still = $(gif).attr('data-still');
    let animated = $(gif).attr('data-anim');
    let gifState = $(gif).attr('data-state');

    if(gifState === 'anim'){
        $(gif).attr('src', still);
        $(gif).attr('data-state', 'still');
    }else{
        $(gif).attr('src', animated);
        $(gif).attr('data-state', 'anim');
    }
}

$(document).ready(function () {
    renderButtons(strings);



    $("#create-btn").on("click", function (){
        let input = $("#add-button").val().trim();
        console.log(input)
        strings.push(input);
        renderButtons(strings);

        $("#add-button").val("");
    });

 
});



