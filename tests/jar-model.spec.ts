import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import * as THREE from 'three';

test('jar wall has continuous outward faces and smooth normals around its circumference', () => {
  for (const file of ['pasieka', 'pasieka-web']) {
    const bytes = readFileSync(`public/assets/glb/${file}.glb`);
    const jsonLength = bytes.readUInt32LE(12);
    const gltf = JSON.parse(bytes.subarray(20, 20 + jsonLength).toString());
    const primitive = gltf.meshes[0].primitives[0];
    const attribute = (id: number, width: number) => {
      const accessor = gltf.accessors[id];
      const view = gltf.bufferViews[accessor.bufferView];
      const Type = accessor.componentType === 5126 ? Float32Array : accessor.componentType === 5123 ? Uint16Array : Uint32Array;
      const start = bytes.byteOffset + 28 + jsonLength + (view.byteOffset || 0) + (accessor.byteOffset || 0);
      return new THREE.BufferAttribute(new Type(bytes.buffer.slice(start, start + accessor.count * width * Type.BYTES_PER_ELEMENT)), width);
    };
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', attribute(primitive.attributes.POSITION, 3));
    geometry.setAttribute('normal', attribute(primitive.attributes.NORMAL, 3));
    geometry.setIndex(attribute(primitive.indices, 1));
    const mesh = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ side: THREE.DoubleSide }));
    geometry.computeBoundingBox();
    const center = geometry.boundingBox!.getCenter(new THREE.Vector3());
    for (let degrees = 0; degrees < 360; degrees += 5) {
      const angle = THREE.MathUtils.degToRad(degrees);
      const radial = new THREE.Vector3(Math.sin(angle), 0, Math.cos(angle));
      const ray = new THREE.Raycaster(center.clone().addScaledVector(radial, 2), radial.clone().negate());
      const hit = ray.intersectObject(mesh)[0];
      const context = `${file} at ${degrees}°`;
      expect(hit, context).toBeDefined();
      expect(hit.distance, context).toBeGreaterThan(.99);
      expect(hit.distance, context).toBeLessThan(1.01);
      expect(hit.face!.normal.dot(radial), context).toBeGreaterThan(.98);
      expect(hit.normal!.normalize().dot(radial), context).toBeGreaterThan(.99);
    }
    geometry.dispose(); mesh.material.dispose();
  }
});
