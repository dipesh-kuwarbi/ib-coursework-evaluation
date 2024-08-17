import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCourseworkStore = create()(
  persist(
    (set, get) => ({
      courseworkList: [],
      addCoursework: (coursework) => {
        console.log(coursework);
        set((state) => ({
          courseworkList: [...state.courseworkList, coursework],
        }));
      },
      getCoursework: (id) =>
        get((state) =>
          state.courseworkList.find((coursework) => coursework.id === id)
        ),
      getCourseWorkList: () => get((state) => state.courseworkList),
    }),
    {
      name: "coursework-storage", // key for local storage
    }
  )
);
