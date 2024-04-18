import { defineStore } from "pinia";
 
export const useMapStore = defineStore({
  id: "map-store",
  state: () => {
    return {
      name: "shaden"
    };
  },
  actions: {
    updateName() {
      this.name = "alayed";
    }
  },
  persist: true
});
 
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}