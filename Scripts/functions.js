(function()
{
   "use strict";

   var threeObj = window.THREE;

   var canvasSize = {
         WIDTH: 1024,
         HEIGHT: 768
   };

   var cameraAttr = {
      VIEW_ANGLE: 90,
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

   var setLight = function()
   {
      var pointLight = new threeObj.PointLight(0xFFFFFF);
      pointLight.position.x = 500;
      pointLight.position.y = 300;
      pointLight.position.z = 500;

      scene.add(pointLight);
   };

   var render = function()
   {
      camera.position.z = 300;
      renderer.setSize(canvasSize.WIDTH, canvasSize.HEIGHT);
      canvasArea.appendChild(renderer.domElement);

      renderer.render(scene, camera);
   };

   var mesh = function(){ return this; };

   mesh.meshMaterial = new threeObj.MeshLambertMaterial({ color: 0x0000CC, wireframe: false });
   mesh.sphere = {
      sphereAttr: {
         radius: 80,
         segments: 200,
         rings: 100
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
   window.mesh = mesh;
   window.setLight = setLight;
   window.render = render;
}());

mesh.sphere.create();
setLight();
render();
/** /
console.log(mesh);
console.log(mesh.meshMaterial);
console.log(mesh.meshMaterial.color);
console.log(mesh.sphere.sphereAttr);
console.log(mesh.cube.cubeAttr.color);
/**/