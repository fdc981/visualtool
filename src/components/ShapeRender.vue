<template>
    <div :style="this.$parent.shapeList[shapeIndex].style"
         class="shape"
         :index="shapeIndex"
         @mousedown.ctrl.exact = "followMouse"
         @mousedown.shift.exact = "editShape(shape)"></div>
</template>

<script>
 export default {
     props: {
         shapeIndex: Number
     }
 }
</script>
