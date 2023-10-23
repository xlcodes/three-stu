import * as THREE from 'three'

// 创建一个场景
const scene = new THREE.Scene()

// 创建矩形物体
const geometry = new THREE.BoxGeometry(10, 10, 10)
// 创建材质对象
const material = new THREE.MeshBasicMaterial({color: 0xffdd00})
// 创建网格模型：表示生活中的物品
const mesh = new THREE.Mesh(geometry, material)
// 设置物品所在位置
mesh.position.set(0, 0, 0)


// 将物品添加到场景中
scene.add(mesh)

// 创建一个透视投影相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
// 相机位置
camera.position.set(20, 20, 20)
// 相机观测的位置坐标（相机的视线）
// camera.lookAt(0,0,0)
camera.lookAt(mesh.position) // 相机指向物品模型

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)

