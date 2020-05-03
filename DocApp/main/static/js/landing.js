getstatewisedata();

function getstatewisedata(){
    var data = $.ajax( {
        type: 'GET',     
        url: 'https://api.covid19india.org/data.json',
        data: {},
        success: function(data) {
            var obj = JSON.parse;
            var x = data.statewise;
            // console.log(data);
            console.log(x);
            $("#cases_data").text(x[0].active + "+");
            $("#death_data").text(x[0].deaths + "+");
            $("#rec_data").text(x[0].recovered + "+");

            // ====================================================================================

            var json ={
                "locations":[
                    { 
                        "state":"Maharashtra",
                        "lat":"19.601194",
                        "long":"75.552979"
                    },
                    { 
                        "state":"Gujarat",
                        "lat":"22.309425",
                        "long":"72.136230"
                    },
                    { 
                        "state":"Delhi",
                        "lat":"28.7041",
                        "long":"77.1025"
                    },
                    { 
                        "state":"Madhya Pradesh",
                        "lat":"23.473324",
                        "long":"77.947998"
                    },
                    {
                        "state":"Rajasthan",
                        "lat":"27.0238",
                        "long":"74.2179"

                    },
                    { 
                        "state":"Tamil Nadu",
                        "lat":"11.1271",
                        "long":"78.6569"
                    },
                    { 
                        "state":"Uttar Pradesh",
                        "lat":"28.207609",
                        "long":"79.826660"
                    },
                    { 
                        "state":"Andhra Pradesh",
                        "lat":"15.9129",
                        "long":"79.7400"
                    },
                    { 
                        "state":"Telangana",
                        "lat":"18.1124",
                        "long":"79.0193"
                    },
                    { 
                        "state":"West Bengal",
                        "lat":"22.9868",
                        "long":"87.8550"
                    },
                    { 
                        "state":"Jammu and Kashmir",
                        "lat":"33.7782",
                        "long":"76.5762"
                    },
                    { 
                        "state":"Karnataka",
                        "lat":"15.3173",
                        "long":"75.7139"
                    },
                    { 
                        "state":"Kerala",
                        "lat":"10.8505",
                        "long":"76.2711"
                    },
                    { 
                        "state":"Bihar",
                        "lat":"25.0961",
                        "long":"85.3131"
                    },
                    { 
                        "state":"Punjab",
                        "lat":"31.1471",
                        "long":"75.3412"
                    },
                    { 
                        "state":"Haryana",
                        "lat":"29.0588",
                        "long":"76.0856"
                    },
                    { 
                        "state":"Odisha",
                        "lat":"20.9517",
                        "long":"85.0985"
                    },
                    { 
                        "state":"Jharkhand",
                        "lat":"23.6102",
                        "long":"85.2799"
                    },
                    { 
                        "state":"Chandigarh",
                        "lat":"30.7333",
                        "long":"76.7794"
                    },
                    { 
                        "state":"Uttarakhand",
                        "lat":"30.0668",
                        "long":"79.0193"
                    },
                    { 
                        "state":"Himachal Pradesh",
                        "lat":"31.1048",
                        "long":"77.1734"
                    },
                    { 
                        "state":"Assam",
                        "lat":"26.2006",
                        "long":"92.9376"
                    },
                    { 
                        "state":"Chhattisgarh",
                        "lat":"21.2787",
                        "long":"81.8661"
                    },
                    { 
                        "state":"Andaman and Nicobar Islands",
                        "lat":"11.7401",
                        "long":"92.6586"
                    },
                    { 
                        "state":"Ladakh",
                        "lat":"34.152588",
                        "long":"77.577049"
                    },
                    { 
                        "state":"Puducherry",
                        "lat":"11.9416",
                        "long":"79.8083"
                    },
                    { 
                        "state":"Goa",
                        "lat":"15.2993",
                        "long":"74.1240"
                    },
                    { 
                        "state":"Manipur",
                        "lat":"24.6637",
                        "long":"93.9063"
                    },
                    { 
                        "state":"Tripura",
                        "lat":"23.9408",
                        "long":"91.9882"
                    },
                    { 
                        "state":"Mizoram",
                        "lat":"23.1645",
                        "long":"92.9376"
                    },
                    { 
                        "state":"Arunachal Pradesh",
                        "lat":"28.2180",
                        "long":"94.7278"
                    },
                    { 
                        "state":"Nagaland",
                        "lat":"26.1584",
                        "long":"94.5624"
                    },
                    { 
                        "state":"Dadra and Nagar Haveli",
                        "lat":"20.1809",
                        "long":"73.0169"
                    },
                    { 
                        "state":"Daman and Diu",
                        "lat":"20.4283",
                        "long":"72.8397"
                    },
                    { 
                        "state":"Lakshadweep",
                        "lat":"13.7000",
                        "long":"72.1833"
                    },
                    { 
                        "state":"Sikkim",
                        "lat":"27.5330",
                        "long":"88.5122"
                    },
                ]
            }
            var data_map = { "map_markers":[]}
            for(var i=0 ;i<36; i++){
                data_map.map_markers[i]={   
                        "state":data.statewise[i+1].state,
                        "statecode": data.statewise[i+1].statecode,
                        "active": data.statewise[i+1].active,
                        "confirmed": data.statewise[i+1].confirmed,
                        "deaths": data.statewise[i+1].deaths,
                        "recovered": data.statewise[i+1].recovered,
                        "lat":json.locations[i].lat,
                        "long":json.locations[i].long
                    }
                }
                console.log(data_map.map_markers);
/////////////////////////////////////////////////////////////////////////////
            // $.fn.dataTable.ext.errMode = 'none';
            $('#example').DataTable( {
                "lengthMenu": [[-1], ["All"]],
                data: data_map.map_markers,
                "pageLength": 25,
                columns: [
                    {data: 'state' },
                    {data: 'active' },
                    {data: 'confirmed'},
                    {data: 'recovered'},
                    {data: 'deaths' },
                ],
                "order": [[ 2, "desc" ]],
                "bLengthChange": false, 
            } );
            //if not click
            var data_click;
            
            initialize(data_map); 
            function initialize(json) {
                var mapOptions = {
                  zoom: 4,
                  center: new google.maps.LatLng( 20.5937,78.9629)
                };
                map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                for(var i = 0; i < json.map_markers.length; i++) {
                  var mag = 0.007*json.map_markers[i].confirmed;
                  var obj = json.map_markers[i];
                  var marker = new google.maps.Marker({
                    position: new google.maps.LatLng(obj.lat,obj.long),
                    icon: {
                      path: google.maps.SymbolPath.CIRCLE,
                      scale: mag,
                      fillColor: '#f00',
                      fillOpacity: 0.35,
                      strokeWeight: 0
                    },
                    map: map,
                    name: obj.name 
                  });
                }}
                var table = $('#example').DataTable();         
            $('#example tbody').on('click', 'tr', function () {
               var  data_click = table.row( this ).data();
               document.getElementById("name").innerHTML="India > " + data_click.state;
               initialize(data_map); 
                function initialize(json) {
                    var mapOptions = {
                      zoom: 5,
                      center: new google.maps.LatLng( data_click.lat, data_click.long)
                    };
                    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
                    for(var i = 0; i < json.map_markers.length; i++) {
                      var mag = 0.01*json.map_markers[i].confirmed;
                      var obj = json.map_markers[i];
                      var marker = new google.maps.Marker({
                        position: new google.maps.LatLng(obj.lat,obj.long),
                        icon: {
                          path: google.maps.SymbolPath.CIRCLE,
                          scale: mag,
                          fillColor: '#f00',
                          fillOpacity: 0.35,
                          strokeWeight: 0
                        },
                        map: map,
                        name: obj.name 
                      });
                    }}
                
            } );

            // ==============================================================
            
    var data_graph= data.cases_time_series;
    var data1 = [];
    var labels= [];
    var  data2 = [];
    for(var i=0;i<data_graph.length ;i++){
        data1[i] = data_graph[i].totalconfirmed;
        labels[i]= data_graph[i].date;
        data2[i]= data_graph[i].totaldeceased;
    }
    var ctx = document.getElementById('myChart1');
    var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels:labels,
        datasets: [{
            label: '# of cases',
            data: data1,
         
            borderColor: [
                'rgb(111, 75, 251)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});


       
    
    var ctx = document.getElementById('myChart2');
    var myChart2 = new Chart(ctx, {
    type: 'line',
    data: {
        labels:labels,
        datasets: [{
            label: '# of deaths',
            data: data2,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
});
    }
    });

    
    return data;
}

