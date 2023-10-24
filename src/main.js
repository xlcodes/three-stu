import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import WebGL from 'three/examples/jsm/capabilities/WebGL.js'
// 创建一个场景
const scene = new THREE.Scene()

// 创建矩形物体
const geometry = new THREE.BoxGeometry(10, 10, 10, 5, 1, 1)
// 创建材质对象
const material = new THREE.MeshLambertMaterial({color: 0xffdd00, wireframe: false})
// 创建网格模型：表示生活中的物品
const mesh = new THREE.Mesh(geometry, material)
// 设置物品所在位置
mesh.position.set(5, 5, 5)

// 将物品添加到场景中
scene.add(mesh)

// 创建电光源
const pointLight = new THREE.PointLight(0xffffff, 100.0, 100)
pointLight.position.set(10, 10, 10)
scene.add(pointLight)

// 创建一个透视投影相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
// 相机位置
camera.position.set(100, 100, 100)
// 相机观测的位置坐标（相机的视线）
camera.lookAt(mesh.position) // 相机指向物品模型

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)

// 创建一个三维坐标系
const axesHelper = new THREE.AxesHelper(15)
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

controls.addEventListener('change', () => {
    renderer.render(scene, camera)
})

renderer.render(scene, camera)
