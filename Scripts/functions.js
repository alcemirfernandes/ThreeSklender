(function()
{
   var sceneObj = {
      WIDTH: 1024,
      HEIGHT: 768
   };

   var cameraAttr = {
      VIEW_ANGLE: 45,
      ASPECT: (sceneObj.WIDTH / sceneObj.HEIGHT),
      NEAR: 0.1,
      FAR: 10000
   };

   var canvasArea = document.getElementById("area");
   var renderer = new THREE.WebGLRenderer();
   var camera = new THREE.PerspectiveCamera(cameraAttr.VIEW_ANGLE,
                                            cameraAttr.ASPECT,
                                            cameraAttr.NEAR,
                                            cameraAttr.FAR);
   var scene = new THREE.Scene();

   var init = function()
   {
      camera.position.z = 300;
      renderer.setSize(sceneObj.WIDTH, sceneObj.HEIGHT);
      canvasArea.appendChild(renderer.domElement);

      renderer.render(scene, camera);
   };

   var mesh = (function()
   {
      return this;
   }());

   window.init = init;
   window.mesh = mesh;

   mesh.sphere = {
      sphereAttr: {
         radius: 50,
         segments: 16,
         rings: 16
      },
      create: function()
      {
         var sphereMaterial = new THREE.MeshLambertMaterial({ color: 0xCC0000 });
         var create = new THREE.Mesh(new THREE.SphereGeometry(this.sphereAttr.radius, this.sphereAttr.segments, this.sphereAttr.rings), sphereMaterial);

         scene.add(create);
      }
   };

   mesh.cube = {
      cubeAttr: {
         color: "black"
      }
   };
}());

// init();
console.log(mesh.sphere.sphereAttr);
mesh.sphere.create();
console.log(mesh.cube.cubeAttr.color);
//console.log(createMesh.sphereAttr.rings);
//console.log(createMesh.sphereAttr.segments);
// createMesh.createSphere();