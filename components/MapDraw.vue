<template>
  <pre> {{ this.cords   }}</pre>
  <div id="map"></div>
  <div class="calculation-box">
    <p>Click the map to draw a polygon.</p>
    <div id="calculated-area"></div>
  </div>
</template>

<script>
import mapboxgl from "../assets/data/mapbox-gl";
import MapboxDraw from "../assets/data/mapbox-gl-draw";
import "../assets/data/mapbox-gl.css";
import "../assets/data/mapbox-gl-draw.css";

export default {
  data() {
    return {map: null, draw:null, cords:null}
  },
  mounted() {
    this.createDrawMap();
  },
  methods: {
    createDrawMap() {
      this.map = new mapboxgl.Map({
        container: "map", // container ID
        // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
        style: {
          version: 8,
          sources: {
            google: {
              type: "raster",
              tiles: [
                "https:///mt0.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
                "https:///mt1.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
                "https:///mt2.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
                "https:///mt3.google.com/vt?lyrs=m&x={x}&y={y}&z={z}",
              ],
            },
          },
          layers: [
            {
              id: "google-layer",
              source: "google",
              type: "raster",
              minzoom: 0,
              maxzoom: 22,
            },
          ],
        },

        center: [46.8470686, 24.64250775], // starting position [lng, lat]
        zoom: 14, // starting zoom
      });

       this.draw = new MapboxDraw({
        displayControlsDefault: false,
        // Select which mapbox-gl-draw control buttons to add to the map.
        controls: {
          polygon: true,
          trash: true,
        },
        // Set mapbox-gl-draw to draw by default.
        // The user does not have to click the polygon control button first.
        defaultMode: "draw_polygon",
      });
      this.map.addControl(this.draw);

       this.map.on('draw.create', this.updateArea);
       this.map.on('draw.delete', this.updateArea);
       this.map.on('draw.update', this.updateArea);
    },
    updateArea(e) {
        const data = this.draw.getAll();
        const answer = document.getElementById('calculated-area');
        console.log(data.features[0].geometry.coordinates[0]);
        this.cords = data.features[0].geometry.coordinates[0];
        // if (data.features.length > 0) {
        //     const area = turf.area(data);
        //     // Restrict the area to 2 decimal points.
        //     const rounded_area = Math.round(area * 100) / 100;
        //     answer.innerHTML = `<p><strong>${rounded_area}</strong></p><p>square meters</p>`;
        // } else {
        //     answer.innerHTML = '';
        //     if (e.type !== 'draw.delete')
        //         alert('Click the map to draw a polygon.');
        // }
    }

  },
};
</script>

<style scoped>
.calculation-box {
  height: 75px;
  width: 150px;
  position: absolute;
  bottom: 40px;
  left: 10px;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 15px;
  text-align: center;
}

#map {
  min-width: 500px;
  min-height: 500px;
}
</style>
