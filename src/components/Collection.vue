<template>
    <div id="collection"
         style="left: 0px; top: 0px; width: 100px; height: 100px"
         @mousedown.ctrl.exact="dragAndDrop">
        <span v-for="shape in collection"
              :key="shape.id"
              class="text-muted">
            {{ shape.name }}
        </span>
    </div>
</template>

<script>
 export default {
     data() {
         return {
             collection : [],
         }
     },

     inject: ['shapeHeld'],

     mounted() {
         // if user was dragging a shape on mouse up, add shape to collection

         document.addEventListener('mouseup', (e) => {
             if (this.shapeHeld.val && this.withinRange(e.clientX, e.clientY)) {
                 this.collection.push({
                     typve: "shape",
                     name: this.shapeHeld.val.name,
                     style: this.shapeHeld.val.style
                 });
             }

             this.shapeHeld.val = null;
         });
     },

     methods: {
         dragAndDrop() {
             let target = this.$el;

             let onMouseMove = (e) => {
                 e.preventDefault();
                 target.style.left = e.clientX + "px";
                 target.style.top = e.clientY + "px";
             };

             document.addEventListener('mousemove', onMouseMove);

             document.addEventListener('mouseup', (e) => {
                 document.removeEventListener('mousemove', onMouseMove);
             }, { once: true });
         },

         withinRange(x, y) {
             let left = Number(this.$el.style.left.replace(/px/, ''));
             let top = Number(this.$el.style.top.replace(/px/, ''));
             let width = Number(this.$el.style.width.replace(/px/, ''));
             let height = Number(this.$el.style.height.replace(/px/, ''));

             return (x >= left) && (x <= left + width) && (y >= top) && (y <= top + height);
         },
     },
 }
</script>

<style>
 #collection {
     position: absolute;

     border: 1px solid grey;
     background-color: 1px solid white;
 }
</style>
