import { defineStore } from "pinia";
 
export const useMapStore = defineStore({
  id: "posts-store",
  state: () => {
    return {
      posts: [] 
    };
  },
  actions: {
    async fetchPosts(){
      try{
        const query = "https://jsonplaceholder.typicode.com/posts";
        const response = await useFetch(query);
        console.log(response);
        if (response.status.value === "error") {
          const msg = "could not get posts";
          throw new Error(msg);
        }
        else{
         if(response.data){
          this.posts = console.log(response.data.value);
         }
        }
      } catch(error){
        console.log(error.message);
      } finally{
        this.loading=false;
      }
    }
  },
  persist: true
});
 
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot));
}