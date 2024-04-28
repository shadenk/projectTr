<template>
  <div class="map-container">
    <!-- Map section -->
    <div id="map" class="map"></div>
    <!-- <pre> {{ usePostsStore().posts }}</pre> -->

    <div class="form-container">
      <h2>Create or Update a Post</h2>
      <v-form @submit.prevent="handleSubmit">
        <v-select :items="['add', 'edit']"></v-select>
        <v-text-field v-model="formData.id" label="Post ID"></v-text-field>
        <v-text-field v-model="formData.title" label="Title"></v-text-field>
        <v-text-field v-model="formData.body" label="Body"></v-text-field>
        <v-text-field v-model="formData.userId" label="User ID"></v-text-field>
        <v-btn type="submit" class="submit-btn">Submit</v-btn>
      </v-form>
      <h2>Update Post</h2>
      <v-form @submit.prevent="handleUpdate">
         <v-select :items="['add', 'edit']"></v-select>
        <v-text-field v-model="formData.id" label="Post ID"></v-text-field>
        <v-text-field v-model="formData.title" label="Title"></v-text-field>
        <v-text-field v-model="formData.body" label="Body"></v-text-field>
        <v-text-field v-model="formData.userId" label="User ID"></v-text-field>
        <v-btn type="submit" class="submit-btn">Submit</v-btn>
      </v-form>
    </div>
    <!-- Information section -->
    <div class="info-container">
      <pre class="coordinates">Coordinates: {{ coordinates }}</pre>
      <div class="calculation-box">
        <!-- <p>Click the map to draw a polygon.</p>  -->
        <p v-if="!polygonDrawn">Click the map to draw a polygon.</p>
        <p v-else>Polygon drawn. Click again to edit or delete.</p>
        <div id="calculated-area"></div>
      </div>
    </div>
  </div>
</template>

<script>
import mapboxgl from "../assets/data/mapbox-gl";
import MapboxDraw from "../assets/data/mapbox-gl-draw";
import "../assets/data/mapbox-gl.css";
import "../assets/data/mapbox-gl-draw.css";
import { usePostsStore } from "@/stores/posts";

export default {
  data() {
    return {
      map: null,
      draw: null,
      coordinates: null,
      polygonDrawn: false, // Track if a polygon is drawn
      drawId: null, // Track the ID of the drawn polygon
      traceData: null,
      index: 0,
      timer: null,
      
      allowDraw: true, // Track if drawing is allowed
      formData: {
        id: "", //for update
        title: "",
        body: "",
        userId: "",
      },
    };
  },
  async mounted() {
    await usePostsStore().fetchPosts();

    //this.createDrawMap();
    // Start line animation after the map style is loaded
    // await this.map.on("style.load", this.initializeLineAnimation);
  },
  methods: {
    async handleSubmit() {
      const postData = { ...this.formData }; // Create a copy of formData object
      await usePostsStore().addPosts(postData);
      // if (postData.id) {
      //   await usePostsStore().updatePost(postData); // Update post if ID is provided
      // } else {
      //   await usePostsStore().addPosts(postData); // Add new post if no ID provided
      // }
      // Optionally, you can reset the form after submission
      this.formData.id = ""; // Reset ID field
      this.formData.title = "";
      this.formData.body = "";
      this.formData.userId = "";
    },
    async handleUpdate() {
      const postData = { ...this.formData }; // Create a copy of formData object
      await usePostsStore().updatePost(postData);
      // if (postData.id) {
      //   await usePostsStore().updatePost(postData); // Update post if ID is provided
      // } else {
      //   await usePostsStore().addPosts(postData); // Add new post if no ID provided
      // }
      //reset the form after submission
      this.formData.id = ""; // Reset ID field
      this.formData.title = "";
      this.formData.body = "";
      this.formData.userId = "";
    },
  },

  createDrawMap() {
    this.map = new mapboxgl.Map({
      container: "map",
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
      center: [46.8470686, 24.64250775],
      zoom: 14,
    });

    this.draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true,
      },
      defaultMode: "draw_polygon",
    });
    this.map.addControl(this.draw);

    this.map.on("draw.create", this.updateArea);

    this.map.on("draw.delete", this.updateArea);
    this.map.on("draw.update", this.updateArea);
  },
  updateArea(e) {
    const data = this.draw.getAll();
    //Check if a polygon is drawn or deleted
    if (data.features.length > 0) {
      this.polygonDrawn = true;
      this.coordinates = data.features[0].geometry.coordinates[0];
      this.allowDraw = false; // Disable drawing

      // Hide the polygon tool button
      const polygonToolButton = document.querySelector(
        ".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon"
      );
      if (polygonToolButton) {
        polygonToolButton.style.display = "none";
      }
    } else {
      this.polygonDrawn = false;
      this.coordinates = null;
      this.allowDraw = true; // Enable drawing

      // Show the polygon tool button again
      const polygonToolButton = document.querySelector(
        ".mapbox-gl-draw_ctrl-draw-btn.mapbox-gl-draw_polygon"
      );
      if (polygonToolButton) {
        polygonToolButton.style.display = "block";
      }
    }
  },

  initializeLineAnimation(coordinates) {
    coordinates = [
      [46.665104728449506, 24.72824282710397],
      [46.70043383669844, 24.74270983358396],
      [46.73857622219455, 24.75934508712801],
      [46.72158916380755, 24.79261919769209],
      [46.686432958569895, 24.777632278590133],
      [46.64795688123337, 24.760990550539105],
      [46.665104728449506, 24.72824282710397],
    ];

    this.traceData = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          geometry: {
            type: "LineString",
            coordinates: [],
          },
        },
      ],
    };

    this.map.addSource("trace", { type: "geojson", data: this.traceData });
    this.map.addLayer({
      id: "trace",
      type: "line",
      source: "trace",
      paint: {
        "line-color": "yellow",
        "line-opacity": 0.75,
        "line-width": 5,
      },
    });

    // setup the viewport
    this.map.jumpTo({ center: coordinates[0], zoom: 14 });
    this.map.setPitch(30);

    this.timer = setInterval(() => {
      if (this.index < coordinates.length) {
        this.traceData.features[0].geometry.coordinates.push(
          coordinates[this.index]
        );
        this.map.getSource("trace").setData(this.traceData);
        this.map.panTo(coordinates[this.index]);
        this.index++;
      } else {
        window.clearInterval(this.timer);
      }
    }, 1000);
  },
};
</script>

<style scoped>
.map-container {
  display: flex;
  justify-content: space-between;
}

.map {
  min-width: 500px;
  min-height: 500px;
}

.info-container {
  width: 300px;
  padding: 10px;
  background-color: #f0f0f0;
}

.coordinates {
  font-family: monospace;
}

.calculation-box {
  margin-top: 20px;
}

.form-container {
  width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: auto; /* Center the form horizontally */
  display: flex;
  flex-direction: column;
  align-items: left; /* Center children vertically */
}

.form-container h2 {
  font-size: 1.5rem;
  margin-bottom: 10px;
}

.form-container v-text-field {
  margin-bottom: 15px;
}

.form-container .submit-btn {
  width: 100%;
}
</style>
