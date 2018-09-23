const strings = ["happy", "sad", "mad", "love", "determined", "worried", "empowered", "aloof", "concentrated", "seriously", "insane"];


const renderButtons = (strings) =>  {
    $("#btn-div").empty();
    strings.forEach(term => {
        let btn = $('<button>', {
            class: "btn btn-primary",
            searchThis: term,
            type: "button",
            text: term
        });
        $("#btn-div").append(btn);
    });
}



$(document).ready(function () {
    renderButtons(strings);
});