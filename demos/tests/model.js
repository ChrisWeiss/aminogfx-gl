'use strict';

/*eslint no-unused-vars: 0*/

const path = require('path');
const amino = require('../../main.js');

const gfx = new amino.AminoGfx();

gfx.start(function (err) {
    if (err) {
        console.log('Amino error: ' + err.message);
        return;
    }

    //root
    const root = gfx.createGroup();

    gfx.setRoot(root);

    //model
    const model1 = gfx.createModel();

    //showTriangle(model1);
    //showTriangles(model1);
    //showRect(model1);
    //showQuad(model1);
    //showCube(model1);

    //showTriangleLighted(model1);
    //showCubeLighted(model1, false); //color

    //showTriangleTexture(model1);
    //showCubeLighted(model1, true); //use texture
    showSphereLighted(model1);

    //video
    showVideoTexture(model1);

    root.add(model1);

    //some info
    console.log('screen: ' + JSON.stringify(gfx.screen));
    console.log('window size: ' + this.w() + 'x' + this.h());
});

/**
 * Simplest model.
 */
function showTriangle(model) {
    model.vertices([
        0, 0, 0,
        100, 50, 0,
        200, 200, 0
    ]);
}

/**
 * Simplest model with lighting.
 */
function showTriangleLighted(model) {
    model.vertices([
        0, 0, 0,
        100, 50, 0,
        200, 200, 0 ]);

    model.normals([
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ]);
}

/**
 * Simplest model.
 */
function showTriangleTexture(model) {
    model.vertices([
        0, 0, 0,
        100, 50, 0,
        200, 200, 0
    ]);

    model.src(path.join(__dirname, '../images/tree.png'));

    model.uvs([
        0, 0,
        0, 1,
        1, 0
    ]);
}

/**
 * Many triangles.
 */
function showTriangles(model) {
    const count = 1000;
    const vertexCount = count * 3;
    const vertices = [];
    const w = gfx.w();
    const h = gfx.h();

    for (let i  = 0; i < vertexCount; i++) {
        vertices.push(Math.random() * w);
        vertices.push(Math.random() * h);
        vertices.push((Math.random() - 0.5) * 50);
    }

    model.vertices(vertices);
}

/**
 * Rectangle.
 */
function showRect(model) {
    const x = 0;
    const y = 0;
    const w = 200;
    const h = 200;

    model.vertices([
        //triangle 1
        x, y, 0,
        x + w, y, 0,
        x, y + w, 0,

        //triangle 2
        x + w, y, 0,
        x, y + h, 0,
        x + w, y + h, 0
    ]);
}

/**
 * Quad.
 */
function showQuad(model) {
    const x = 0;
    const y = 0;
    const w = 200;
    const h = 200;

    //Note: no sorting applied
    const points = [
        [Math.random() * w, Math.random() * h],
        [Math.random() * w, Math.random() * h],
        [Math.random() * w, Math.random() * h],
        [Math.random() * w, Math.random() * h]
    ];

    // 1) using vertex coordinates only
    /*
    model.vertices([
        //triangle 1
        x + points[0][0], y + points[0][1], 0,
        x + points[1][0], y + points[1][1], 0,
        x + points[2][0], y + points[2][1], 0,

        //triangle 2
        x + points[1][0], y + points[1][1], 0,
        x + points[2][0], y + points[2][1], 0,
        x + points[3][0], y + points[3][1], 0
    ]);
    */

    // 2) using index
    model.vertices([
        //quad points
        x + points[0][0], y + points[0][1], 0,
        x + points[1][0], y + points[1][1], 0,
        x + points[2][0], y + points[2][1], 0,
        x + points[3][0], y + points[3][1], 0
    ]);

    model.indices([
        0, 1, 2,
        1, 2, 3
    ]);
}

function showCube(model) {
    const x = 0;
    const y = 0;
    const w = 200;
    const h = 200;
    const d = 200;
    const dh = d / 2;

    //8 vertices
    model.vertices([
        //lower
        x, y, -dh,
        x + w, y, -dh,
        x + w, y + h, -dh,
        x, y + h, -dh,

        //upper
        x, y, dh,
        x + w, y, dh,
        x + w, y + h, dh,
        x, y + h, dh,
    ]);

    //36 indices (12 vertices referenced)
    model.indices([
        //below
        0, 1, 2,
        0, 2, 3,

        //above
        4, 5, 6,
        4, 6, 7,

        //left
        0, 4, 7,
        0, 3, 7,

        //right
        1, 5, 6,
        1, 2, 6,

        //top
        0, 1, 5,
        0, 4, 5,

        //bottom
        2, 3, 7,
        2, 6, 7
    ]);

    //Note: without lighting see front and back side, therefore combined alpha value
    model.opacity(.2);

    model.originX(.5).originY(.5).w(w).h(h);
    model.x(100).y(100);
    model.rx.anim().from(0).to(360).dur(5000).loop(-1).start();
    //model.rz.anim().from(0).to(360).dur(678).start();
}

