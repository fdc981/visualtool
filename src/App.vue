<template>
    <div id="app">
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
                <button class="btn btn-toolbar" @click="exportVisual">export</button>
            </div>
            <div class="col">
                <button class="btn btn-toolbar" @click="saveShapeList">save workspace</button>
            </div>
        </div>

        <div id="display" class="vh-100 vw-100">
            <div :key="shape.id" v-for="(shape, shapeIndex) in shapeList">
                <ShapeRender :shapeIndex="shapeIndex"></ShapeRender>
                <EditArea :shapeIndex="shapeIndex"></EditArea>
            </div>
        </div>

        <ContextMenu @editShape="editShape"
                     @deleteShape="deleteShape"
                     @copyShape="copyShape"
                     @addShape="addShape"
                     @saveShapeList="saveShapeList"
                     @openCollection="openCollection"
                     @closeCollection="closeCollection"
                     :collectionVisible="collectionVisible">
        </ContextMenu>

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

        <Collection :collectionVisible="collectionVisible"></Collection>

    </div>
</template>

<script>
 import ContextMenu from "./components/ContextMenu"
 import EditArea from "./components/EditArea"
 import ShapeRender from "./components/ShapeRender"
 import Collection from "./components/Collection"

 export default {
     data() {
         return {
             currID : 0,
             shapeList : [],
             shapeListVisible: true,
             following : false,
             collectionVisible : false,
             shapeHeld : null,
         }
     },

     provide() {
         return {
             shapeList: this.shapeList,
             shapeHeld: { val: this.shapeHeld },
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
         addShape() {
             this.shapeList.push({
                 id : this.currID,
                 name : "Unnamed " + this.currID,
                 style : "position: absolute; width: 50px; height: 50px; background-color: rgba(0,0,0,0.5);",
                 currentlyEditing : false
             });

             this.currID += 1;
         },

         deleteShape(targetShapeNode) {
             let ind = Number(targetShapeNode.attributes.index.value);
             this.shapeList = this.shapeList.filter((element, index) => {
                 return index !== ind;
             });
         },

         copyShape(targetShapeNode) {
             // Copies a shape, assigning it with currID
             let ind = Number(targetShapeNode.attributes.index.value);
             let newShape = JSON.parse(JSON.stringify(this.shapeList[ind]));
             newShape.id = this.currID;

             this.shapeList.push(newShape);

             this.currID += 1;
         },

         editShape(targetShapeNode) {
             let shape = this.shapeList[Number(targetShapeNode.attributes.index.value)];
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

         openCollection(e) {
             console.log("called");
             this.collectionVisible = true;
         },

         closeCollection(e) {
             this.collectionVisible = false;
         },

         exportVisual() {
             let result = new Blob([this.$el.querySelector("#display").innerHTML], {type: 'text/html'});

             function prompt_download(blob, file_name) {
                 console.log("prompting download for:", file_name);
                 // force prompt download by clicking on a generated <a>
                 // credit: https://davidwalsh.name/javascript-download
                 const a = document.createElement('a');
                 a.style.display = 'none';
                 document.body.appendChild(a);

                 a.href = window.URL.createObjectURL(blob);

                 a.setAttribute("download", file_name);

                 a.click();

                 window.URL.revokeObjectURL(a.href);
                 document.body.removeChild(a);
             }

             prompt_download(result, "export.html");
         },
     },

     components : {
         ContextMenu,
         EditArea,
         ShapeRender,
         Collection
     }
 }
</script>

<style>
 button.btn-toolbar {
     width: 100px;
     height: 100px;

     border: 2px solid rgba(200, 200, 200, 0.5);
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

 body {
     overflow: hidden;
 }
</style>
