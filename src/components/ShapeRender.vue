<template>
    <div :style="this.$store.state.shapeList[shapeIndex].style"
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

     methods: {
         dragAndDrop() {
             let target = this.$el;
             this.$store.state.held = this.$store.state.shapeList[this.shapeIndex];

             let onMouseMove = (e) => {
                 e.preventDefault();
                 target.style.left = e.clientX / window.innerWidth * 100 + "%";
                 target.style.top = e.clientY / window.innerHeight * 100 + "%";
             };

             document.addEventListener('mousemove', onMouseMove);

             document.addEventListener('mouseup', (e) => {
                 document.removeEventListener('mousemove', onMouseMove);

                 let index = target.attributes.index.value;

                 this.$store.state.shapeList[index].style = target.style.cssText;
             }, { once: true });
         },

         editShape() {
             this.$store.state.shapeList[this.shapeIndex].currentlyEditing = true;
         }
     }
 }
</script>
