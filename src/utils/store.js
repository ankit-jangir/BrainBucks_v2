import { create } from 'zustand'

export const useRoom = create((set) => ({
    currentRoom: {},
    setCurrentRoom: (newRoom) => set(() => ({ currentRoom: newRoom }))
}))