window.PROJECTS = window.PROJECTS || {};
/* Harry Hutany: project write-ups. Each entry is shown by project.html?id=<key>.
   Keep every claim here backed by the coursework report or code it came from. */

window.PROJECTS["waste-sorting"] = {
  title: "AI Waste Sorting Bin (Final-Year Project)",
  status: "Final-year project, 2025",
  cover: "assets/work/bin-print.jpg",
  tags: ["Raspberry Pi", "CNN", "Computer Vision", "Servo Control", "Fusion 360", "3D Printing"],
  desc: "A smart bin that looks at an item placed on its lid, classifies the material with a CNN, then turns and tilts the lid so the item drops into the right compartment. Designed in Fusion 360, 3D printed and driven by a Raspberry Pi.",
  sections: [
    { heading: "Why", content: `<p>Manual waste sorting is slow, inconsistent and exposes workers to hazardous material, and poor segregation lowers recycling rates. The aim was an automated sorter that identifies the material and separates it without a person handling it.</p>` },
    { heading: "How it works", content: `<ul>
        <li>A webcam mounted above the bin captures the item when it is placed on the lid.</li>
        <li>A convolutional neural network trained on labelled waste images classifies the material (paper, plastic, metal).</li>
        <li>The Raspberry Pi drives servos that rotate the lid to the matching compartment and tilt it to drop the item.</li></ul>` },
    { heading: "Design and build", content: `<div class="cad-grid">
        <figure><img src="assets/work/bin-cad.jpg" alt="Fusion 360 model of the round bin"><figcaption><strong>Fusion 360 model</strong> of the round, segmented bin</figcaption></figure>
        <figure><img src="assets/work/bin-print.jpg" alt="3D-printed top ring of the bin"><figcaption><strong>3D-printed lid ring</strong>, first print before redesign</figcaption></figure></div>` },
    { heading: "Problems solved along the way", content: `<ul>
        <li>The original servos could not turn the lid under load, so I specified and sourced MG996R high-torque servos, ordering spares to protect the schedule.</li>
        <li>The first print of the top section would not slot in. I corrected the CAD and reprinted that part only.</li>
        <li>The base had no clearance for the Pi's SD card, so I printed a riser instead of reprinting the whole base.</li></ul>` },
    { heading: "Planning", content: `<p>Run as a staged project with weekly supervisor logbooks: design, simulation, CNN training, hardware testing, then report and viva. The early plan used a Dobot Magician arm on a conveyor; I moved to a self-contained rotating-lid bin to cut cost and mechanical complexity.</p>` }
  ]
};

window.PROJECTS["stm32-vehicle"] = {
  title: "STM32 Obstacle-Avoiding Vehicle with 3-DOF Arm",
  status: "Completed, Nov 2024",
  cover: "assets/work/stm32-vehicle.jpg",
  tags: ["STM32F401RE", "C/C++", "Mbed", "Keil Studio", "L298N", "HC-SR04", "Sharp IR", "PWM"],
  desc: "A two-person embedded build: a robotic vehicle on an STM32 Nucleo, without an RTOS, that steers around obstacles using ultrasonic or IR sensors and carries a servo arm that picks and drops objects at stations.",
  sections: [
    { heading: "Hardware", content: `<ul>
        <li>STM32F401RE Nucleo, two DC motors on an L298N driver</li>
        <li>3× HC-SR04 ultrasonic and 3× Sharp GP2Y0A21YK0F IR sensors covering left, front and right</li>
        <li>Arm: 4× DF9GMS servos for joints and base, 1× SG90 for the claw, on a 3D-printed frame we modified</li>
        <li>3D-printed holders for the board and every sensor; Bluetooth serial module for debugging</li></ul>` },
    { heading: "Navigation logic", content: `<p>Each sensor is reduced to obstacle / clear (IR by voltage threshold, ultrasonic by a 100 mm distance threshold) and an 8-row truth table picks the action: forward, turn left, turn right, or reverse then pivot right when boxed in. Written in C/C++ on Mbed in Keil Studio Cloud.</p>
      <table class="table"><thead><tr><th>Left</th><th>Front</th><th>Right</th><th>Action</th></tr></thead><tbody>
      <tr><td>0</td><td>0</td><td>×</td><td>Forward</td></tr><tr><td>0</td><td>1</td><td>×</td><td>Turn left</td></tr>
      <tr><td>1</td><td>0</td><td>×</td><td>Forward</td></tr><tr><td>1</td><td>1</td><td>0</td><td>Turn right</td></tr>
      <tr><td>1</td><td>1</td><td>1</td><td>Reverse, then turn right</td></tr></tbody></table>` },
    { heading: "Testing", content: `<p>Each component (sensors, motor driver, Bluetooth) was tested on its own before integration, then the arm and both sensing modes were tested on the assembled vehicle. Manual drive from an Android app over Bluetooth was descoped for time; neater wiring and that app are the next steps.</p>` }
  ]
};

