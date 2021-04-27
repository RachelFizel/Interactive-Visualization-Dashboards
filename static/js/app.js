//the code in these files is based on office hours with Dom

console.log("app.js loaded");

function drawBarGraph(sampleId){

    console.log(`drawBarGraph(${sampleId})`);

}

function drawBubbleChart(sampleId){

    console.log(`drawBubbleChart(${sampleId})`);

}

function showMetaData(sampleId){

    console.log(`showMetaData(${sampleId})`);

}

function optionChanged(newSampleId){
    console.log(`user selected ${newSampleId}`);
    drawBarGraph(newSampleId);
    drawBubbleChart(newSampleId);
    showMetaData(newSampleId);
}


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

        var id = sampleNames[0];

        //display the graphs
        drawBarGraph(id);
        drawBubbleChart(id);
        showMetaData(id);

    });



    //update the bar graph

    //update the bubble chart

    //update the demographic information

}

initDashboard();