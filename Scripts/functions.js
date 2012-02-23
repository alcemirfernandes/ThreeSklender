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

   var camera = new threeObj.PerspectiveCamera(cameraAttr.VIEW_ANGLE, cameraAttr.ASPECT, cameraAttr.NEAR, cameraAttr.FAR);

   camera.position.x = 0;
   camera.position.y = 1000;
   camera.position.z = -600;
   // camera.lookAt(new threeObj.Vector3(100, 300, 0));

   var scene = new threeObj.Scene();

   var controller = new threeObj.TrackballControls(camera, renderer.domElement);
      controller.rotateSpeed = 2;
      controller.zoomSpeed = 5;
      controller.panSpeed = 2;
      controller.noZoom = false;
      controller.noPan = false;
      controller.staticMoving = true;
      controller.dynamicDampingFactor = 0.3;
//      controller.minDistance = 0;
//      controller.maxDistance = 30000;

   var setLight = function(xCoord, yCoord, zCoord, lightColor)
   {
      var pointLight = new threeObj.PointLight(lightColor);
      pointLight.position.x = xCoord;
      pointLight.position.y = yCoord;
      pointLight.position.z = zCoord;

      scene.add(pointLight);
   };

   var render = function()
   {
      requestAnimationFrame(render);
      controller.update();
      renderer.render(scene, camera);
   };

   var mesh = function(){return this;};

   mesh.coordinateSystem = {
      create: function()
      {



//         var text = new threeObj.Mesh(new threeObj.TextGeometry("blaaaaaaaaaaaaaa"),
//                                      new threeObj.MeshBasicMaterial({ color: 0xff0000 }));


         var text = new threeObj.TextGeometry("blaaaaaaaaaaaaaa", { size: 2 });
         text.computeBoundingBox();
         text.computeVertexNormals();

         var textMesh = new threeObj.Mesh( text, new threeObj.MeshFaceMaterial({ color: 0xff0000 }) );
         textMesh.position.x = 22;
         textMesh.position.y = 0;
         textMesh.position.z = 0;

//         textMesh1.rotation.x = 0;
//         textMesh1.rotation.y = Math.PI * 2;



         scene.add(textMesh);

         var x = new threeObj.Mesh(new threeObj.CubeGeometry(200, 2, 2, 2, 2, 2),
                                   new threeObj.MeshBasicMaterial({ color: 0xff0000 })),
             y = new threeObj.Mesh(new threeObj.CubeGeometry(2, 200, 2, 2, 2, 2),
                                   new threeObj.MeshBasicMaterial({ color: 0x00ff00 })),
             z = new threeObj.Mesh(new threeObj.CubeGeometry(2, 2, 200, 2, 2, 2),
                                   new threeObj.MeshBasicMaterial({ color: 0x0000ff }));

         scene.add(x);
         scene.add(y);
         scene.add(z);
      }
   };

   mesh.grid = {
      create: function(materialObj)
      {
         var geometry = new threeObj.Geometry();
         geometry.vertices.push(new threeObj.Vertex(new threeObj.Vector3(-5000, 0, 0)));
         geometry.vertices.push(new threeObj.Vertex(new threeObj.Vector3(5000, 0, 0)));

         var material = new threeObj.LineBasicMaterial(materialObj);
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
   };

   mesh.sphere = {
      create: function(sphereAttrObj)
      {
         var sphereMesh = new threeObj.Mesh(new threeObj.SphereGeometry(sphereAttrObj.radius,
                                                                        sphereAttrObj.segments,
                                                                        sphereAttrObj.rings), sphereAttrObj.materialObj);
         sphereMesh.position = new threeObj.Vector3(sphereAttrObj.xCoord,
                                                    sphereAttrObj.yCoord,
                                                    sphereAttrObj.zCoord);
         scene.add(sphereMesh);
      }
   };

   mesh.cube = {
      create: function(cubeAttrObj)
      {
         var cubeMesh = new threeObj.Mesh(new threeObj.CubeGeometry(cubeAttrObj.width,
                                                                    cubeAttrObj.height,
                                                                    cubeAttrObj.depth, 20, 20, 20), cubeAttrObj.materialObj);
         cubeMesh.position = new threeObj.Vector3(cubeAttrObj.xCoord, cubeAttrObj.yCoord, cubeAttrObj.zCoord);
         scene.add(cubeMesh);
      }
   };

   window.threeObj = threeObj;
   window.mesh = mesh;
   window.setLight = setLight;
   window.render = render;
}());

mesh.coordinateSystem.create();
mesh.grid.create({ color: 0xCCCCCC, opacity: 0.2 });

//var sphereAttributes = {
//   rings: 100,
//   segments: 2,
//   radius: 200,
//   xCoord: 100,
//   yCoord: 100,
//   zCoord: 50,
//   materialObj: new threeObj.MeshLambertMaterial({ color: 0x00CC00, wireframe: true })
//};
//mesh.sphere.create(sphereAttributes);
//
//var cubeAttributes = {
//   width: sphereAttributes.radius * 3,
//   height: sphereAttributes.radius * 3,
//   depth: sphereAttributes.radius * 3,
//   xCoord: sphereAttributes.xCoord,
//   yCoord: sphereAttributes.yCoord,
//   zCoord: sphereAttributes.zCoord,
//   materialObj: new threeObj.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true})
//};
//mesh.cube.create(cubeAttributes);

//cubeAttributes = {
//   width: 2000,
//   height: 20,
//   depth: 2000,
//   xCoord: 0,
//   yCoord: 0,
//   zCoord: 0,
//   materialObj: new threeObj.MeshLambertMaterial({color: 0xAAFF22, wireframe: false})
//};
//mesh.cube.create(cubeAttributes);

setLight(-500, 500, 0, 0xFFFFFF);
render();


/** /
console.log(mesh);
console.log(mesh.meshMaterial);
console.log(mesh.meshMaterial.color);
console.log(mesh.sphere.sphereAttr);
console.log(mesh.cube.cubeAttr.color);
/**/


//         var plane = new THREE.PlaneGeometry(8, 8, 8, 8);
//
//         console.log(plane.faceVertexUvs[0]);
//   for ( i = 0; i < plane.faceVertexUvs[ 0 ].length; i ++ ) {
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