window.PROJECTS["xbee-servo"] = {
  title: "XBee Wireless Servo Control between Two STM32 Boards",
  status: "Completed, Jul 2025",
  cover: "assets/work/xbee-bench.jpg",
  tags: ["STM32", "XBee / Zigbee", "API frames", "C++", "Mbed OS", "PWM", "ADC"],
  desc: "A potentiometer on one Nucleo board steers a servo on another, over XBee radios. I built the XBee API transmit frames by hand on the sender and parsed and checksum-validated them on the receiver.",
  sections: [
    { heading: "Transmitter", content: `<ul>
        <li>Reads a potentiometer on the ADC, scales it to 8 bits and formats it as an ASCII payload.</li>
        <li>Assembles a full XBee API 0x10 Transmit Request frame: start byte, length, frame ID, 64-bit and 16-bit addresses, options, payload and checksum.</li>
        <li>Sends it over a UART to the XBee every 500 ms.</li></ul>` },
    { heading: "Receiver", content: `<ul>
        <li>Syncs on the 0x7E start byte, reads the length, then the rest of the frame.</li>
        <li>Recomputes the checksum and drops bad frames; rejects out-of-range payload lengths.</li>
        <li>Maps the value to a 500–2500 µs pulse on a 50 Hz PWM output to drive an FS90R servo, with a dead band that parks the servo at neutral.</li></ul>` },
    { heading: "Wiring", content: `<img src="assets/work/xbee-wiring.jpg" alt="Wiring diagram of the transmitter and receiver Nucleo boards with XBee modules and servo">` }
  ]
};

window.PROJECTS["pi-arm"] = {
  title: "Raspberry Pi Single-Axis Arm with Homing",
  status: "Completed, Aug 2024",
  cover: "assets/work/pi-arm-iso.jpg",
  tags: ["Raspberry Pi", "Python", "RPi.GPIO", "SPI", "MCP3008 ADC", "Limit switch", "Ultrasonic"],
  desc: "A one-degree-of-freedom pick-and-place arm that homes itself against a limit switch on start-up, then follows a potentiometer read through an MCP3008 ADC over SPI, with LED position indicators and an ultrasonic sensor.",
  sections: [
    { heading: "Behaviour", content: `<ul>
        <li><strong>Homing:</strong> sweeps the servo in 10° steps until the limit switch closes, and stores that angle as zero.</li>
        <li><strong>Manual control:</strong> reads the potentiometer through the MCP3008 over SPI and maps 0–1023 to the servo angle by PWM duty cycle.</li>
        <li><strong>Feedback:</strong> yellow and green LEDs flag the end positions; an HC-SR04 ultrasonic sensor checks for obstacles.</li>
        <li>Written in Python with RPi.GPIO, spidev and asyncio.</li></ul>` },
    { heading: "Hardware", content: `<div class="cad-grid">
        <figure><img src="assets/work/pi-arm-top.jpg" alt="Top view of the Raspberry Pi arm build"><figcaption><strong>Top view</strong></figcaption></figure>
        <figure><img src="assets/work/pi-arm-flow.jpg" alt="Flowchart of the arm's program"><figcaption><strong>Program flow</strong></figcaption></figure></div>
        <p>I drew up the full Raspberry Pi pin map (power rails, servo PWM, SPI lines to the ADC, LEDs, limit switch, ultrasonic trigger and echo) before wiring.</p>` }
  ]
};

