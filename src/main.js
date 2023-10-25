import * as THREE from 'three'
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import Stats from "./lib/Stats.js";
import {GUI} from "three/addons/libs/lil-gui.module.min.js";
// 创建一个场景
const scene = new THREE.Scene()

// 创建球体
const geometry = new THREE.BoxGeometry(50, 50, 50)

const material = new THREE.MeshPhongMaterial({
    color: 0x00ffff,
    shininess: 20,
    specular: 0x444444,
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
camera.position.set(100, 100, 100)
// 相机观测的位置坐标（相机的视线）
camera.lookAt(mesh.position) // 相机指向物品模型

// 创建一个渲染器
const renderer = new THREE.WebGLRenderer({
    antialias: true, // 抗锯齿
})
renderer.setSize(window.innerWidth, window.innerHeight)
// 设置像素比，以免渲染模糊，是一个优化项
renderer.setPixelRatio(window.devicePixelRatio)
renderer.render(scene, camera)
document.body.appendChild(renderer.domElement)

// 创建一个三维坐标系
const axesHelper = new THREE.AxesHelper(100)
scene.add(axesHelper)

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)

controls.update()

// 创建GUI对象
const gui = new GUI()
// 改变 UI 交互界面样式
gui.domElement.style.right = '10px'
gui.domElement.style.width = '270px'

gui.title('参数控制')

const obj = {x: 30, bool: true}

gui.add(obj, 'x', 0, 100, 1).name('修改X值').onChange(x => {
    console.log(`obj.x = ${x}`)
    mesh.position.x = x
})

// gui.add(mesh.position, 'x', 0, 100).name('长方体X值').step(1)
// gui.add(mesh.position, 'y', 0, 100).name('长方体Y值').step(1)

// 布尔值类型
gui.add(obj, 'bool').name('是否旋转').onChange(val => {
    console.log(obj, val)
})

// 下拉选项
gui.add(mesh.position, 'x', {
    '左侧': -100,
    '居中': 0,
    '右侧': 100
}).name('长方体X值').step(1)
gui.add(mesh.position, 'y', [-100, 0, 100]).name('长方体Y值').step(1)

gui.add(mesh.position, 'z', 0, 100).name('长方体Z值').step(1)
// gui.addColor(mesh.material, 'color').onChange(color => {
//     console.log(`物品颜色为：`, color)
// })

// gui.add(ambientLight, 'intensity', 0, 2.0).name('环境光强度').step(0.01).onChange(val => {
//     console.log(`当前环境光强度为：${val}`)
// })

// gui.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度').step(0.1)

// GUI 分组
const materialGui = gui.addFolder().title('物品材质')
materialGui.addColor(mesh.material, 'color').name('颜色').onChange(color => {
    console.log(`物品颜色为：`, color)
})

const lightGui = gui.addFolder().title('光源')
lightGui.add(ambientLight, 'intensity', 0, 2.0).name('环境光强度').step(0.01).onChange(val => {
    console.log(`当前环境光强度为：${val}`)
})
lightGui.add(directionalLight, 'intensity', 0, 2.0).name('平行光强度').step(0.1)

// 创建性能监控器
const stats = new Stats()
stats.setMode(0)
// 输出到页面
document.body.appendChild(stats.domElement)

const animate = () => {
    // 加载性能监控器
    stats.update()
    if (obj.bool) {
        mesh.rotateZ(0.01)
    }
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
