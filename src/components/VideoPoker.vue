<template>
    <div>
        {{getVariable}}
    </div>
</template>
<script>

export default {
    computed: {
        getVariable(){
            return this.$store.state.variable
        }
    }
    
}
</script>

<style scoped>

</style>