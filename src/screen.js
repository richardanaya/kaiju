var Screen = function(){
    $(document.body).append('<div id="container""></div>');

    container = document.getElementById( 'container' );
    $(container).css("position","absolute");
    $(container).css("top","0px");
    $(container).css("left","0px");
    $(container).css("margin","0px");
    $(container).css("padding","0px");
    $(document.body).css("overflow","hidden");
    $(document.body).css("background-color","black");



    var container;

    var camera, scene, renderer;

    var video, texture, material, mesh;

    var composer;

    var mouseX = 0;
    var mouseY = 0;

    var windowHalfX = window.innerWidth / 2;
    var windowHalfY = window.innerHeight / 2;

    var cube_count,

        meshes = [],
        materials = [],

        xgrid = 20,
        ygrid = 10;

    init();
    animate();

    function init() {

        container = document.createElement( 'div' );
        document.body.appendChild( container );

        camera = new THREE.OrthographicCamera( 0, window.innerWidth, window.innerHeight, 0, - 500, 1000 );
        camera.position.z = 500;

        scene = new THREE.Scene();

        var light = new THREE.DirectionalLight( 0xffffff );
        light.position.set( 0.5, 1, 1 ).normalize();
        scene.add( light );

        renderer = new THREE.WebGLRenderer( { antialias: true } );
        renderer.setSize( window.innerWidth, window.innerHeight );

        container.appendChild( renderer.domElement );

        // Cubes
        var geometry = new THREE.CubeGeometry( 50, 50, 50 );
        var material = new THREE.MeshLambertMaterial( { color: 0xffffff, shading: THREE.FlatShading, overdraw: 0.5 } );

        for(var x = 0; x < 8; x++){
            for(var y = 0; y < 8; y++){
                var cube = new THREE.Mesh( geometry, material );

                cube.position.x = (window.innerWidth-8*55)/2+25+x*55;
                cube.position.y = (window.innerHeight-8*55)/2+35+y*55;
                cube.position.z = 100;

                scene.add( cube );
            }
        }

        renderer.autoClear = false;


        // postprocessing

        var renderModel = new THREE.RenderPass( scene, camera );
        var effectBloom = new THREE.BloomPass( 1.3 );
        var effectCopy = new THREE.ShaderPass( THREE.CopyShader );

        effectCopy.renderToScreen = true;

        composer = new THREE.EffectComposer( renderer );

        composer.addPass( renderModel );
        composer.addPass( effectBloom );
        composer.addPass( effectCopy );

        window.addEventListener( 'resize', onWindowResize, false );
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
        composer.reset();
    }


    function animate() {
        requestAnimationFrame( animate );
        render();
    }

    function render() {
        renderer.clear();
        composer.render();
    }
}