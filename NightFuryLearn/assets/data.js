// NightFury Learn — data.js  (plain script, no ES6 modules)
window.NF = {
COURSES: [
  { id:'robotics-101', title:'Robotics Fundamentals', tag:'ROBOTICS', color:'amber', icon:'🤖', description:'Build your first robots from scratch. Mechanics, motors, sensors and control systems.', level:'Beginner', lessons:[
    { id:'r101-01', title:'What is a Robot?',       duration:'12 min', videoId:'br_AnwmABqg', description:'Introduction to robotics — history, types, and how robots sense, think and act.', topics:['Robot definition','Actuators & sensors','Control loop'] },
    { id:'r101-02', title:'Servo Motors & PWM',     duration:'18 min', videoId:'LXURLvga8bQ', description:'How servo motors work, PWM signals, and controlling position with a microcontroller.', topics:['PWM basics','Servo internals','Feedback control'] },
    { id:'r101-03', title:'Hexapod Leg Kinematics', duration:'24 min', videoId:'3JfXfOHqhc8', description:'How a 3-DOF leg works — forward and inverse kinematics explained simply.', topics:['DOF concept','Forward kinematics','Inverse kinematics'] },
    { id:'r101-04', title:'Gait Patterns',          duration:'20 min', videoId:'fNlAME5eUxo', description:'Tripod, wave, and ripple gaits — why they matter and how to implement them.', topics:['Tripod gait','Wave gait','Stability polygon'] }
  ]},
  { id:'electronics-101', title:'Electronics Basics', tag:'ELECTRONICS', color:'cyan', icon:'⚡', description:"Ohm's law to circuit design. Resistors, capacitors, transistors — all the building blocks.", level:'Beginner', lessons:[
    { id:'e101-01', title:"Ohm's Law & Basic Circuits", duration:'15 min', videoId:'F_vLWkkNSYk', description:'Voltage, current, resistance and power. Series and parallel circuits.', topics:['V = IR','Series circuits','Parallel circuits'] },
    { id:'e101-02', title:'Resistors & Capacitors',     duration:'14 min', videoId:'kFgb5oFsuvU', description:'Component identification, colour codes, and practical uses in circuits.', topics:['Resistor colour code','Capacitor types','RC time constant'] },
    { id:'e101-03', title:'Transistors as Switches',    duration:'16 min', videoId:'J4oO7PT_nzQ', description:'NPN & PNP transistors. Using a transistor to switch high-current loads.', topics:['BJT transistor','Base-emitter-collector','Switching circuits'] },
    { id:'e101-04', title:'PCB Design Introduction',    duration:'22 min', videoId:'H9pGbLJknDk', description:'From schematic to board. Traces, vias, and the fabrication process.', topics:['Schematic capture','PCB layout','Design rules'] }
  ]},
  { id:'microcontrollers', title:'Microcontrollers & Coding', tag:'PROGRAMMING', color:'purple', icon:'💻', description:'Program ESP32 and Arduino. GPIO, I2C, SPI, PWM — take full control of hardware.', level:'Intermediate', lessons:[
    { id:'m101-01', title:'ESP32 Overview',           duration:'16 min', videoId:'xPlN_Tk3VLQ', description:'Pinout, specs, WiFi/Bluetooth, and your first blink program.', topics:['ESP32 pinout','GPIO modes','Arduino IDE'] },
    { id:'m101-02', title:'I2C & SPI Communication',  duration:'20 min', videoId:'IyGwvGzrqp8', description:'How microcontrollers talk to sensors using I2C and SPI protocols.', topics:['I2C protocol','SPI protocol','Bus addressing'] },
    { id:'m101-03', title:'PID Controller Coding',    duration:'28 min', videoId:'wkfEZmsQqiA', description:'Implement a PID controller — tuning Kp, Ki, Kd for smooth servo control.', topics:['PID algorithm','Tuning methods','Anti-windup'] }
  ]},
  { id:'engineering-design', title:'3D Design & Engineering', tag:'DESIGN', color:'green', icon:'🔧', description:'From concept to CAD. Engineering drawing, tolerances, and design for manufacture.', level:'Intermediate', lessons:[
    { id:'d101-01', title:'Engineering Drawing Basics', duration:'18 min', videoId:'sMpobP-BgNs', description:'Orthographic projection, dimensions, tolerances — reading and creating drawings.', topics:['Orthographic views','Dimensioning','Tolerances'] },
    { id:'d101-02', title:'Intro to CAD',               duration:'25 min', videoId:'KBPhC0NdpQk', description:'Parametric modelling, sketching, extrudes and revolves in 3D CAD.', topics:['Parametric modelling','Sketch constraints','Extrude & revolve'] },
    { id:'d101-03', title:'Design for 3D Printing',     duration:'19 min', videoId:'UOZE0MVMruo', description:'Wall thickness, overhangs, supports — design rules for FDM printing.', topics:['FDM process','Overhang rules','Support structures'] }
  ]}
],
MODELS: [
  { id:'hexapod-body',      name:'Hexapod Chassis',     category:'Robotics',    tag:'ASSEMBLY',   color:'amber',  type:'hexapod',  description:'Top plate assembly of a 6-legged hexapod robot with 6 hip mounting points.',      specs:{material:'Polycarbonate', weight:'85g',  dims:'190×180×6mm'} },
  { id:'servo-htxt900',     name:'HTXT900 Servo',        category:'Actuators',   tag:'COMPONENT',  color:'cyan',   type:'servo',    description:'Micro servo motor used in hexapod joints. 9g, 1.8 kg·cm torque, 180° rotation.',  specs:{torque:'1.8 kg·cm', weight:'9g', voltage:'4.8–6V'} },
  { id:'esp32-pcb',         name:'ESP32 Control Board',  category:'Electronics', tag:'PCB',        color:'purple', type:'pcb',      description:'Custom PCB for hexapod controller. ESP32 MCU, 18 servo headers.',                   specs:{mcu:'ESP32', servos:'18', dims:'80×60mm'} },
  { id:'spur-gear',         name:'Spur Gear (40T)',       category:'Mechanisms',  tag:'MECHANICAL', color:'green',  type:'gear',     description:'40-tooth spur gear. Module 1, 20° pressure angle.',                                specs:{teeth:'40', module:'M1', material:'PLA'} },
  { id:'ultrasonic-sensor', name:'HC-SR04 Ultrasonic',   category:'Sensors',     tag:'SENSOR',     color:'cyan',   type:'sensor',   description:'Ultrasonic distance sensor. 2–400cm range, 15° beam angle.',                        specs:{range:'2–400cm', angle:'15°', voltage:'5V'} },
  { id:'stepper-motor',     name:'NEMA17 Stepper',        category:'Actuators',   tag:'COMPONENT',  color:'amber',  type:'motor',    description:'NEMA 17 stepper motor. 1.8° per step, 2A, 12V.',                                    specs:{stepAngle:'1.8°', current:'2A', voltage:'12V'} },
  { id:'lipo-battery',      name:'18650 LiPo Cell',       category:'Power',       tag:'POWER',      color:'green',  type:'battery',  description:'18650 lithium-ion cell. 3500mAh, 3.7V nominal.',                                    specs:{capacity:'3500mAh', voltage:'3.7V', diameter:'18.5mm'} },
  { id:'wheel-60mm',        name:'Rubber Wheel 60mm',     category:'Mobility',    tag:'MECHANICAL', color:'amber',  type:'wheel',    description:'60mm rubber-tyred wheel. Press-fit hub for D-shaft.',                              specs:{diameter:'60mm', width:'10mm', material:'Rubber/ABS'} },
  { id:'alum-bracket',      name:'Aluminium L-Bracket',  category:'Structure',   tag:'MECHANICAL', color:'purple', type:'bracket',  description:'Servo mounting L-bracket. 2mm anodised aluminium, M3 holes.',                      specs:{material:'Alu 6061', thickness:'2mm', holes:'M3'} }
],
STATS: [
  {value:'4', label:'Courses'}, {value:'14', label:'Video Lessons'},
  {value:'9', label:'3D Models'}, {value:'100%', label:'Free'}
]
};
