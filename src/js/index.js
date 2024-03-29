let vfrmap = L.map("map").setView([22.7554164, 121.1005247], 10);
vfrmap.createPane("MapLabel");
vfrmap.getPane("MapLabel").style.zIndex = 650;
let baseLayer = L.tileLayer(
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 18,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(vfrmap);
let eaipvfrLayer = L.tileLayer(
  "https://www.eaipvfr.tw/map/ENG/{z}/{x}/{y}.png",
  {
    minZoom: 5,
    maxZoom: 24,
    tms: false,
    id: "eaip",
    zIndex: 98,
    maxNativeZoom: 13,
  }
).addTo(vfrmap);
let RportIcon = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report01.png",
  iconSize: [18, 18],
});
let RportIcon13 = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report01.png",
  iconSize: [144, 144],
});
let RportIcon12 = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report01.png",
  iconSize: [72, 72],
});
let RportIcon11 = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report01.png",
  iconSize: [36, 36],
});

let CRportIcon = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report02.png",
  iconSize: [18, 18],
});
let CRportIcon13 = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report02.png",
  iconSize: [144, 144],
});
let CRportIcon12 = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report02.png",
  iconSize: [72, 72],
});
let CRportIcon11 = L.icon({
  iconUrl: "https://www.eaipvfr.tw/images/report02.png",
  iconSize: [36, 36],
});

let vfrLayer = L.geoJson(vfr, {
  onEachFeature: function (feature, layer) {
    layer
      .bindPopup(
        `<b>目視走廊名稱: </b> ${feature.properties.CORRIDOR}<br><b>無線電可構連高度: </b>${feature.properties.radiomax}FT`,
        { maxWidth: 200 }
      )
      .bindTooltip(feature.properties.CORRIDOR);
  },
}).addTo(vfrmap);
var vfrReportLayer = L.geoJson(vfrrepoint, {
  pointToLayer: function (feature, latlng) {
    return L.marker(
      latlng,
      feature.properties.COMPULSORY == 1.0
        ? { icon: CRportIcon }
        : { icon: RportIcon }
    );
  },
  onEachFeature: function (feature, layer) {
    layer
      .bindPopup(
        "<b>名稱: </b> " +
          feature.properties.NAME_CHI +
          "<br><b>Name: </b>" +
          feature.properties.NAME_ENG +
          "<br><b>無線電可構連高度: </b>" +
          feature.properties.radiomax +
          " FT",
        { maxWidth: 200 }
      )
      .bindTooltip(
        feature.properties.NAME_CHI +
          "<br>" +
          feature.properties.NAME_ENG +
          "<br><b>無線電可構連高度: </b>" +
          feature.properties.radiomax +
          " FT"
      );
  },
}).addTo(vfrmap);
var otherRouteLayer = L.geoJson(otherroute, {
  onEachFeature: function (feature, layer) {
    layer
      .bindPopup("<b>名稱: </b>" + feature.properties.name, { maxWidth: 200 })
      .bindTooltip(feature.properties.name);
  },
});
var otherPointLayer = L.geoJson(otherpoint, {
  pointToLayer: function (feature, latlng) {
    return L.marker(
      latlng,
      feature.properties.checkpoint ? { icon: CRportIcon } : { icon: RportIcon }
    );
  },
  onEachFeature: function (feature, layer) {
    layer
      .bindPopup("<b>Name: </b>" + feature.properties.nameE, { maxWidth: 200 })
      .bindTooltip(feature.properties.nameE);
  },
}).addTo(vfrmap);
var helirouteLayer = L.geoJson(heliroute, {
  onEachFeature: function (feature, layer) {
    layer
      .bindPopup("<b>名稱: </b>" + feature.properties.nameX, { maxWidth: 200 })
      .bindTooltip(feature.properties.nameX);
  },
}).addTo(vfrmap);
var helipointLayer = L.geoJson(helipoint, {
  pointToLayer: function (feature, latlng) {
    return L.marker(
      latlng,
      feature.properties.checkpoint ? { icon: CRportIcon } : { icon: RportIcon }
    );
  },
  onEachFeature: function (feature, layer) {
    layer
      .bindPopup(
        "<b>名稱: </b> " +
          feature.properties.name +
          "<br><b>Name: </b>" +
          feature.properties.nameE,
        { maxWidth: 200 }
      )
      .bindTooltip(feature.properties.name + "<br>" + feature.properties.nameE);
  },
}).addTo(vfrmap);

let geojsonMarkerOptions = {
  radius: 7,
  fillColor: "#ff7800",
  color: "#000",
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
};

// let windpower = L.geoJson(windturbind, {
//   pointToLayer: function (feature, latlng) {
//     return L.circleMarker(latlng, geojsonMarkerOptions);
//   },
//   onEachFeature: function (feature, layer) {
//     var infoset =
//       "<div class='infoframe' style='background-color: #90AFC5;color: white;'>公司名稱:" +
//       feature.properties.company +
//       "</div>" +
//       "<div class='infoframe' style='background-color: #336B87;color: white;'>電廠名稱或地點:" +
//       feature.properties.location +
//       "</div>" +
//       "<div class='infoframe' style='background-color: #2A3132;color: white;'>風機編號:" +
//       feature.properties.number +
//       "</div>" +
//       "<div class='infoframe' style='background-color: #763626;color: white;'>經度：" +
//       feature.properties.wgs84x +
//       "<br/>" +
//       "緯度：" +
//       feature.properties.wgs84y +
//       "</div>" +
//       "<div class='infoframe' style='background-color: #474747;color: white;'>機組高度:" +
//       feature.properties.height_d +
//       "公尺";
//     if (feature.properties.comment != null) {
//       infoset += "(" + feature.properties.comment + ")";
//     }
//     infoset += "</div>";
//     layer.bindPopup(infoset);
//   },
// }).addTo(vfrmap);
let eaipvfrWindturbine = L.tileLayer(
  "https://www.eaipvfr.tw/map/Windturbine/{z}/{x}/{y}.png",
  {
    minZoom: 5,
    maxZoom: 24,
    tms: false,
    id: "Windturbine",
    zIndex: 93,
    maxNativeZoom: 13,
  }
).addTo(vfrmap);

let polylineMeasure = L.control.polylineMeasure({
  position: "topleft",
  unit: "nauticalmiles",
  showBearings: true,
  bearingTextIn: "In",
  bearingTextOut: "Out",
});
polylineMeasure.addTo(vfrmap);

vfrmap.on("polylinemeasure:add", (e) => {
  console.log(polylineMeasure.getArr());
});

let ytStreamMarkers = [];
// fetch youtube streams
fetch("/data/streams.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (streams) {
    streams.forEach((e) => {
      let marker = L.marker([e.lat, e.lng], { alt: e.id })
        .addTo(vfrmap)
        .bindPopup(
          `<div class="videobox">
              <iframe
                frameborder="0"
                src="https://www.youtube.com/embed/${e.ytCode}"
                allowFullScreen="true"
              ></iframe>
            </div>`,
          {
            maxWidth: 480,
          }
        );
      ytStreamMarkers.push(marker);
    });
  });
