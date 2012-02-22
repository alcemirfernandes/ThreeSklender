(function()
{
   "use strict";

   var threeObj = window.THREE;
   console.log(threeObj);

   var canvasSize = {
      WIDTH: 1024,
      HEIGHT: 768
   };

   var cameraAttr = {
      VIEW_ANGLE: 45,
      ASPECT: (canvasSize.WIDTH / canvasSize.HEIGHT),
      NEAR: 0.1,
      FAR: 10000
   };

   var canvasArea = document.getElementById("area");
   var renderer = new threeObj.WebGLRenderer();
   var camera = new threeObj.PerspectiveCamera(cameraAttr.VIEW_ANGLE,
                                               cameraAttr.ASPECT,
                                               cameraAttr.NEAR,
                                               cameraAttr.FAR);
   var scene = new threeObj.Scene();

   var init = function()
   {
      camera.position.z = 300;
      renderer.setSize(canvasSize.WIDTH, canvasSize.HEIGHT);
      canvasArea.appendChild(renderer.domElement);

      renderer.render(scene, camera);
   };

   var mesh = function(){ return this; };

   mesh.meshMaterial = new threeObj.MeshLambertMaterial({ color: 0xCC00FF });
   mesh.sphere = {
      sphereAttr: {
         radius: 50,
         segments: 16,
         rings: 16
      },
      create: function()
      {
         var sphereMesh = new threeObj.Mesh(new threeObj.SphereGeometry(this.sphereAttr.radius,
                                                                        this.sphereAttr.segments,
                                                                        this.sphereAttr.rings), mesh.meshMaterial);
         scene.add(sphereMesh);
      }
   };

   mesh.cube = {
      cubeAttr: {
         color: 0xCCDDCC
      }
   };

   window.threeObj = threeObj;
   window.init = init;
   window.mesh = mesh;
}());

/**/
init();

console.log(mesh);
console.log(mesh.meshMaterial);
console.log(mesh.meshMaterial.color);
console.log(mesh.sphere.sphereAttr);
mesh.sphere.create();

console.log(mesh.cube.cubeAttr.color);
/**/