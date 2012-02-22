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
   renderer.setSize(canvasSize.WIDTH, canvasSize.HEIGHT);
   canvasArea.appendChild(renderer.domElement);

   var camera = new threeObj.PerspectiveCamera(cameraAttr.VIEW_ANGLE,
                                               cameraAttr.ASPECT,
                                               cameraAttr.NEAR,
                                               cameraAttr.FAR);
   camera.position.x = 100;
   camera.position.y = 100;
   camera.position.z = -400;

   var scene = new threeObj.Scene();

   var controller = {
      trackBall: new threeObj.TrackballControls(camera),
      rotateSpeed: 1.0,
      zoomSpeed: 1.2,
      panSpeed: 1,
      noZoom: false,
      noPan: true,
      staticMoving: true,
      dynamicDampingFactor: 0.3,
      minDistance: 400,
      maxDistance: 400
   };

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
      requestAnimationFrame(render);
      controller.trackBall.update();
      renderer.render(scene, camera);
   };

   var mesh = function(){return this;};

   mesh.grid = {

      create: function()
      {
         // Grid
         var geometry = new threeObj.Geometry();
         geometry.vertices.push(new threeObj.Vertex(new threeObj.Vector3(-5000, 0, 0)));
         geometry.vertices.push(new threeObj.Vertex(new threeObj.Vector3(5000, 0, 0)));

         var material = new threeObj.LineBasicMaterial({ color: 0xffffff, opacity: 0.2 });
         var xLine = 0, zLine = 0;

         for(var i = 0; i <= 200; i++)
         {
            zLine = new threeObj.Line(geometry, material);
            zLine.position.z = (i * 50) - 5000;
            scene.add(zLine);

            xLine = new threeObj.Line(geometry, material);
            xLine.position.x = (i * 50) - 5000;
            xLine.rotation.y = 90 * Math.PI / 180;
            scene.add(xLine);
         }
      }
   }

   mesh.sphere = {
      sphereAttr: {
         radius: 80,
         segments: 200,
         rings: 100
      },
      create: function(xCoord, yCoord, zCoord, materialObj)
      {
         var material = new threeObj.MeshLambertMaterial(materialObj);
         var sphereMesh = new threeObj.Mesh(new threeObj.SphereGeometry(this.sphereAttr.radius,
                                                                        this.sphereAttr.segments,
                                                                        this.sphereAttr.rings), material);
         sphereMesh.position = new threeObj.Vector3(xCoord, yCoord, zCoord);
         scene.add(sphereMesh);
      }
   };

   mesh.cube = {
      cubeAttr: {
         width: 10,
         height: 10,
         depth: 10
      },
      create: function(xCoord, yCoord, zCoord, materialObj)
      {
         var material = new threeObj.MeshLambertMaterial(materialObj);
         var cubeMesh = new threeObj.Mesh(new threeObj.CubeGeometry(this.cubeAttr.width,
                                                                    this.cubeAttr.height,
                                                                    this.cubeAttr.depth), material);

//         var plane = new THREE.PlaneGeometry(8, 8, 8, 8);
//
//         console.log(plane.faceVertexUvs[0]);
//	for ( i = 0; i < plane.faceVertexUvs[ 0 ].length; i ++ ) {
//
//		uvs = plane.faceVertexUvs[ 0 ][ i ];
//
//		for ( j = 0; j < uvs.length; j ++ ) {
//
//			uvs[ j ].u *= 8;
//			uvs[ j ].v *= 8;
//
//		}
//	}
         cubeMesh.position = new threeObj.Vector3(xCoord, yCoord, zCoord);
         scene.add(cubeMesh);
      }
   };

   window.threeObj = threeObj;
   window.mesh = mesh;
   window.setLight = setLight;
   window.render = render;
}());

//mesh.sphere.sphereAttr.rings = 4;
//mesh.sphere.create(10, 10, 5, { color: 0x00CC00, wireframe: false });
//
//mesh.sphere.sphereAttr.rings = 100;
//mesh.sphere.sphereAttr.radius = 99;
//mesh.sphere.create(100, 100, 5, {color: 0x0000CC, wireframe: true});

mesh.grid.create();
mesh.cube.cubeAttr.width = 200;
mesh.cube.cubeAttr.depth = 200;
mesh.cube.create(0, 0, 0, {color: 0xAAFF22, wireframe: true})

setLight();
render();
/** /
console.log(mesh);
console.log(mesh.meshMaterial);
console.log(mesh.meshMaterial.color);
console.log(mesh.sphere.sphereAttr);
console.log(mesh.cube.cubeAttr.color);
/**/