window.PROJECTS["dobot-cell"] = {
  title: "Dobot Magician Colour-Sorting Conveyor Cell",
  status: "Completed, Mar 2025",
  cover: "assets/work/dobot.jpg",
  tags: ["CoppeliaSim", "Lua", "Dobot Magician", "Vision sensor", "Pick and place", "Conveyor"],
  desc: "A simulated material-handling station: a conveyor brings mixed blocks past a vision sensor; red and green blocks stop the belt, the Dobot arm picks each with its suction cup and places it on the matching table, and the belt restarts.",
  sections: [
    { heading: "Sequence", content: `<ol>
        <li>Conveyor runs at a set speed.</li>
        <li>A vision sensor reads the colour of each block from its RGB values.</li>
        <li>On red or green, the conveyor stops and the sensor signals the arm through a shared data block.</li>
        <li>The arm moves through pick-up poses with the suction cup on, swings to the red or green table, releases, returns home and resets the signal.</li>
        <li>The conveyor resumes.</li></ol>` },
    { heading: "Implementation", content: `<ul>
        <li>Two Lua scripts in CoppeliaSim: one for the sensor and conveyor, one for the arm.</li>
        <li>The arm runs in a coroutine and uses <code>sim.moveToConfig</code> with velocity, acceleration and jerk limits per joint for smooth motion.</li>
        <li>Sensor and arm are decoupled through a custom data block, so either side can be changed without touching the other.</li></ul>` }
  ]
};

window.PROJECTS["alphamini-waiter"] = {
  title: "AlphaMini Waiter Robot (Team of 3)",
  status: "Completed, Aug 2024",
  cover: "assets/work/alphamini-flow.jpg",
  tags: ["AlphaMini", "Python SDK", "Object recognition", "3D Printing", "Team project"],
  desc: "A humanoid AlphaMini robot that recognises an object shown to it, picks a delivery route based on it, walks the route carrying the object on a tray and bends to drop it into the matching container.",
  sections: [
    { heading: "My contribution", content: `<ul>
        <li>Designed the robot's delivery routine and drew the control flowchart the team built against.</li>
        <li>Came up with the shoulder-hung tray after we found a hand-held tray failed because the robot swings its arms while walking.</li>
        <li>Helped program the robot's behaviour with the AlphaMini Python SDK and tested it.</li>
        <li>Edited three of the four progress reports.</li></ul>` },
    { heading: "Routine", content: `<img src="assets/work/alphamini-flow.jpg" alt="Flowchart: show object, choose route A or B, drop into container, return">` }
  ]
};

window.PROJECTS["patrol-robot"] = {
  title: "Home-Security Patrol Robot with Teleoperation UI",
  status: "Completed, Apr 2025",
  cover: "assets/work/bubblerob.jpg",
  tags: ["CoppeliaSim", "Qt Designer", "OMPL", "Differential drive", "Teleoperation"],
  desc: "A simulated mobile robot that patrols a home, avoids obstacles with proximity sensing, streams camera video and raises intruder alerts, with a Qt Designer interface for monitoring and manual control.",
  sections: [
    { heading: "What it does", content: `<ul>
        <li>BubbleRob (two driven wheels plus a caster) patrols a set route using CoppeliaSim's OMPL path planning.</li>
        <li>Proximity sensing stops or redirects the robot when something blocks its path.</li>
        <li>The camera streams live video; intruder detection triggers an alert in the UI.</li>
        <li>The operator can take over from autonomous patrol at any time.</li></ul>` },
    { heading: "What I'd add next", content: `<p>Full remote driving from the UI and an audible alarm, both left out of the submitted version.</p>` }
  ]
};

window.PROJECTS["epuck-cnn"] = {
  title: "Webots Search Robot with CNN Recognition",
  status: "Completed, Dec 2024",
  cover: "assets/work/cnn-accuracy.jpg",
  tags: ["Webots", "e-puck", "TensorFlow / Keras", "CNN", "CIFAR-10", "Python"],
  desc: "An e-puck robot in Webots that searches an arena. Part 1 found coloured blocks by colour thresholds with obstacle avoidance; Part 2 replaced thresholds with a CNN I trained on CIFAR-10 and tested on images captured by the robot's own camera.",
  sections: [
    { heading: "Model", content: `<p>Three convolutional layers with max pooling and two dense layers (about 290k parameters), trained with Adam for 40 epochs on CIFAR-10's 50,000 training images.</p>` },
    { heading: "Honest result", content: `<img src="assets/work/cnn-accuracy.jpg" alt="Training accuracy rising to about 97% while validation accuracy flattens near 71%">
      <p>Training accuracy climbed to about 97% while validation flattened near 71%, a clear case of overfitting, and predictions on the robot's camera images were weak because of background and floor in the frame. The fix I identified: early stopping on validation accuracy, plus augmentation for real camera views.</p>` }
  ]
};

