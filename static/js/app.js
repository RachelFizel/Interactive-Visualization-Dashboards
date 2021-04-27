//the code in these files is based on office hours with Dom

console.log("app.js loaded");


function initDashboard(){
    console.log("initDashboard()");
    //populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(function(data){
        console.log(data);
    });

    //update the bar graph

    //update the bubble chart

    //update the demographic information

}

initDashboard();