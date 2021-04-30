//the code in these files is based on office hours with Dom

console.log("app.js loaded");

function drawBarGraph(sampleId){

    console.log(`drawBarGraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        //console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id ==sampleId);

        //console.log(resultArray);

        var result = resultArray[0];

        //console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        //console.log(otu_labels);
        
        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0,10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l:150}

        }

        Plotly.newPlot("bar", barArray, barLayout);
    })

}

function drawBubbleChart(sampleId){

    console.log(`drawBubbleChart(${sampleId})`);
    
    d3.json("data/samples.json").then(data => {
        //console.log(data);
        var samples = data.samples;
        var resultArray = samples.filter(s => s.id ==sampleId);

        //console.log(resultArray);

        var result = resultArray[0];

        //console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;
        //console.log(otu_labels);
        
        //yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: 'markers',
            marker: {
                color: otu_ids,
                size: sample_values
            }
        }
        //console.log(otu_ids);
        //console.log(sample_values);

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            title: "Bubble Chart",
            showlegend:false,
            height: 600,
            width: 1400

        }

        Plotly.newPlot('bubble', bubbleArray, bubbleLayout);
    })

}

function showMetaData(sampleId){

    console.log(`showMetaData(${sampleId})`);
    d3.json("data/samples.json").then(data => {
        
        
        //console.log(data);
        
        var metadata = data.metadata;
        var resultArray = metadata.filter(m => m.id == sampleId);

        console.log("resultArray");
        console.log(resultArray);

        var metadata = d3.select("#sample-metadata");
        metadata.html("");
        
        metadata.selectAll(".demoInfo")
                .data(resultArray)
                .enter()
                .append("div")
                .classed("demoInfo", true)
                .html(function(){
                    return `Id: ${resultArray[0].id} <br>
                            Ethnicity: ${resultArray[0].ethnicity} <br>
                            Gender: ${resultArray[0].gender} <br>
                            Age: ${resultArray[0].age} <br>
                            Location: ${resultArray[0].location} <br>
                            bbtype: ${resultArray[0].bbtype} <br>
                            wfreq: ${resultArray[0].wfreq} <br>`
                    
                });
        
    })
}



function optionChanged(newSampleId){
    //console.log(`user selected ${newSampleId}`);
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

        //display the graphs and metadata
        drawBarGraph(id);
        drawBubbleChart(id);
        showMetaData(id);

    });


}

initDashboard();