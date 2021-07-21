<template>
    <ul id="context-menu"
        :class="{ 'position-absolute': true, 'dropdown-menu': true, 'show': contextMenuVisible }">
        <li v-if="contextMenuTarget.className === 'shape'">
            <a href="#"
               @click="$emit('editShape', shapeList[Number(contextMenuTarget.attributes.index.value)]); closeContextMenu($event)"
               class="dropdown-item">
                edit shape
            </a>
        </li>
        <li v-if="contextMenuTarget.className === 'shape'">
            <a href="#"
               @click="$emit('deleteShape', Number(contextMenuTarget.attributes.index.value)); closeContextMenu($event)"
               class="dropdown-item">
                delete shape
            </a>
        </li>
        <li v-if="contextMenuTarget.className === 'shape'">
            <a href="#"
               @click="$emit('copyShape', Number(contextMenuTarget.attributes.index.value)); closeContextMenu($event)"
               class="dropdown-item">
                copy shape
            </a>
        </li>
        <li v-if="contextMenuTarget.id === 'display'">
            <a href="#" @click="$emit('addShape', $event); closeContextMenu($event)" class="dropdown-item">
                add shape
            </a>
        </li>
        <li v-if="contextMenuTarget.id === 'display'">
            <a href="#" @click="$emit('saveShapeList', $event); closeContextMenu($event)" class="dropdown-item">
                save workspace
            </a>
        </li>
        <li v-if="contextMenuTarget.className === 'btn btn-toolbar'">
            <a class="dropdown-item">
                remove button
            </a>
        </li>
        <li v-if="contextMenuTarget.className === 'btn btn-toolbar'">
            <a class="dropdown-item">
                replace button
            </a>
        </li>
    </ul>
</template>

<script>
 export default {
     data() {
         return {
             contextMenuVisible: false,
             contextMenuTarget: "",
             eventListener: {}
         }
     },

     inject: ['shapeList'],

     methods : {
         closeContextMenu() {
             this.contextMenuVisible = false;
         }
     },

     mounted() {
         let vue = this;
         this.eventListener = document.addEventListener("contextmenu", (e) => {
             if (vue.contextMenuVisible) {
                 if (e.target.className === "dropdown-item" || e.target.id === "context-menu") {
                     return;
                 }
                 else {
                     e.preventDefault();
                 }
                 console.log(e.target);

                 vue.contextMenuVisible = false;
             }
             else if (!vue.contextMenuVisible) {
                 e.preventDefault();

                 vue.contextMenuVisible = true;
                 vue.contextMenuTarget = e.target;

                 let menu = vue.$el;

                 menu.style.left = e.pageX + "px";
                 menu.style.top = e.pageY + "px";
             }
         });

         document.addEventListener("mousedown", (e) => {
             if (vue.contextMenuVisible && e.target.className !== "dropdown-item" && e.button === 0) {
                 vue.contextMenuVisible = false;
                 return;
             }
         });
     }
 }
</script>

<style>
 ul#context-menu {
     z-index: 1;
 }
</style>
