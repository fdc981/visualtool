<template>
    <li v-show="condition">
        <a href="#"
           class="dropdown-item">
            <slot></slot>
        </a>
    </li>
</template>

<script>
 export default {
     props: {
         condition: Boolean,
     },

     inject: ['contextMenuTarget'],

     methods: {

     },
 }
</script>

<style>
</style>
