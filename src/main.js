import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from "three/addons/libs/stats.module.js";
// 创建一个场景
const scene = new THREE.Scene()

// 创建矩形物体
// const geometry = new THREE.BoxGeometry(10, 10, 10)
// 创建球体
// const geometry = new THREE.SphereGeometry(10, 50, 50)
// 创建圆柱体
// const geometry = new THREE.CylinderGeometry(50, 50, 100)
// 矩形平面
// const geometry = new THREE.PlaneGeometry(200, 200)
// 圆形平面
const geometry = new THREE.CircleGeometry(200)

// 创建材质对象
const material = new THREE.MeshLambertMaterial({
    color: 0xffdd00,
    wireframe: false,
    transparent: true,
    opacity: 0.5,
    side: THREE.DoubleSide, // 正反面可见
})
const mesh = new THREE.Mesh(geometry, material)

mesh.position.set(0, 0, 0)
// 将物品添加到场景中
scene.add(mesh)

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(20, 20, 0)
directionalLight.target = mesh
scene.add(directionalLight)

// 创建一个透视投影相机
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
// 相机位置
camera.position.set(300, 300, 300)
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

controls.update()

// 创建性能监控器
const stats = new Stats()
stats.setMode(0)
// 输出到页面
document.body.appendChild(stats.domElement)

const animate = () => {
    // 加载性能监控器
    stats.update()
    mesh.rotateZ(0.01)
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}

animate()

// 窗口缩放事件
window.addEventListener('resize', () => {
    // 重置渲染器输出结果
    renderer.setSize(window.innerWidth, window.innerHeight)
    // 设置相机观察范围
    camera.aspect = window.innerWidth / window.innerHeight
    // 更新投影矩阵
    camera.updateProjectionMatrix()
})
