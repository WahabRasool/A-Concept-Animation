const interval = 3000

const demos = [
  'gONYmNM',
  'WNVvQOV',
  'rLEooV',
  'YzrMdBM',
  'mdbGvmr',
  'OJyGmWX',
  'yLWgwmR',
  'gxyoXW',
  'ExmqYym',
  'VqjvqR',
  'NWEgJbG',
  'NLRxvN',
  'VwKQENg',
  'jOWVOYL',
  'yLKwgyo',
  'aJExoe',
  'QWXOYvz',
  'JGEKJr'
]

let index = 1

const screens = Array.from(
  document.querySelectorAll('iframe')
)

const baseUrl = 'https://cdpn.io/pen/debug'

const setDemo = (screen, demoSlug) => {
  screen.src = `${baseUrl}/${demoSlug}`
  return screen
}

const preloadDemo = (slug) => {
  const iframe = document.createElement('iframe')
  const screen = setDemo(iframe, slug)
  screen.style.cssText += 'display: none; position: absolute;'
  document.body.appendChild(screen)
  return new Promise(resolve => {
    screen.onload = resolve
  })
  
}

const preloadDemos = () => {
  return Promise.all(demos.map(preloadDemo))
}

const start = () => {
  setInterval(async () => {
    const demoIndex = index === demos.length
      ? (index = 0)
      : index++
    const demo = demos[demoIndex]
    setDemo(screens[0], demo)
  }, interval)

  setTimeout(() => {
    setInterval(async () => {
      const demoIndex = index === 0
        ? demos.length - 1
        : demos.length - index
      const demo = demos[demoIndex]
      setDemo(screens[1], demo)
    }, interval)
  }, interval / 3)
}