window.PROJECTS["subsumption"] = {
  title: "Subsumption-Architecture Behaviours in Webots",
  status: "Completed, Jul 2025",
  cover: "assets/work/subsumption.jpg",
  tags: ["Webots", "Behaviour-based robotics", "Subsumption", "State machines", "Python"],
  desc: "A Webots robot that behaves like a simple organism, with hunger, thirst and sleep levels, organised as a subsumption architecture where obstacle avoidance overrides everything else.",
  sections: [
    { heading: "Layers", content: `<p>Priority from highest to lowest: avoid obstacles, then sleep / search for food / search for water when a level falls below its threshold, then wander. Eat and drink fire when the camera sees the matching colour. Wall-following and line-following were built as separate controllers.</p>
      <img src="assets/work/subsumption.jpg" alt="Subsumption diagram of the robot's core and non-core behaviours">` }
  ]
};

window.PROJECTS["heart-failure-ml"] = {
  title: "Heart-Failure Mortality Prediction",
  status: "Completed, Aug 2025",
  cover: "assets/work/heart-boxcox.jpg",
  tags: ["Python", "scikit-learn", "pandas", "SVM", "Decision Tree", "KNN", "Box-Cox"],
  desc: "Exploratory analysis and classification on a 299-patient clinical dataset to predict death during follow-up, comparing SVM, decision tree and KNN models.",
  sections: [
    { heading: "Approach", content: `<ul>
        <li>Univariate and by-outcome analysis with box, histogram, violin and count plots.</li>
        <li>Box-Cox transforms to reduce skew and outliers in the numeric features.</li>
        <li>Models compared on accuracy, precision, recall and F1, on original and transformed data.</li></ul>` },
    { heading: "Result", content: `<table class="table"><thead><tr><th>Model</th><th>Best test accuracy</th></tr></thead><tbody><tr><td>SVM</td><td>86%</td></tr><tr><td>Decision tree (entropy)</td><td>88%</td></tr><tr><td>KNN</td><td>88%</td></tr></tbody></table>
      <p>The dataset is imbalanced (32% deaths), so recall on the minority class matters more than headline accuracy.</p>` }
  ]
};

window.PROJECTS["speaker-id"] = {
  title: "Speaker Identification with MFCC and KNN",
  status: "Completed, Jun 2025",
  cover: "assets/work/speaker-id.jpg",
  tags: ["MATLAB", "Audio Toolbox", "MFCC", "KNN", "Signal processing"],
  desc: "Identifies which of five TIMIT speakers is talking. Voiced frames are selected by short-time energy and zero-crossing rate, then MFCC, pitch, ZCR and energy features feed a KNN classifier.",
  sections: [
    { heading: "Result", content: `<ul>
        <li>KNN (K = 5, Euclidean, squared-inverse weighting) on normalised features, 60/40 train/test split.</li>
        <li>97.87% accuracy in 5-fold cross-validation at frame level.</li>
        <li>Majority voting across a file's frames identified the speaker correctly for every test file.</li></ul>` }
  ]
};