function showCubeLighted(model, useTexture) {
    const x = 0;
    const y = 0;
    const w = 200;
    const h = 200;
    const d = 200;
    const dh = d / 2;

    //24 vertices
    model.vertices([
        //lower (0 .. 3)
        x, y, -dh,
        x + w, y, -dh,
        x + w, y + h, -dh,
        x, y + h, -dh,

        //upper (4 .. 7)
        x, y, dh,
        x + w, y, dh,
        x + w, y + h, dh,
        x, y + h, dh,

        //left (8 .. 11)
        x, y, -dh,
        x, y + h, -dh,
        x, y, dh,
        x, y + h, dh,

        //right (12 .. 15)
        x + w, y, -dh,
        x + w, y + h, -dh,
        x + w, y, dh,
        x + w, y + h, dh,

        //top (16 .. 19)
        x, y, -dh,
        x + w, y, -dh,
        x, y, dh,
        x + w, y, dh,

        //bottom (20 .. 23)
        x + w, y + h, -dh,
        x, y + h, -dh,
        x + w, y + h, dh,
        x, y + h, dh
    ]);

    //24 normals
    model.normals([
        //below (0 .. 3)
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,
        0, 0, -1,

        //above (4 .. 7)
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,

        //left (8 .. 11)
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,
        -1, 0, 0,

        //right (12 .. 15)
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,
        1, 0, 0,

        //top (16 .. 19)
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,
        0, -1, 0,

        //bottom (20 .. 23)
        0, 1, 0,
        0, 1, 0,
        0, 1, 0,
        0, 1, 0
    ]);

    if (useTexture) {
        //model.src(path.join(__dirname, '../images/tree.png'));
        //model.src(path.join(__dirname, '../images/yose.jpg'));
        model.src(path.join(__dirname, '../slideshow/images/DSC_0041.jpg'));

        //TODO coordinates not verified
        model.uvs([
            //below
            0, 0,
            0, 1,
            1, 0,
            1, 1,

            //above
            0, 0,
            0, 1,
            1, 0,
            1, 1,

            //left
            0, 0,
            0, 1,
            1, 0,
            1, 1,

            //right
            0, 0,
            0, 1,
            1, 0,
            1, 1,

            //top
            0, 0,
            0, 1,
            1, 0,
            1, 1,

            //bottom
            0, 0,
            0, 1,
            1, 0,
            1, 1
        ]);
    }

    //used for vertices and normals
    model.indices([
        //below (0 .. 3)
        0, 1, 2,
        0, 2, 3,

        //above (4 .. 7)
        4, 5, 6,
        4, 6, 7,

        //left (8 .. 11)
        8, 10, 11,
        8, 9, 11,

        //right (12 .. 15)
        12, 14, 15,
        12, 13, 15,

        //top (16 .. 19)
        16, 17, 19,
        16, 18, 19,

        //bottom (20 .. 23)
        20, 21, 23,
        20, 22, 23
    ]);

    model.opacity(.4);

    model.originX(.5).originY(.5).w(w).h(h);
    model.x(100).y(100);

    //animate
    model.rx.anim().from(0).to(360).dur(5000).loop(-1).start();
    model.ry.anim().from(0).to(360).dur(5000).loop(-1).start();

    //slow animation
    //model.rx.anim().from(0).to(360).dur(50000).timeFunc('linear').loop(-1).start();
    //model.ry.anim().from(0).to(360).dur(50000).timeFunc('linear').loop(-1).start();
}

/**
 * Sphere with lighting and texture (moon, earth).
 */
function showSphereLighted(model) {
    //code from http://learningwebgl.com/cookbook/index.php/How_to_draw_a_sphere & http://learningwebgl.com/blog/?p=1253
    const latitudeBands = 30;
    const longitudeBands = 30;
    const radius = 100;

    const vertexPositionData = [];
    const normalData = [];
    const textureCoordData = [];

    for (let latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        const theta = latNumber * Math.PI / latitudeBands;
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);

        for (let longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            const phi = longNumber * 2 * Math.PI / longitudeBands;
            const sinPhi = Math.sin(phi);
            const cosPhi = Math.cos(phi);
            const x = cosPhi * sinTheta;
            const y = cosTheta;
            const z = sinPhi * sinTheta;
            const u = 1 - (longNumber / longitudeBands);
            const v = latNumber / latitudeBands;

            normalData.push(x);
            normalData.push(-y); //y-inversion
            normalData.push(z);

            textureCoordData.push(u);
            textureCoordData.push(1. - v); //y-inversion

            vertexPositionData.push(radius * x);
            vertexPositionData.push(- radius * y); //y-inversion
            vertexPositionData.push(radius * z);
        }
    }

    const indexData = [];

    for (let latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (let longNumber = 0; longNumber < longitudeBands; longNumber++) {
            const first = (latNumber * (longitudeBands + 1)) + longNumber;
            const second = first + longitudeBands + 1;

            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }

    //setup model
    model.vertices(vertexPositionData);
    model.indices(indexData);
    model.normals(normalData);
    model.uvs(textureCoordData);

    const w = 2 * radius;
    const h = w;

    model.x(w).y(h);

    //texture (http://planetpixelemporium.com/earth.html)
    model.src(path.join(__dirname, 'sphere/moonmap1k.jpg'));
    //model.src(path.join(__dirname, 'sphere/earthmap1k.jpg'));

    //animate
    model.rx.anim().from(0).to(360).dur(5000).loop(-1).start();
    model.ry.anim().from(0).to(360).dur(5000).loop(-1).start();
}

/**
 * Show video texture.
 *
 * @param {*} model1
 */
function showVideoTexture(model1) {
    const video1 = new amino.AminoVideo();

    video1.src = 'rtsp://mm2.pcslab.com/mm/7h1500.mp4';
    video1.opts = 'rtsp_transport=tcp';

    model1.src(video1);
}