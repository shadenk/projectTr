<template>
  <div>
    <v-alert
      text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi, ratione debitis quis est labore voluptatibus! Eaque cupiditate minima, at placeat totam, magni doloremque veniam neque porro libero rerum unde voluptatem!"
      title="Alert title"
      type="success"
    ></v-alert>
    <v-data-table :loading="loading" :headers="headers" :items="posts">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>My CRUD</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ props }">
              <v-btn class="mb-2" color="primary" dark v-bind="props">
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.id"
                        label="ID"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.title"
                        label="Title"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedItem.body"
                        label="Body"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="close">
                  Cancel
                </v-btn>
                <v-btn
                  color="blue-darken-1"
                  :loading="loadingAddEdit"
                  variant="text"
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDelete"
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue-darken-1"
                  variant="text"
                  :loading="loadingDelete"
                  @click="deleteItemConfirm"
                  >OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon class="me-2" size="small" @click="editItem(item)">
          mdi-pencil
        </v-icon>
        <v-icon size="small" @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { title: "ID", value: "id", key: "id" },
      { title: "Title", value: "title", key: "title" },
      { title: "Body", value: "body", key: "body" },
      { title: "Actions", value: "actions", sortable: false },
    ],
    loading: false,
    loadingDelete: false,
    loadingAddEdit: false,
    posts: [],
    editedIndex: -1,
    editedItem: {
      id: null,
      title: "",
      body: "",
    },
    defaultItem: {
      id: null,
      title: "",
      body: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.loading = true;
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        this.loading = false;
      }
    },

    async editItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    async deleteItem(item) {
      this.editedIndex = this.posts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    async deleteItemConfirm(index) {
      const correctIndex = parseInt(this.editedIndex) + 1;
      this.loadingDelete = true;
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/" + correctIndex,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      this.closeDelete();
      this.loadingDelete = "false";
    },

    async close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    async save() {
      const correctIndex = parseInt(this.editedIndex) + 1;

      this.loadingAddEdit = true;
      try {
        if (this.editedIndex > -1) {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts/" + correctIndex,
            {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.editedItem),
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
        } else {
          const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(this.editedItem),
            }
          );
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
        }
        this.loadingAddEdit = false;
        this.close();
      } catch (error) {
        console.error("Error saving data:", error);
      }
    },
  },
};
</script>
