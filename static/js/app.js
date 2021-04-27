//the code in these files is based on office hours with Dom

console.log("app.js loaded");


function initDashboard(){
    console.log("initDashboard()");
    //populate the dropdown
    var selector = d3.select("#selDataset");

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option")
                .text(sampleId)
                .property("value", sampleId);
        });
    });



    //update the bar graph

    //update the bubble chart

    //update the demographic information

}

initDashboard();