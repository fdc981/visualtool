<template>
    <button class="btn btn-toolbar" @click="save"><slot></slot></button>
</template>

<script>
export default {
    methods : {
        save() {
            localStorage.setItem("shapeList", JSON.stringify(this.$parent.shapeList));
        }
    }
};
</script>
