<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h2>ToDoList - vuejs</h2>
    <input id="add-input"
           v-model="todoText"
           @keyup.enter="addTodo"
           placeholder="what is your main focus for today or Todo what ?" />
    <ul>
      <todo v-for="(todoItem, index) in todoList"
            :todoItem="todoItem"
            :index="index"></todo>
    </ul>
  </div>
</template>

<script>
import Todo from './components/todo.vue'
export default {
  name: 'todoList',
  components: {
    Todo
  },
  data() {
    return {
      todoText: ''
    }
  },
  computed: {
    todoList() {
      return this.$store.getters.todos
    }
  },
  methods: {
    addTodo() {
      this.$store.commit('addTodo', this.todoText)
      this.todoText = ''
    },
    deleteTodo(index) {
      this.$store.commit('deleteTodo', index)
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}

#app {
  width: 800px;
  margin: 30px auto;
  text-align: center;
}



#add-input {
  width: 750px;
  height: 35px;
  padding: 0 5px;
}

ul {
  list-style: none;
  padding: 0;
}
</style>
