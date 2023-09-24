import * as THREE from '../libs/three_js/three.module.js';
import { GLTFLoader } from '../libs/loaders/GLTFLoader.js';
import { Utils } from './Utils.js'

const utils = new Utils();

class Environment{
    
    constructor(){
        this.gltfLoader = null;
        this.data_loaded = null;
        this.scene = null;

        this.floor = null;
        this.ceiling = null;

        this.wall_1 = null;
        this.wall_2 = null;
        this.wall_3 = null;
        this.wall_4 = null;
        this.wall_5 = null;
        this.wall_6 = null;

        this.base_dx = null;
        this.base_sx = null;

        this.chair = null;
        this.stele = null;


        this.light_1 = null;
        this.light_2 = null;
        this.light_3 = null;
        this.light_4 = null;

        this.Window_1 = null;
        this.Window_2 = null;
        this.Window_3 = null;
        this.Window_4 = null;
        this.Window_5 = null;
        this.Window_6 = null;
        this.Window_7 = null;

        this.platform_light_1 = null;


        this.object_to_move = null;
    }

    async load(model_path){
        this.gltfLoader = new GLTFLoader();
        this.data_loaded = await this.gltfLoader.loadAsync(model_path);
        
        this.scene = this.data_loaded.scene; 
        this.scene.scale.set(100, 100, 100);
    }


    init(main_scene, walk_animation){
        this._init_parts();
        this._init_lights(main_scene);
        this._init_poster(main_scene)

        this._setup_walk_space(walk_animation);

        main_scene.add(this.scene)
    }

