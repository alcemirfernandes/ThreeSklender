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

   camera.position.z = 300;
   renderer.setSize(sceneObj.WIDTH, sceneObj.HEIGHT);
   canvasArea.appendChild(renderer.domElement);

   renderer.render(scene, camera);
}());