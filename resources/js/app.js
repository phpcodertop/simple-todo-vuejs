import AllTasks from "./components/AllTasks";

require('./bootstrap');

const app = new Vue({
    el: '#app',
    components: {
        AllTasks
    },
});