    _init_parts(){
        //utils.print_dump_object(this.scene);

        const loader = new THREE.TextureLoader();

        const base_color_map = loader.load('src/textures/Ceiling/Ceiling_Gypsum_001_Base_Color.jpg')
        this._set_repeat_texture(base_color_map)

        const normal_map = loader.load('src/textures/Ceiling/Ceiling_Gypsum_001_Normal.jpg')
        this._set_repeat_texture(normal_map)

        const height_map = loader.load('src/textures/Ceiling/Ceiling_Gypsum_001_Height.png')
        this._set_repeat_texture(height_map)

        const roughness_map = loader.load('src/textures/Ceiling/Ceiling_Gypsum_001_Roughness.jpg')
        this._set_repeat_texture(roughness_map)

        const ambent_occlusion = loader.load('src/textures/Ceiling/Ceiling_Gypsum_001_ambientOcclusion.jpg')
        this._set_repeat_texture(ambent_occlusion)

        this.floor = this.scene.getObjectByName('Floor');
        this.floor.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                //displacementScale:10,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion

            });


        this.ceiling = this.scene.getObjectByName('Ceiling');
        this.ceiling.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion

            });

        this.wall_1 = this.scene.getObjectByName('Wall_1');
        this.wall_1.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                //displacementScale:10,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion
            });


        this.wall_2 = this.scene.getObjectByName('Wall_2');
        this.wall_2.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                //displacementScale:10,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion

            });

        this.wall_3 = this.scene.getObjectByName('Wall_3');
        this.wall_3.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                //displacementScale:10,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion

            });

        this.wall_4 = this.scene.getObjectByName('Wall_4');
        this.wall_4.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                //displacementScale:10,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion

            });

        this.wall_5 = this.scene.getObjectByName('Wall_5');
        this.wall_5.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                //displacementScale:10,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion

            });

        this.wall_6 = this.scene.getObjectByName('Wall_6');
        this.wall_6.material = new THREE.MeshPhongMaterial(
            {
                map: base_color_map,
                normalMap: normal_map,
                //displacementScale:10,
                roughnessMap: roughness_map,
                //roughness:1,
                aoMap: ambent_occlusion

            });


        this.Window_1 = this.scene.getObjectByName('Window_1');
        this.Window_1.material = new THREE.MeshPhongMaterial({opacity:0,transparent:1});

        this.Window_2 = this.scene.getObjectByName('Window_2');
        this.Window_2.material = new THREE.MeshPhongMaterial({opacity:0,transparent:1});

        this.Window_3 = this.scene.getObjectByName('Window_3');
        this.Window_3.material = new THREE.MeshPhongMaterial({opacity:0,transparent:1});

        this.Window_4 = this.scene.getObjectByName('Window_4');
        this.Window_4.material = new THREE.MeshPhongMaterial({opacity:0,transparent:1});

        this.Window_5 = this.scene.getObjectByName('Window_5');
        this.Window_5.material = new THREE.MeshPhongMaterial({opacity:0,transparent:1});

        this.Window_6 = this.scene.getObjectByName('Window_6');
        this.Window_6.material = new THREE.MeshPhongMaterial({opacity:0,transparent:1});

        this.Window_7 = this.scene.getObjectByName('Window_7');
        this.Window_7.material = new THREE.MeshPhongMaterial({opacity:0,transparent:1});


        this.base_dx = this.scene.getObjectByName('Base_dx');
        this.base_dx.material = new THREE.MeshPhongMaterial({color: 0xFFFAF0, specular:0xFFFAF0, shininess:40}); 

        this.base_sx = this.scene.getObjectByName('Base_sx');
        this.base_sx.material = new THREE.MeshPhongMaterial({color: 0xFFFAF0, specular:0xFFFAF0, shininess:40}); 


        this.chair = this.scene.getObjectByName('Chair');
        this.chair.material = new THREE.MeshPhongMaterial({color: 0x2F4F4F, specular:0x2F4F4F, shininess:30}); 


        this.stele = this.scene.getObjectByName('stele');
        this.stele.material = new THREE.MeshPhongMaterial({color: 0x000000, specular:0x2F4F4F, shininess:40});



        this.light_1 = this.scene.getObjectByName('Light_1');
        this.light_1.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 

        this.light_2 = this.scene.getObjectByName('Light_2');
        this.light_2.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0});

        this.light_3 = this.scene.getObjectByName('Light_3');
        this.light_3.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0});

        this.light_4 = this.scene.getObjectByName('Light_4');
        this.light_4.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0});


        this.platform_light_1 = this.scene.getObjectByName('Platform_light_1');
        this.platform_light_1.material = new THREE.MeshPhongMaterial({emissive: 0xFFFAF0}); 



        this.object_to_move = this.scene.getObjectByName('Sphere');
        this.object_to_move.material = new THREE.MeshPhongMaterial({color: 0xFFFFFF, specular:0xDC143C, shininess:5});

    
        //utils.print_dump_object(this.scene);
    }



    _setup_walk_space(walk_animation){
        let boxes = [];
    
        let box_1 = walk_animation.get_box_template();

        box_1.right_bottom.x = -400;
        box_1.right_bottom.z = -318;

        box_1.left_up.x = 400;
        box_1.left_up.z = -244;


        let box_2 = walk_animation.get_box_template();

        box_2.right_bottom.x = -400;
        box_2.right_bottom.z = 574;

        box_2.left_up.x = 400;
        box_2.left_up.z = 705;


        let box_3 = walk_animation.get_box_template();

        box_3.right_bottom.x = -100;
        box_3.right_bottom.z = 55;

        box_3.left_up.x = -100;
        box_3.left_up.z = 24;


        let box_4 = walk_animation.get_box_template();

        box_4.right_bottom.x = 200;
        box_4.right_bottom.z = 55;

        box_4.left_up.x = 489;
        box_4.left_up.z = 274;


        let box_5 = walk_animation.get_box_template();

        box_5.right_bottom.x = -200;
        box_5.right_bottom.z = -300;

        box_5.left_up.x = 200;
        box_5.left_up.z = -87;


        let box_6 = walk_animation.get_box_template();

        box_6.right_bottom.x = -200;
        box_6.right_bottom.z = 352;

        box_6.left_up.x = 200;
        box_6.left_up.z = 600;


        let box_7 = walk_animation.get_box_template();

        box_7.right_bottom.x = -200;
        box_7.right_bottom.z = -100;

        box_7.left_up.x = -139;
        box_7.left_up.z = 574;


        let box_8 = walk_animation.get_box_template();

        box_8.right_bottom.x = 139;
        box_8.right_bottom.z = -100;

        box_8.left_up.x = 200;
        box_8.left_up.z = 574;
    
    
    
        boxes.push(box_1);
        boxes.push(box_2);
        boxes.push(box_3);
        boxes.push(box_4);
        boxes.push(box_5);
        boxes.push(box_6);
        boxes.push(box_7);
        boxes.push(box_8);
    
        walk_animation.init(boxes);
    }

  
    _init_lights(main_scene){
        let scene = main_scene;
        // AMBIENT LIGHT ------------------------------------------------------------------------------
        const AMBIENT_LIGHT_COLOR = 0xFFFFFF;
        const AMBIENT_LIGHT_INTENSITY = 0.5;
        
        const ambient_light = new THREE.AmbientLight(AMBIENT_LIGHT_COLOR, AMBIENT_LIGHT_INTENSITY);
        scene.add(ambient_light)
        // ---------------------------------------------------------------------------------------------
    
        // CEILING LIGHTS ------------------------------------------------------------------------------
        const CEILING_LIGHT_COLOR = 0xFFFFFF;
        const CEILING_LIGHT_INTENSITY = 0.3;

        let ceiling_light_1 = new THREE.PointLight(CEILING_LIGHT_COLOR, CEILING_LIGHT_INTENSITY);
        this.light_1.getWorldPosition(ceiling_light_1.position); // set position of ceiling_light_1
        scene.add(ceiling_light_1);

        let ceiling_light_2 = new THREE.PointLight(CEILING_LIGHT_COLOR, CEILING_LIGHT_INTENSITY);
        this.light_2.getWorldPosition(ceiling_light_2.position); // set position of ceiling_light_2
        scene.add(ceiling_light_2);

        let ceiling_light_3 = new THREE.PointLight(CEILING_LIGHT_COLOR, CEILING_LIGHT_INTENSITY);
        this.light_3.getWorldPosition(ceiling_light_3.position); // set position of ceiling_light_3
        scene.add(ceiling_light_3);

        let ceiling_light_4 = new THREE.PointLight(CEILING_LIGHT_COLOR, CEILING_LIGHT_INTENSITY);
        this.light_4.getWorldPosition(ceiling_light_4.position); // set position of ceiling_light_4
        scene.add(ceiling_light_4);

        // ---------------------------------------------------------------------------------------
        
    
        // PLATFORM'S LIGHTS ------------------------------------------------------------------------------
        const PLATFORMS_LIGHT_COLOR = 0xffffff;
        const PLATFORMS_LIGHT_INTENSITY = 2.0;
        const PLATFORMS_LIGHT_DISTANCE = 800;
        const PLATFORMS_LIGHT_ANGLE = 0.2;
    
        const platform_light_1 = new THREE.SpotLight(PLATFORMS_LIGHT_COLOR, PLATFORMS_LIGHT_INTENSITY);
        platform_light_1.distance = PLATFORMS_LIGHT_DISTANCE;
        platform_light_1.angle = PLATFORMS_LIGHT_ANGLE;
        this.platform_light_1.getWorldPosition(platform_light_1.position);
        this.platform_light_1.getWorldPosition(platform_light_1.target.position);
        platform_light_1.target.position.y=0;
        scene.add(platform_light_1)
        scene.add(platform_light_1.target)
    

        // ---------------------------------------------------------------------------------------------------
    
    }

    _init_poster(main_scene){
        let scene = main_scene;

        const loader = new THREE.TextureLoader();
        
        const boxWidth = 1966*0.2;
        const boxHeight = 500*0.2;
        const boxDepth = 10;
        const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
       
        const materials = [
            new THREE.MeshPhongMaterial({color: 0xF0F8FF}),
    
            new THREE.MeshPhongMaterial({color: 0xF0F8FF}),
    
            new THREE.MeshPhongMaterial({color: 0xF0F8FF}),
    
            new THREE.MeshPhongMaterial({color: 0xF0F8FF}),
            // source https://movie.douban.com/photos/photo/2363841276/
            new THREE.MeshPhongMaterial({map: loader.load('src/textures/logo.png')}),
    
            new THREE.MeshPhongMaterial({color: 0xF0F8FF}),
        ];
        const poster = new THREE.Mesh(geometry, materials);
        poster.position.set(0, -50, 750)
        scene.add(poster);
    }


    _set_repeat_texture(texture){
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3,3);
    }
}

export { Environment };

