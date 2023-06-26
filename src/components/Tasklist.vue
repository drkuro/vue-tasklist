<template>
  <div class="task-list">
    <form @submit.prevent="addTask">
      <label for="taskInput">Nouvelle tâche :</label>
      <input type="text" id="taskInput" v-model="newTask">
      <button type="submit">Ajouter</button>
    </form>

    <div class="filter-options">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">Toutes</button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">Terminées</button>
      <button @click="filter = 'uncompleted'" :class="{ active: filter === 'uncompleted' }">Non terminées</button>
    </div>

    <ul>
      <li v-for="task in filteredTasks" :key="task.id">
        <task :task="task" @remove="removeTask(task)" />
      </li>
    </ul>
  </div>
</template>

<script>
import Task from './Task.vue';
import { useTasksStore } from '../store/tasks.js'

export default {
  components: {
    Task // Enregistrement du composant Task
  },
  data() {
    return {
      newTask: '',
      editedTask: null,
      filter: 'all'
    };
  },
  methods: {
    addTask() {
      if (this.newTask.trim() !== '') {
        const tasksStore = useTasksStore();
        tasksStore.addTask(this.newTask);
        this.newTask = '';
      }
    },
    markTaskAsCompleted(task) {
      task.completed = true;
    },
    removeTask(task) {
      const index = this.tasks.indexOf(task);
      if (index > -1) {
        this.tasks.splice(index, 1);
      }
    },
    editTask(task) {
      this.editedTask = { ...task };
    },
    saveTaskEdit(task) {
      task.name = this.editedTask.name;
      this.editedTask = null;
    },
    cancelTaskEdit() {
      this.editedTask = null;
    }
  },
  computed: {
    filteredTasks() {
      switch (this.filter) {
        case 'completed':
          return this.tasks.filter(task => task.completed);
        case 'uncompleted':
          return this.tasks.filter(task => !task.completed);
        default:
          return this.tasks;
      }
    },
    tasks() {
      const tasksStore = useTasksStore();
      return tasksStore.tasks;
    }
  }
}
</script>


<style scoped>
.task-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.task-list form {
  margin-bottom: 10px;
}

.task-list label {
  margin-right: 10px;
}

.task-list .filter-options {
  margin-bottom: 10px;
}

.task-list .filter-options button {
  margin-right: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #eee;
  color: #333;
  cursor: pointer;
}

.task-list .filter-options button.active {
  background-color: #333;
  color: #fff;
}

.task-list ul {
  list-style: none;
  padding: 0;
}

.task-list li {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
}

.task-list li button {
  margin-left: 5px;
}

.task-list li input[type="text"] {
  margin-right: 5px;
}
</style>