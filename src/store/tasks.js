import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
  }),
  actions: {
    addTask(taskName) {
      this.tasks.push({
        id: Date.now(),
        name: taskName,
        completed: false,
        dueDate: new Date().toISOString().substr(0, 10)
      });
    }
  }
});