// Jigglypuff code taken from: 
// https://codepen.io/Adamanska/pen/gNYdRZ
const initJugglypuff = () => {
  let isSpinning = true;
  const TAU = Zdog.TAU;
  const pink = '#F6CED7';
  const blue = '#006885';
  const dark = '#383336';

  const illo = new Zdog.Illustration({
    element: '.jigglypuff-canvas',
    rotate: { y: -TAU/14,},
    dragRotate: true,
    onDragStart: function() {
      isSpinning = false;
    },
  });

  var body = new Zdog.Shape({
    addTo: illo,
    stroke: 380,
    color: pink,
  });

  // ====== EYES =======
  var eyes = new Zdog.Group({
    addTo:illo,
    translate: { z: 160, x : -90 },
    rotate: { y: TAU/10 },
  })
  let eye = new Zdog.Ellipse({
    addTo: eyes,
    diameter: 120,
    stroke: 1,
    fill: true,
    color: '#fff',
  });
  let pupil = new Zdog.Ellipse({
    addTo: eyes,
    diameter: 80,
    stroke: 1,
    fill: true,
    color: blue,
  });
  let shine = new Zdog.Ellipse({
    addTo: eyes,
    diameter: 20,
    stroke: 1,
    translate: { x: 10, y: -20 },
    fill: true,
    color: '#fff',
  });
  eyes.copyGraph({
    addTo:illo,
    translate: { z: 160, x : 90 },
    rotate: { y: -TAU/10 },
  });

  // ====== EARS ======
  var ears = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : -130, y :-150},
    rotate: {z: 35}
  })
  let leftEar = new Zdog.Shape({
    addTo: ears,
    path: [
      { x:   0, y: -80 },
      { x:  60, y: 60 },
      { x: -60, y: 60 },
    ],
    fill: true,
    stroke: 20,
    color: pink,
  });
  let leftInside = new Zdog.Shape({
    addTo: ears,
    path: [
      { x:   0, y: -30 },
      { x:  30, y: 30 },
      { x: -50, y: 30 },
    ],
    fill: true,
    stroke: 10,
    color: dark,
    translate: { z: 8,  },
  });
  var otherEars = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : 130, y :-150},
    rotate: {z: -35}
  })
  let rightEar = new Zdog.Shape({
    addTo: otherEars,
    path: [
      { x:   0, y: -80 },
      { x:  60, y: 60 },
      { x: -60, y: 60 },
    ],
    fill: true,
    stroke: 20,
    color: pink,
  });
  let rightInside = new Zdog.Shape({
    addTo: otherEars,
    path: [
      { x:   0, y: -30 },
      { x:  30, y: 30 },
      { x: -35, y: 30 },
    ],
    fill: true,
    stroke: 1,
    color: dark,
    //translate: { z: 8,  },
  });

  // ====== FEET ======
  var feet = new Zdog.Group({
    addTo: illo,
    translate: { z: 30, x : -100, y :170},
    rotate: {y: -50}
  })
  let leftFoot = new Zdog.Shape({
    addTo: feet,
    path: [ // triangle
      { z:   0, x: 0 },
      { z:  50, x:  40 },
      { z: -40, x:  40 },
      { z: -40, x:  0 },
    ],
    fill: true,
    stroke: 70,
    color: pink,
  });
  //feet.copyGraph({
  //addTo: illo,
  //translate: { z: 30, x : 70, y :170},
  //rotate: {y: TAU/12}
  //})
  var feet2 = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : 80, y :170},
    //rotate: {y: -50}
  })
  let rFoot = new Zdog.Shape({
    addTo: feet2,
    path: [ // triangle
      { z:   0, x: 0 },
      { z:  40, x:  40 ,},// pointe
      { z: -20, x:  20 },
      { z: -40, x:  0 },
    ],
    fill: true,
    stroke: 70,
    color: pink,
    rotate: {y: TAU/22},
  });

  // ====== SMILE ======
  let smile = new Zdog.Ellipse({
    addTo: illo,
    diameter: 40,
    quarters: 2,
    stroke: 4,
    color: dark,
    rotate:{z: TAU/4},
    translate: { z: 190, x : 0, y :30},
  });

  // ====== ARMS ======
  var arms = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : -190, y :50},
    rotate: {y: -50}
  })
  let lArms = new Zdog.Shape({
    addTo: arms,
    path: [ // triangle
      { z:   40, x: -0, y:30 },
      { z:  50, x:  50 },
      { z: -20, x:  20 },
    ],
    fill: true,
    stroke: 50,
    color: pink,
  });
  var arms2 = new Zdog.Group({
    addTo: illo,
    translate: { z: 0, x : 190, y :50},
    rotate: {y: 50}
  })
  let rArms = new Zdog.Shape({
    addTo: arms2,
    path: [ // triangle
      { z:   40, x: 0, y:30 },
      { z:  -50, x:  -50 },
      { z: 20, x:  -20 },
    ],
    fill: true,
    stroke: 50,
    color: pink,
  });

  // ====== HAIR ======
  var hair = new Zdog.Group({
    addTo: illo,
    translate: { z: 60, x : 0, y :-150},
    //rotate: {y: -50}
  })

  var meche = new Zdog.Shape({
    addTo: hair,
    stroke: 150,
    color: pink,
  });

  var hairSmallMid = new Zdog.Shape({
    addTo: hair,
    stroke: 120,
    color: pink,
    translate: { z: 30, x : 0, y :0},
  });

  var hairSmall = new Zdog.Shape({
    addTo: hair,
    stroke: 120,
    color: pink,
    translate: { z: 50, x : 0, y :20},
  });



  function animate() {
    illo.rotate.y += 0.005;
    illo.rotate.z += 0.00125;
    illo.updateRenderGraph();
    requestAnimationFrame( animate );
  }
  animate();
}

// codepen logo is taken from:
// https://codepen.io/danhearn/pen/XwQrXJ
const initCodepen = (element) => {
  const illo = new Zdog.Illustration({
    element: '.codepen-canvas',
    dragRotate: true,
    onDragStart: function() {
      isSpinning = false
    },
    onDragEnd: function() {
      isSpinning = true
    },
  });

  const color = '#fff'
  const thickness = 15
  const size = 60
  const spacing = size*1.1

  let anchor = new Zdog.Anchor({
    addTo: illo,
    scale: 1,
    rotate: { z: -Zdog.TAU/8, x: -Zdog.TAU/7 },
  });

  const bottomRect = new Zdog.Rect({
    addTo: anchor,
    width: size*2,
    height: size*2,
    stroke: thickness,
    color: color
  });

  bottomRect.copy({
    translate: { z: spacing },
    color: color
  });


  const topLine = new Zdog.Shape({
    addTo: bottomRect,
    translate: { x: size, y: size },
    path: [
      { z: 0 },
      { z: spacing },
    ],
    stroke: thickness,
    color: color,
  });

  topLine.copy({
    translate: { x: size, y: -size },
    color: color
  });

  topLine.copy({
    translate: { x: -size, y: size },
    color: color
  });

  topLine.copy({
    translate: { x: -size, y: -size },
    color: color
  });

  function animate() {
    illo.updateRenderGraph();
    illo.rotate.y += 0.025;
    requestAnimationFrame( animate );
  }

  animate();
}

preloadDemos()
start()
initJugglypuff()
initCodepen()