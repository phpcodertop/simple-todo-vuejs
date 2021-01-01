<template>
    <ul class="todo-list">
        <li  v-for="task in tasks" class="animated flipInX "
             v-bind:class="[task.status ? 'danger' : 'done']" >
            <div class="checkbox">
                <span class="close" @click="deleteTodo(task.id)"><i class="fa fa-times"></i></span>
                <label @click.prevent="toggleStatus(task.id)">
                    <span class="checkbox-mask"></span><input type="checkbox" />
                    {{ task.description }}
                </label>
            </div>
        </li>
    </ul>
</template>

<script>
export default {
    props: ['tasks'],
    data() {
        return {
        };
    },
    methods: {

        deleteTodo(id) {
            axios.delete('/tasks/' + id)
            .then((response) => {
               this.$emit('todoDelete', id);
                Vue.notify({
                    group: 'foo',
                    title: 'Task Deleted',
                    text: 'Task Deleted Successfully.',
                    type: 'success ',
                });
            });
        },

        toggleStatus(id) {
            axios.put('/tasks/' + id)
                .then((response) => {
                    let status = this.tasks.find(task => task.id === id).status;
                    this.tasks.find(task => task.id === id).status = !status;
                    Vue.notify({
                        group: 'foo',
                        title: 'Task Updated',
                        text: 'Task Updated Successfully.',
                        type: 'success ',
                    });
                });
        }

    }
}
</script>
