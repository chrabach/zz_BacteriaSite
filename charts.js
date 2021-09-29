function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    
   
    //console.log(metadata)
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    
  
    
    var result = resultArray[0];
    //wash frequency:
    //console.log(result.wfreq)

    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing met
    
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}


//the true beginning of Deliverable 1:
// 1. Create the buildCharts function.
  function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
	  
    var samples = data.samples;
		  //console.log(samples)
    
    // 4. Create a variable that filters the samples for the object with the desired sample number.
	var filteredSamples = samples.filter(SampleObj => SampleObj.id === sample);
	
  //console.log(filteredSamples)
    //  5. Create a variable that holds the first sample in the array.
	
  //use this in part 6
  var firstSample = filteredSamples[0]
	//console.log(firstSample)

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
	//var firstSample.labels
  var otu_ids = firstSample.otu_ids;
  var otu_labels = firstSample.otu_labels;
  var sample_values = firstSample.sample_values;
	//var otu_ids = samples.map(SampleObj => SampleObj.otu_ids);
	//console.log(otu_ids)
	
  
  //var otu_labels = samples.map(SampleObj => SampleObj.otu_labels);
	//var sample_values = samples.map(SampleObj => SampleObj.sample_values);


  //console.log(sample_values)
	
	
	

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

	//more hint: chain slice() method with map() and reverse()
	

	
  //console.log(filteredSamples[0].otu_ids)

  //sortedFilters = filteredSamples.map(entry => entry.otu_ids);//.sort((a,b)=>b - a);
  //console.log(filteredSamples[0].otu_ids.slice(0,10))
  
  //a = filteredSamples[0].otu_ids.sort((a,b)=>b - a).slice(0,10)
 
  //Bach (1) check github lesson (last one one Wednesday)
  //b = sample_values//[0]
  //c = b.slice(0,10)
  
  
 // var yticks = 
	
  //Object.entries(filteredSamples[0].otu_ids).forEach(([key,value]) =>  {
  //});
  var ytick = otu_ids.slice(0,10).map(otuID => `OTU ${otuID}`)

   // ytick.map(j => toString(j))
    // 8. Create the trace for the bar chart. 
    var barData = [ {	
                 
            x: sample_values.slice(0,10).reverse(),
            y: ytick,
						type:"bar",
            orientation: 'h'
		
		
	
          }
      
    ];
	
	
	
	
    // 9. Create the layout for the bar chart. 
    var barLayout = {
		title: "Top 10 Bacteria Cultures Found",
     margin : {t:30,l:150}
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("plotAreaBar", barData, barLayout);


    // here 



//Deliverable 2:
//from BellyButton_bubble_chart_starter_code.js
// Bar and Bubble charts
// Create the buildCharts function.


//function buildCharts(sample) {
	
  // Use d3.json to load and retrieve the samples.json file 
  //d3.json("samples.json").then((data) => {
  //var samples = data.samples;
  //var filteredSamples = samples.filter(SampleObj => SampleObj.id === sample);
    

  //var otu_ids = filteredSamples.map(SampleObj => SampleObj.otu_ids);
  //var otu_labels = filteredSamples.map(SampleObj => SampleObj.otu_labels);
 // var sample_values = filteredSamples.map(SampleObj => SampleObj.sample_values);
    


//})
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    //Plotly.newPlot(); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = [
	{
		x: otu_ids, 
		y: sample_values,
		text: otu_labels,
    
    mode : 'markers',
		
		
	  marker : {size : sample_values,
              //Cristina (1)
              //why aren't the colors right?
              color : otu_ids,
				      colorscale : "Earth"
              }
	}
];

    // 2. Create the layout for the bubble chart.
    
	var bubbleLayout = {
		title : "Bacteria Cultures Per Sample",
    xaxis: { title:"OTU ID"},
    yaxis: { title:"Samples"},

    hovermode: 'closest',
    margin: {t:0},
    margin : {t:30}
    
    };

    // 3. Use Plotly to plot the data with the layout.
    //Plotly.newPlot("plotAreaBar", bubbleData, bubbleLayout); 
    Plotly.newPlot("plotAreaScatter", bubbleData, bubbleLayout); 




//Deliverable 3:

// Create the buildChart function.
//function buildCharts_d3(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("samples.json").then((data) => {
    //console.log(data);

    // Create a variable that holds the samples array. 
    //var samples = data.samples; 

    // Create a variable that filters the samples for the object with the desired sample number.
	  //var filteredSamples = samples.filter(SampleObj => SampleObj.id === sample);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    
    
  
    var metadata = data.metadata;

    //metadataSamples = samples.filter(sObject => sObject.metadata.id === sample);

    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
   
    


    // Create a variable that holds the first sample in the array.
    //var firstSample = resultArray[0]
 
    // 2. Create a variable that holds the first sample in the metadata array.
    
    //come back here
    var result = resultArray[0];

    //console.log(wfreq)
  
    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
    var wfreq = result.wfreq
    // Create the yticks for the bar chart.

    // Use Plotly to plot the bar data and layout.
  
    //Plotly.newPlot();
    
    // Use Plotly to plot the bubble data and layout.
    //bach: enable this:
    //Plotly.newPlot();
  
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      domain : {x:[0,1],y:[0,1]},
      value : wfreq,
      title : {text:"<b>Belly Button Washing Frequency</b> <br>Scrubs per Week</br>"},
      type: "indicator",
      mode: 'gauge+number',
      
      
      
      //Cristina (2):
      //why doesn't gauge work:
      gauge: {
        axis: { range: [null,10], thickmode:"array",thickvals:[0,2,4,6,8,10],thicktext:[0,2,4,6,8,10]},
        bar: {color: "black"},
          steps: [ 
              {range: [0,2], color : "red"},
              {range : [2,4], color: "orange"},
              {range : [4,6], color: "yellow"},
              {range : [6,8], color: "lime"},
              {range : [8,10], color: "green"}
                ]

          }}

    ];
    //console.log(gaugeData)
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
      //title : "Belly Button Washing Frequency",
     // xaxis: { title:"OTU ID"},
      //yaxis: { title:"Samples"}
      width : 400,
      height: 400

      };

    // 6. Use Plotly to plot the gauge data and layout.
    //bach:enable this:
    //console.log(gaugeData)
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  //})
//}

}) 
});
}

