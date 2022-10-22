import create from "zustand";

const useAppStore = create((set) => ({
  posts: [],
  imageData: "",
  addPost: (newPost) =>
    set((state) => ({
      posts: [...state.posts, newPost],
    })),
  removePost: (postId) =>
    set((state) => [...state.filter((item) => item.id !== postId)]),
  setImageData: (data) => set(data),
}));

export { useAppStore };
