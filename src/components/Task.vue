<template>
  <div class="task-item" :class="{ 'task-item--completed': task.completed }">
    <div v-if="editedTask === null">
      {{ task.name }}
      <button @click="editTask(task)">Modifier</button>
      <button @click="markTaskAsCompleted(task)">{{ task.completed ? 'En cour' : 'Terminée' }}</button>
      <button @click="removeTask(task)">Supprimer</button>
    </div>
    <div v-else>
      <input type="text" v-model="editedTask.name">
      <button @click="saveTaskEdit(task)">Enregistrer</button>
      <button @click="cancelTaskEdit">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  methods: {
    editTask(task) {
      this.editedTask = task;
    },
    saveTaskEdit(task) {
      task.name = this.editedTask.name;
      this.editedTask = null;
    },
    cancelTaskEdit() {
      this.editedTask = null;
    },
    markTaskAsCompleted(task) {
      task.completed = !task.completed;
    },
    removeTask(task) {
      this.$emit('remove', task);
    }
  },
  data() {
    return {
      editedTask: null,
    };
  }
}
</script>
<style scoped>
.task-item {
  background-color: #4c4747;
  color: #CCC;
  padding: 10px;
  border-radius: 5px;
}

.task-item--completed {
  background-color: #252525;
  color: #CCC;
  text-decoration: line-through;
}

.task-item input[type="text"] {
  width: 200px;
  margin-right: 5px;
}

.task-item button {
  margin-left: 5px;
  padding: 5px 10px;
  border: none;
  background-color: #333;
  color: #CCC;
  cursor: pointer;
}

.task-item button:hover {
  background-color: #333;
  color: #fff;
}
</style>