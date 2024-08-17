import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCourseworkStore = create()(
  persist(
    (set) => ({
      courseworkList: [],
      addCoursework: (coursework) =>
        set((state) => ({
          courseworkList: [...state.courseworkList, coursework],
        })),
      getCoursework: (id) =>
        set((state) =>
          state.courseworkList.find((coursework) => coursework.id === id)
        ),
    }),
    {
      name: "coursework-storage", // key for local storage
    }
  )
);
