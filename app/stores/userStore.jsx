import { create } from 'zustand'
import { persist } from "zustand/middleware"

export const useStore = create(
    persist(
        (set) => ({
            username: false,
            id: false,
            role: false,
            setUserName: (username) => set((state) => ({ username: username })),
            setUserID: (id) => set((state) => ({ id: id })),
            setUserRole: (role) => set((state) => ({ role: role })),
            setUsernameNull: () => set((state) => ({ username: false })),
            setIDNull: () => set((state) => ({ id: false })),
            setRoleNull: () => set((state) => ({ role: false }))
        }),
        { name: 'asdasdasdasdasdasds' }
    )
);
