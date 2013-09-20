var Screen = function(){
    var container, stats;

    var camera, scene, renderer;

    var mesh;

    function init() {
        $(document.body).append('<div id="container""></div>');

        container = document.getElementById( 'container' );
        $(container).css("position","absolute");
        $(container).css("top","0px");
        $(container).css("left","0px");
        $(container).css("margin","0px");
        $(container).css("padding","0px");
        $(document.body).css("overflow","hidden");
        $(document.body).css("background-color","black");

        //

        camera = new THREE.PerspectiveCamera( 27, window.innerWidth / window.innerHeight, 1, 4000 );
        camera.position.z = 2750;

        scene = new THREE.Scene();


        var segments = 10000;

        var geometry = new THREE.BufferGeometry();
        var material = new THREE.LineBasicMaterial({ vertexColors: true });

        geometry.attributes = {
            position: {
                itemSize: 3,
                array: new Float32Array(segments * 3)
            },
            color: {
                itemSize: 3,
                array: new Float32Array(segments * 3)
            }
        };

        var positions = geometry.attributes.position.array;
        var colors = geometry.attributes.color.array;

        var r = 800;

        for ( var i = 0; i < segments; i ++ ) {

            var x = Math.random() * r - r / 2;
            var y = Math.random() * r - r / 2;
            var z = Math.random() * r - r / 2;

            // positions

            positions[ i * 3 ] = x;
            positions[ i * 3 + 1 ] = y;
            positions[ i * 3 + 2 ] = z;

            // colors

            colors[ i * 3 ] = ( x / r ) + 0.5;
            colors[ i * 3 + 1 ] = ( y / r ) + 0.5;
            colors[ i * 3 + 2 ] = ( z / r ) + 0.5;

        }

        geometry.computeBoundingSphere();

        mesh = new THREE.Line( geometry, material );
        scene.add( mesh );

        //

        renderer = new THREE.WebGLRenderer( { antialias: false, alpha: false } );
        renderer.setSize( window.innerWidth, window.innerHeight );

        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.physicallyBasedShading = true;

        container.appendChild( renderer.domElement );

        //

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        container.appendChild( stats.domElement );

        //

        window.addEventListener( 'resize', onWindowResize, false );

    }

    function onWindowResize() {

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

    }

//

    function animate() {

        requestAnimationFrame( animate );

        render();
        stats.update();

    }

    function render() {

        var time = Date.now() * 0.001;

        mesh.rotation.x = time * 0.25;
        mesh.rotation.y = time * 0.5;

        renderer.render( scene, camera );

    }


    init();
    animate();
}