<template>
    <div class="row">
        <notifications group="foo" />
        <div class="col-md-4 col-md-offset-4 col-xs-6 col-xs-offset-3">
            <div class="add-control">
                <form @submit.prevent="addTask" >
                    <div class="form-group has-feedback">
                        <input v-model="description" type="text" class="form-control" placeholder="✍️ Add item..."/>
                        <i @click="addTask" class="fa fa-plus form-control-feedback add-btn" title="Add item"></i>
                    </div>
                </form>
            </div>
            <vue-simple-spinner v-if="isLoading"></vue-simple-spinner>
            <todo-list :tasks="allTasks" @todoDelete="deleteTodo"></todo-list>
        </div>
    </div>
</template>

<script>
import TodoList from './TodoList';
import VueSimpleSpinner from 'vue-simple-spinner'

export default {
    data() {
      return {
          allTasks: [],
          description: '',
          isLoading: true
      };
    },
    components: {
        TodoList,
        VueSimpleSpinner
    },
    created() {
        axios.get('/tasks')
        .then(({data}) => {
            this.allTasks = data;
            this.isLoading = false;
        });
    },
    methods: {
        deleteTodo(id) {
            this.allTasks = this.allTasks.filter((e)=>e.id !== id );
        },

        addTask() {
            if (this.description == '') {
                Vue.notify({
                    group: 'foo',
                    title: 'Error',
                    text: 'Please add task description.',
                    type: 'error',
                });
                return;
            }
            axios.post('/tasks', {
                'description': this.description
            }).then(({data}) => {
                this.allTasks.unshift(data);
                this.description = '';
                Vue.notify({
                    group: 'foo',
                    title: 'Success',
                    text: 'Task Added Successfully.',
                    type: 'success',
                });
            });
        }
    }
}
</script>
