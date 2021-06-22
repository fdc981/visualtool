<template>
    <div id="app" v-on="{ contextmenu: openContextMenu }">
        <div class="row row-col-auto position-absolute bottom-0 px-4 py-3 gx-3">
            <div class="col">
                <button class="btn btn-toolbar" @click="addShape">add shape</button>
            </div>
            <div class="col">
                <button class="btn btn-toolbar">add anim</button>
            </div>
            <div class="col">
                <button class="btn btn-toolbar">delete</button>
            </div>
            <div class="col">
                <button class="btn btn-toolbar" @click="saveShapeList">save</button>
            </div>
        </div>

        <div id="display" class="vh-100 vw-100">
            <template v-for="(shape, shapeIndex) in shapeList">
                <div :style="shape.style"
                 class="shape"
                 :index="shapeIndex"
                 @mousedown.ctrl.exact = "followMouse"
                 @mousedown.shift.exact = "editShape(shape)"></div>
                <EditArea v-if="shape.currentlyEditing" :shape="shape"></EditArea>
            </template>
        </div>

        <div id="context-menu" :class="{ 'position-absolute': true, 'd-none': contextMenuInvisible }">
            <li v-if="contextMenuTarget.className === 'shape'">
                <a href="#" @click="deleteShape">
                    delete shape
                </a>
            </li>
            <li v-if="contextMenuTarget.id === 'display'">
                <a href="#" @click="addShape">
                    add shape
                </a>
            </li>
            <li v-if="contextMenuTarget.id === 'display'">
                <a href="#" @click="saveShapeList">
                    save workspace
                </a>
            </li>
        </div>
    </div>
</template>

<script>
 import ContextMenu from "./components/ContextMenu"
 import EditArea from "./components/EditArea"

 export default {
     data() {

         //////////////////////////////////////////////////
         // this code should probably be in mounted()
         let sl = [];
         try {
             sl = JSON.parse(localStorage.getItem("shapeList"));
         }
         catch {}
         /////////////////////////////////////////////////


         return {
             currID : 0,
             contextMenuInvisible: true,
             contextMenuTarget: "",
             shapeList : sl,
             following : false
         }
     },

     methods : {
         showShapeList() {
             console.log(this.shapeList);
         },

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

                 this.shapeList[index].style = target.style.cssText;
             }, { once: true });
         },

         addShape() {
             this.shapeList.push({
                 id : this.currID,
                 name : "Unnamed " + this.currID,
                 style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                 currentlyEditing : false
             });

             this.currID += 1;
         },

         deleteShape(ind) {
         },

         editShape(shape) {
             shape.currentlyEditing = true;
         },

         saveShapeList() {
             localStorage.setItem("shapeList", JSON.stringify(this.shapeList));
         },

         updatePos(e) {
             this.following = false;

             e.target.style.left = e.clientX / window.innerWidth + "%";
             e.target.style.top = e.clientY / window.innerHeight + "%";
         },

         openContextMenu(e) {
             e.preventDefault();

             if (!this.contextMenuInvisible) {
                 this.contextMenuInvisible = true;
                 return;
             }

             this.contextMenuInvisible = false;
             this.contextMenuTarget = e.target;

             let menu = this.$el.querySelector("div#context-menu");
             console.log(e.target);

             menu.style.left = e.pageX + "px";
             menu.style.top = e.pageY + "px";

             // document.addEventListener('mousedown', () =>
             //     document.addEventListener('mouseup', () => this.contextMenuVisible = false, {once : true}),
             // {once : true});

             return false;
         }
     },

     components : {
         ContextMenu,
         EditArea,
     }
 }
</script>

<style>
 button.btn-toolbar {
    width: 100px;
    height: 100px;

    border: 3px solid rgba(200, 200, 200, 0.5);
    border-radius: 10px;
    align-items: center;
    justify-content: center;
}
</style>
