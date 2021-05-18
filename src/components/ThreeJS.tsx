import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { Palette } from "../shared/color-palette";

const updateScene = (root: HTMLDivElement, newElement: HTMLCanvasElement) => {
  const oldInstance = root;
  if (oldInstance.childNodes.length > 0) {
    root.replaceChild(newElement, oldInstance.childNodes[0]);
  } else {
    root.append(newElement);
  }
};

// https://threejsfundamentals.org/threejs/lessons/threejs-fundamentals.html
const runTHREE = (threeJSWrapper) => {
  //   threeJSWrapper.current.removeChild(threeJSWrapper.current);
  /* CAMERA */
  const frustum = {
    fieldOfView: 75, // 75 degrees in the vertical dimension. Note that most angles in three.js are in radians but for some reason the perspective camera takes degrees
    aspect: 2, // the canvas default, by default a canvas is 300x150 pixels
    near: 0.1, // things before near will be clipped
    far: 5, // the end of the view
  };

  const camera = new THREE.PerspectiveCamera(
    frustum.fieldOfView,
    frustum.aspect,
    frustum.near,
    frustum.far
  );
  camera.position.z = 2;

  /* SCENE */
  var scene = new THREE.Scene();

  /* GEOMETRY */
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  /* MATERIAL */
  const material = new THREE.MeshBasicMaterial({ color: 0x44aa88 });

  /* MESH */
  const cube = new THREE.Mesh(geometry, material);

  // Add mesh to the scene
  scene.add(cube);

  /* RENDERER */
  var renderer = new THREE.WebGLRenderer();

  const animate = () => {
    cube.rotation.x -= 0.1;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  updateScene(threeJSWrapper.current, renderer.domElement);
};

export const ThreeJS = () => {
  const threeJSWrapper = useRef<HTMLDivElement>();
  useEffect(() => {
    if (threeJSWrapper !== null) runTHREE(threeJSWrapper);
  }, [threeJSWrapper]);

  return <div ref={threeJSWrapper} />;
};