window.PROJECTS["tictactoe-ai"] = {
  title: "Tic-Tac-Toe AI with Minimax",
  status: "Completed, Dec 2024",
  cover: "assets/work/tictactoe.jpg",
  tags: ["Python", "Minimax", "Game AI"],
  desc: "A two-player game with three AI levels: Easy plays randomly, Medium mixes random and minimax moves 50/50, Hard plays full minimax and cannot lose.",
  sections: [ { heading: "Next", content: `<p>Alpha-beta pruning to skip branches that can't change the result, and a graphical interface.</p>` } ]
};
(function () {
  /* Only run on project.html (page must have #p-title) */
  if (!document.getElementById('p-title')) return;

  /* ── Set footer year ── */
  const yEl = document.getElementById('y');
  if (yEl) yEl.textContent = new Date().getFullYear();

  /* ── YouTube helpers ── */
  function getYouTubeId(url) {
    try {
      const u = new URL(url);
      if (u.hostname.includes('youtu.be')) return u.pathname.slice(1);
      const v = u.searchParams.get('v'); if (v) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      const iS = parts.indexOf('shorts'); if (iS >= 0 && parts[iS + 1]) return parts[iS + 1];
      const iE = parts.indexOf('embed');  if (iE >= 0 && parts[iE + 1]) return parts[iE + 1];
      return null;
    } catch { return null; }
  }
  function makeYT(id) {
    const d = document.createElement('div');
    d.className = 'yt-wrap';
    d.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1"
      title="YouTube video" allow="accelerometer;clipboard-write;encrypted-media;gyroscope;picture-in-picture"
      allowfullscreen loading="lazy"></iframe>`;
    return d;
  }

  /* ── Read project ID from URL: project.html?id=rl-balance ── */
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get('id') || 'waste-sorting'; // fallback just in case
  const p = (window.PROJECTS || {})[projectId];

  if (!p) {
    document.getElementById('p-title').textContent = 'Project not found';
    return;
  }

  /* ── Populate page ── */
  document.title = (p.title || 'Project') + ' — Harry Hutany';
  document.getElementById('p-title').textContent = p.title || 'Project';

  if (p.status) {
    const st = document.getElementById('p-status');
    st.textContent = p.status; st.style.display = 'inline-block';
    const k = p.status.trim().toLowerCase();
    if (k.includes('complete'))             st.classList.add('complete');
    else if (k.includes('progress'))        st.classList.add('inprogress');
    else if (k.includes('draft') || k.includes('wip')) st.classList.add('draft');
  }

  const tagsEl = document.getElementById('p-tags');
  (p.tags || []).forEach(t => {
    const s = document.createElement('span');
    s.className = 'badge'; s.textContent = t; tagsEl.appendChild(s);
  });

  if (p.cover || p.img) {
    const img = document.getElementById('p-img');
    img.src = p.cover || p.img; img.alt = p.title || ''; img.style.display = 'block';
  }

  document.getElementById('p-desc').textContent = p.desc || '';

  const wrap = document.getElementById('p-sections');
  (p.sections || []).forEach(sec => {
    const d = document.createElement('div');
    d.className = 'p-section';

    if (sec.heading) {
      const h = document.createElement('h3'); h.textContent = sec.heading; d.appendChild(h);
    }

    const vids = sec.video ? [sec.video] : (Array.isArray(sec.videos) ? sec.videos : []);

    const addVid = url => {
      const vid = getYouTubeId(url);
      if (vid) {
        d.appendChild(makeYT(vid));
      } else {
        const i = document.createElement('iframe');
        Object.assign(i, { src: url, width: '100%', height: '400', frameBorder: '0', allowFullscreen: true, loading: 'lazy' });
        i.style.marginBottom = '16px'; d.appendChild(i);
      }
    };

    if (vids.length) {
      vids.forEach(addVid);
      if (sec.content) { const c = document.createElement('div'); c.className = 'project-description'; c.innerHTML = sec.content; d.appendChild(c); }
      if (sec.img)     { const im = document.createElement('img'); im.src = sec.img; im.alt = sec.heading || ''; d.appendChild(im); }
    } else {
      if (sec.content) { const c = document.createElement('div'); c.className = 'project-description'; c.innerHTML = sec.content; d.appendChild(c); }
      if (sec.img)     { const im = document.createElement('img'); im.src = sec.img; im.alt = sec.heading || ''; d.appendChild(im); }
    }

    wrap.appendChild(d);
  });

  if (p.media && (p.media.youtube || (p.media.images && p.media.images.length))) {
    const mediaEl = document.getElementById('p-media');
    mediaEl.style.display = 'block';
    const h = document.createElement('h3'); h.textContent = 'Media'; mediaEl.appendChild(h);
    if (p.media.youtube) { const vid = getYouTubeId(p.media.youtube); if (vid) mediaEl.appendChild(makeYT(vid)); }
    if (Array.isArray(p.media.images) && p.media.images.length) {
      const g = document.createElement('div'); g.className = 'gallery';
      p.media.images.forEach(src => {
        const im = document.createElement('img'); im.loading = 'lazy'; im.src = src; im.alt = p.title || ''; g.appendChild(im);
      });
      mediaEl.appendChild(g);
    }
  }
})();
