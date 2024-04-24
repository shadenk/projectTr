import { defineStore } from "pinia";
 
export const usePostsStore = defineStore({
  id: "posts-store",
  state: () => {
    return {
      posts: [],
      loading: false, 
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
          this.posts = response.data.value;
         }
        }
      } catch(error){
        console.log(error.message);
      } finally{
        this.loading=false;
      }
    },
    async addPosts(postData){
      try{
        const query = "https://jsonplaceholder.typicode.com/posts";
        const response = await useFetch(query,  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });
        
        console.log(response);
        if (!response.ok) {
          const errorMessage = response.statusText;
          throw new Error(`Failed to add post: ${errorMessage}`);
        }
    
        const data = await response.json();
        this.posts.push(data); //new post object
    
        console.log("Post added successfully:", data);
      } catch (error) {
        console.error("Error adding post:", error.message);
      } finally{
        this.loading=false;
      }
    },
    async updatePost(postData) {
      try {
        const query = `https://jsonplaceholder.typicode.com/posts/${postData.id}`;
        const response = await useFetch(query, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: postData.title,
            body: postData.body,
            userId: postData.userId,
          }),
        });

        if (!response.ok) {
          const errorMessage = response.statusText;
          throw new Error(`Failed to update post: ${errorMessage}`);
        }

        const updatedPost = await response.json();
        // Update the post in the store's state
        const index = this.posts.findIndex((post) => post.id === postData.id);
        if (index !== -1) {
          this.posts.splice(index, 1, updatedPost);
        } else {
          throw new Error("Post not found in store");
        }

        console.log("Post updated successfully:", updatedPost);
      } catch (error) {
        console.error("Error updating post:", error.message);
      } finally {
        this.loading = false;
      }
    },
  },
  persist: true
});
 
if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePostsStore, import.meta.hot));
} 