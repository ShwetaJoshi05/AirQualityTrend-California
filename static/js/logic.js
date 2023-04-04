// data format
// ['CBSA', 'CITY', 'STATE', 'Pollutant', 'Trend Statistic',
//'Number of Trends Sites', '2000', '2001', '2002', '2003', '2004',
//'2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013',
//'2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', 'Lat',
//'Lon']

d3.json('/data').then(function(data){
    console.log(data);
    
    const colors = ["red", "oragne", "magenta", "yellow", "blue", "green"];
    // const fillColors = ["#f03", "oragne", "magenta", "yellow", "blue", "green"];
    
    var map = L.map('map').setView([36.7783, -119.4179], 5); 

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    
    for (let i=0; i<data.length; i++){
        let currentCity=data[i];
        lat=currentCity[28]; 
        lng=currentCity[29];

        if ((lat!==null) & (lng!==null)){
            L.marker([lat, lng]).addTo(map);
            let j = 6;
            
            for (j; j < 28; j++) {
                let pollutantLevel = currentCity[j];
                let c = colors[0];
                if (pollutantLevel > 0 & pollutantLevel < 5) {
                    c = colors[5];
                } else if (pollutantLevel > 5 & pollutantLevel < 8) {
                    c = colors[4];
                } else if (pollutantLevel > 8 & pollutantLevel < 12) {
                    c = colors[3];
                } else if (pollutantLevel > 12 & pollutantLevel < 15) {
                    c = colors[2];
                } else if (pollutantLevel > 15 & pollutantLevel < 18) {
                    c = colors[1];
                } else {
                    c = colors[0];
                }

                var circle = L.circle([lat, lng], {
                    color: c,
                    // fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 10000
                }).addTo(map);
                
                
                // var popup = L.popup()
                //     .setLatLng([lat, lng])
                //     .setContent("Hello")
                //     .openOn(map);
                var popup = L.popup();

                function onMapClick(e) {
                    const popupText = currentCity[3] + ":" + pollutantLevel.toString() ;//":" + data[0][j];
                    popup
                        .setLatLng(e.latlng)
                        .setContent(popupText)
                        .openOn(map);
                }
                map.on('click', onMapClick);
            };
        };
    }
});