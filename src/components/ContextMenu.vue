<template>
    <ul id="context-menu"
        :class="{ 'position-absolute': true, 'dropdown-menu': true, 'show': true }"
        v-show="contextMenuVisible">
        <ContextMenuItem :condition="contextMenuTarget.className === 'shape'" @click.native="action('editShape')">
            edit shape
        </ContextMenuItem>
        <ContextMenuItem :condition="contextMenuTarget.className === 'shape'" @click.native="action('deleteShape')">
            delete shape
        </ContextMenuItem>
        <ContextMenuItem :condition="contextMenuTarget.className === 'shape'" @click.native="action('copyShape')">
            copy shape
        </ContextMenuItem>
        <ContextMenuItem :condition="contextMenuTarget.id === 'display'" @click.native="action('addNewShape')">
            add shape
        </ContextMenuItem>
        <ContextMenuItem :condition="contextMenuTarget.id === 'display'" @click.native="action('saveShapeList')">
            save workspace
        </ContextMenuItem>
        <ContextMenuItem :condition="contextMenuTarget.id === 'display' && !collectionVisible" @click.native="action('openCollection')">
            open collection
        </ContextMenuItem>
        <ContextMenuItem :condition="(contextMenuTarget.id === 'display' || contextMenuTarget.id === 'collection') && collectionVisible"
                         @click.native="action('closeCollection')">
            close collection
        </ContextMenuItem>
        <ContextMenuItem :condition="contextMenuTarget.className === 'btn btn-toolbar'">
            remove button
        </ContextMenuItem>
        <ContextMenuItem :condition="contextMenuTarget.className === 'btn btn-toolbar'">
            replace button
        </ContextMenuItem>
    </ul>
</template>

<script>
 import ContextMenuItem from "./ContextMenuItem"

 export default {
     data() {
         return {
             contextMenuVisible: false,
             contextMenuTarget: { id: null, className: null },
             eventListener: {}
         }
     },

     props: {
         collectionVisible: Boolean
     },

     provide() {
         return {
             contextMenuTarget: this.contextMenuTarget,
         }
     },

     methods : {
         closeContextMenu() {
             this.contextMenuVisible = false;
         },

         action(actionName) {
             // Invoke an action
             this.$store.commit(actionName, this.contextMenuTarget);
             this.closeContextMenu();
         },
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

                 vue.contextMenuVisible = false;
             }
             else if (!vue.contextMenuVisible) {
                 e.preventDefault();

                 vue.contextMenuVisible = true;
                 vue.contextMenuTarget = e.target;

                 let menu = vue.$el;

                 menu.style.left = e.pageX - 5 + "px";
                 menu.style.top = e.pageY - 5 + "px";


             }
         });

         document.addEventListener("mousedown", (e) => {
             if (vue.contextMenuVisible && e.target.className !== "dropdown-item" && e.button === 0) {
                 vue.contextMenuVisible = false;
                 return;
             }
         });
     },

     components: {
         ContextMenuItem,
     }
 }
</script>

<style>
 ul#context-menu {
     z-index: 1;
 }
</style>
