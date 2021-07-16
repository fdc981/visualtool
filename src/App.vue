<template>
    <div id="app" v-on="{ contextmenu: openContextMenu, mousedown: closeContextMenu }">
        <div id="toolbar" class="row row-col-auto position-absolute bottom-0 px-4 py-3 gx-3">
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
            <div :key="shape.id" v-for="(shape, shapeIndex) in shapeList">
                <ShapeRender :shapeIndex="shapeIndex"></ShapeRender>
                <EditArea v-if="shape.currentlyEditing"
                          :shapeIndex="shapeIndex"></EditArea>
            </div>
        </div>

        <ul id="context-menu"
            :class="{ 'position-absolute': true, 'dropdown-menu': true, 'show': contextMenuVisible }">
            <li v-if="contextMenuTarget.className === 'shape'">
                <a href="#"
                   @click="editShape(shapeList[Number(contextMenuTarget.attributes.index.value)])"
                   class="dropdown-item">
                    edit shape
                </a>
            </li>
            <li v-if="contextMenuTarget.className === 'shape'">
                <a href="#"
                   @click="deleteShape(Number(contextMenuTarget.attributes.index.value))"
                   class="dropdown-item">
                    delete shape
                </a>
            </li>
            <li v-if="contextMenuTarget.className === 'shape'">
                <a href="#"
                   @click="copyShape(Number(contextMenuTarget.attributes.index.value))"
                   class="dropdown-item">
                    copy shape
                </a>
            </li>
            <li v-if="contextMenuTarget.id === 'display'">
                <a href="#" @click="addShape" class="dropdown-item">
                    add shape
                </a>
            </li>
            <li v-if="contextMenuTarget.id === 'display'">
                <a href="#" @click="saveShapeList" class="dropdown-item">
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

        <div id="shape-list" v-if="shapeListVisible">
            Shapes:
            <ul>
                <li v-for="shape in shapeList" class="shape-entry" :key="shape.id">
                    <span class="text-muted px-2">{{ shape.id }}</span>
                    <a @click="editShape(shape)">
                        {{ shape.name }}
                    </a>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
 import ContextMenu from "./components/ContextMenu"
 import EditArea from "./components/EditArea"
 import ShapeRender from "./components/ShapeRender"

 export default {
     data() {
         return {
             currID : 0,
             contextMenuVisible: false,
             contextMenuTarget: "",
             shapeList : [],
             shapeListVisible: true,
             following : false
         }
     },

     provide() {
         return {
             shapeList: this.shapeList
         }
     },

     mounted() {
         let sl = [];
         try {
             sl = JSON.parse(localStorage.getItem("shapeList"));
         }
         catch (e) {
             console.error(e);
         }

         const reducer = (acc, currVal) => {
             return Math.max(isNaN(currVal) ? 0 : currVal, acc);
         };

         if (sl !== null) {
             for (let el of sl) {
                 this.shapeList.push(el);
             }

             console.log(this.shapeList);
             this.currID = sl.map(x => Number(x.id)).reduce(reducer, 0) + 1;
         }
     },

     methods : {
         showShapeList() {
             console.log(this.shapeList);
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

         deleteShapeFromContextMenu() {
             let ind = Number(this.contextMenuTarget.attributes.index.value);

             this.deleteShape(ind);
         },

         deleteShape(ind) {
             this.shapeList = this.shapeList.filter((element, index) => {
                 return index !== ind;
             });
         },

         copyShape(ind) {
             // Copies a shape, assigning it with currID
             let newShape = JSON.parse(JSON.stringify(this.shapeList[ind]));
             newShape.id = this.currID;

             this.shapeList.push(newShape);

             this.currID += 1;
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
             if (e.target.className === "dropdown-item") {
                 return;
             }
             else {
                 e.preventDefault();
             }

             this.contextMenuVisible = true;
             this.contextMenuTarget = e.target;

             let menu = this.$el.querySelector("#context-menu");

             menu.style.left = e.pageX + "px";
             menu.style.top = e.pageY + "px";

             return false;
         },

         closeContextMenu(e) {
             if (this.contextMenuVisible && e.target.className !== "dropdown-item") {
                 this.contextMenuVisible = false;
                 return;
             }
         }
     },

     components : {
         ContextMenu,
         EditArea,
         ShapeRender
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

 #shape-list {
     position: absolute;
     padding: 1em;
     bottom: 0;
     right: 0;
 }

 #shape-list li {
     list-style: none;
 }
</style>
