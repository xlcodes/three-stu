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
mesh.position.set(0, 0, 0)

// 将物品添加到场景中
scene.add(mesh)

// // 创建点光源
// const pointLight = new THREE.PointLight(0xffffff, 1000, 100)
// pointLight.position.set(-20, -20, -20)
// scene.add(pointLight)

// // 光源辅助对象
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
// scene.add(pointLightHelper)

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(20, 20, 0)
directionalLight.target = mesh
scene.add(directionalLight)
// 平行光辅助对象
const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 10)
scene.add(directionalLightHelper)

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

controls.update()

// controls.addEventListener('change', () => {
//     renderer.render(scene, camera)
// })

// 创建时钟对象
const clock = new THREE.Clock()

const animate = () => {
    const spt = clock.getDelta() * 1000; // 毫秒

    console.log(`两帧渲染时间间隔毫秒：${spt}`)
    console.log(`帧率FPS：${1000 / spt}`)

    // mesh.rotateX(0.01)
    // mesh.rotateY(0.01)
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
