import * as THREE from "three";
import {OrbitControls} from "OrbitControls";
import {GLTFLoader} from "GLTFLoader";
console.log(THREE);



class App {
    constructor() {
        const divContainer = document.querySelector("#webgl-container");
        this._divContainer = divContainer;
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.shadowMap.enabled = true;
        divContainer.appendChild(renderer.domElement);
        this._renderer = renderer;
        const scene = new THREE.Scene();
        this._scene = scene;
        this._setupCamera();
        this._setupLight();
        this._setupModel();
        this._setupControls();
        this._setupEvents();
        //위 세개의 메소드는 정의되어 있지 않다.
        //_로 정의하는 필드나 메소드는 쓰인 클래스 밖에서 쓰지 않기로 한다.
        window.onresize = this.resize.bind(this);
        this.resize();
        requestAnimationFrame(this.render.bind(this));
        scene.background = new THREE.Color(0x0a0a0a);
    }
    
   _setupControls(){
       this._orbitControls  = new OrbitControls(this._camera, this._renderer.domElement);
       //this._orbitControls.enableZoom = false;
       this._orbitControls.enablePan = false;

    }


    _setupCamera() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;
        const camera = new THREE.PerspectiveCamera(
            47,
            width / height,
            0.1,
            1000
    
        );
        camera.position.set(0, 10, 8); 
        camera.lookAt(new THREE.Vector3(0, 10, 0));
        this._camera = camera;
       

        this._scene.add(this._camera);

    }

    _setupLight() {
        const Dcolor = 0xf8f3ea;
        const Dintensity = 0.2;
        const DirectionalLight = new THREE.DirectionalLight(Dcolor, Dintensity);
        DirectionalLight.position.set(0, 10, 0);
        DirectionalLight.target.position.set(0, 0, 0);
        DirectionalLight.castShadow =true;
        DirectionalLight.shadow.mapSize.width = 1024;
        DirectionalLight.shadow.mapSize.height = 1024;
        DirectionalLight.shadow.radius = 8;
        DirectionalLight.lookAt(0, 0, 0);


        this._scene.add(DirectionalLight);
        this._scene.add(DirectionalLight.target);
    
    }

    _spotLight(intensity){
        //this._intensity = intensity;
        const spotLight = new THREE.SpotLight(0xffffff, intensity);
        spotLight.position.set(1.5, 10, 0);
        spotLight.angle = Math.PI / 12;
        spotLight.distance = 20;
        spotLight.target.position.set(1.5, 0, 0);
        spotLight.penumbra = 0.4;
    
        this._scene.add(spotLight.target);
        this._scene.add(spotLight);
        this._spotLight = spotLight;

    }


    _setupEvents(){
        window.onresize = this.resize.bind(this);
        this.resize();

        this._clock = new THREE.Clock();
        requestAnimationFrame(this.render.bind(this));
    }
   
    _setupModel() {
        const roomAllLoader = new GLTFLoader();   
        roomAllLoader.load(
          '../yeah/white3d/room_all1.glb',
          (gltf) => {
             gltf.scene.traverse( function(node) {
                  if(node.isMesh) {
                      node.castShadow = true;
                      node.receiveShadow = true;
                  }
              });
              const roomAll = gltf.scene;
              roomAll.position.set(1.5, -1.5, 0);
              this._scene.add(roomAll);
              roomAll.name = roomAll;
          }
         );
   
    }
    

    resize() {
        const width = this._divContainer.clientWidth;
        const height = this._divContainer.clientHeight;

        this._camera.aspect = width / height;
        this._camera.updateProjectionMatrix();

        this._renderer.setSize(width, height);
    }

    render() {
        this._renderer.render(this._scene, this._camera);
        this.update();
        requestAnimationFrame(this.render.bind(this));

    }

    

    update(time) {
        time *= 0.001;
        this._orbitControls.update();

    }

}

window.onload = function() {
    new App();
}


//write slide

let observer = new IntersectionObserver((e) => {
    e.forEach((박스) => {
        if (박스.isIntersecting) {
            박스.target.style.animation = "fallSlide 2s ease-out";
        } else {
            박스.target.style.animation = "fall_disappea 2s ease-out";
        }
    })
})

let font_img = document.querySelectorAll('.font_img');
observer.observe(font_img[0]);
observer.observe(font_img[1]);
observer.observe(font_img[2]);
observer.observe(font_img[3]);
observer.observe(font_img[4]);


 let observer2 = new IntersectionObserver((e) => {
     e.forEach((박스) => {
         if (박스.isIntersecting) {
            박스.target.style.animation = "Slide 2s ease-out";
        } else {
             박스.target.style.animation = "Slide_disappea 2s ease-out";
        }
     })
 })

 let font_navy = document.querySelectorAll('.font_navy');
 observer2.observe(font_navy[0]);
 observer2.observe(font_navy[1]);
 observer2.observe(font_navy[2]);




 //svg slide

const container_path1 = document.querySelector('#container');
const path1 = document.querySelector(".path");
const path1Length = path1.getTotalLength();

path1.style.strokeDasharray = path1Length;
path1.style.strokeDashoffset = calcDashoffset(window.innerHeight*0.8, container_path1, path1Length);

window.addEventListener('scroll', scrolHandler);

function calcDashoffset(scrollY, element, length) {
    const ratio = (scrollY - element.offsetTop) / element.offsetHeight;
    const value = length - (length * ratio);
    return value < 0 ? 0 : value > length ? length : value;
}

function scrolHandler() {
    const scrollY = window.scrollY + (window.innerHeight) * 0.8;
    path1.style.strokeDashoffset = calcDashoffset(scrollY, container_path1, path1Length);
}




const container_path2 = document.querySelector('#container2');
const path2 = document.querySelector(".path2");
const path2Length = path2.getTotalLength();

path2.style.strokeDasharray = path2Length;
path2.style.strokeDashoffset = calcDashoffset(window.innerHeight*0.8, container_path2, path2Length);

window.addEventListener('scroll', scrolHandler2);


function scrolHandler2() {
    const scrollY = window.scrollY + (window.innerHeight) * 0.8;
    path2.style.strokeDashoffset = calcDashoffset(scrollY, container_path2, path2Length);
}


const container_path3 = document.querySelector('#container3');
const path3 = document.querySelector(".path3");
const path3Length = path3.getTotalLength();

path3.style.strokeDasharray = path3Length;
path3.style.strokeDashoffset = calcDashoffset(window.innerHeight*0.8, container_path3, path3Length);

window.addEventListener('scroll', scrolHandler3);


function scrolHandler3() {
    const scrollY = window.scrollY + (window.innerHeight) * 0.8;
    path3.style.strokeDashoffset = calcDashoffset(scrollY, container_path3, path3Length);
}


const container_path4 = document.querySelector('#container4');
const path4 = document.querySelector(".path4");
const path4Length = path4.getTotalLength();

path4.style.strokeDasharray = path4Length;
path4.style.strokeDashoffset = calcDashoffset(window.innerHeight*0.8, container_path4, path4Length);

window.addEventListener('scroll', scrolHandler4);


function scrolHandler4() {
    const scrollY = window.scrollY + (window.innerHeight) * 0.8;
    path4.style.strokeDashoffset = calcDashoffset(scrollY, container_path4, path4Length);
}