<template>
    <div :style="this.shapeList[shapeIndex].style"
         class="shape"
         :index="shapeIndex"
         @mousedown.ctrl.exact = "dragAndDrop"
         @mousedown.shift.exact = "editShape"></div>
</template>

<script>
 export default {
     props: {
         shapeIndex: Number
     },

     inject: ['shapeList', 'shapeHeld'],

     methods: {
         dragAndDrop() {
             let target = this.$el;
             this.shapeHeld.val = this.shapeList[this.shapeIndex];

             let onMouseMove = (e) => {
                 e.preventDefault();
                 target.style.left = e.clientX / window.innerWidth * 100 + "%";
                 target.style.top = e.clientY / window.innerHeight * 100 + "%";
             };

             document.addEventListener('mousemove', onMouseMove);

             document.addEventListener('mouseup', (e) => {
                 document.removeEventListener('mousemove', onMouseMove);

                 let index = target.attributes.index.value;

                 this.shapeList[index].style = target.style.cssText;
             }, { once: true });
         },

         editShape() {
             this.shapeList[this.shapeIndex].currentlyEditing = true;
         }
     }
 }
</script>
