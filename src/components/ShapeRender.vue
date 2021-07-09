<template>
    <div :style="this.$parent.shapeList[shapeIndex].style"
         class="shape"
         :index="shapeIndex"
         @mousedown.ctrl.exact = "followMouse"
         @mousedown.shift.exact = "editShape"></div>
</template>

<script>
 export default {
     props: {
         shapeIndex: Number
     },

     methods: {
         followMouse(e) {
             let target = e.target;

             let onMouseMove = (e) => {
                 target.style.left = e.clientX / window.innerWidth * 100 + "%";
                 target.style.top = e.clientY / window.innerHeight * 100 + "%";
             };

             document.addEventListener('mousemove', onMouseMove);

             document.addEventListener('mouseup', (e) => {
                 document.removeEventListener('mousemove', onMouseMove);

                 let index = target.attributes.index.value;

                 this.$parent.shapeList[index].style = target.style.cssText;
             }, { once: true });
         },

         editShape() {
             this.$parent.shapeList[this.shapeIndex].currentlyEditing = true;
         }
     }
 }
</script>
