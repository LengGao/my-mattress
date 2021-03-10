<template>
 <div class="page-modify">
     <MyHead v-bind="$attrs"  @click="handlerClose"> </MyHead>
     <div v-if="type === 'edit'">
            edit
     </div>
     <div v-else-if="type === 'add'">
            add
     </div>
     <div v-else>
            other
     </div>
 </div>
</template>

<script>
import MyHead from '@/components/MyHeader/index'
 export default {
    components: {MyHead},
    props: {
        title: String,
        type: String
    },
    methods: {
        handlerClose() {
            console.log("triggle");
            this.$emit('close',false,this.type)
        }
    }
 }
</script>

<style scoped>

</style>