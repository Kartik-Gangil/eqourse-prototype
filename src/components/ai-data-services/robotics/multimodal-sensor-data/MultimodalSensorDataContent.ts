export const modalities = [
  ["RGB video", "Appearance, objects, tools, state changes and visual feedback", "Tens of fps", "Primary observation stream for most policies"],
  ["Depth & point cloud", "Metric geometry, distance and surface structure", "Tens of fps", "Grasp planning, spatial reasoning and collision awareness"],
  ["Wrist-mounted camera", "Close-range view moving with the end effector", "Tens of fps", "Contact-rich work where the gripper occludes external views"],
  ["Event camera", "Per-pixel brightness changes with low latency", "Microsecond-scale events", "Fast dynamics, subtle motion and object slip"],
  ["Proprioception", "Joint position, velocity, effort, motor current, pose and gripper state", "Hundreds–thousands of Hz", "The state half of every state–action pair"],
  ["Force & torque", "Wrist six-axis vectors and joint torque", "Hundreds–thousands of Hz", "Contact, insertion success and alignment feedback"],
  ["Tactile", "Pressure, tactile images, contact, slip and deformation", "Sensor-dependent", "Grasp quality and in-hand state"],
  ["IMU", "Accelerometer, gyroscope and optional magnetometer", "Hundreds–thousands of Hz", "Base motion and whole-body work"],
  ["Audio", "Workspace and gripper-mounted microphones", "Audio rates", "Contact events, mechanism sounds and failure signatures"],
  ["Operational state", "Temperature, battery, saturation and collision flags", "Low", "Explains episodes that otherwise look anomalous"],
] as const;

export const rateMethods = [
  ["Nearest-neighbour index", "Pairs each frame with the closest high-rate sample", "Small jitter relative to frame period", "Can introduce up to half a frame period of error"],
  ["Zero-order hold", "Carries the last value forward to frame time", "Discrete states, flags and modes", "Wrong for fast continuous contact signals"],
  ["Linear interpolation", "Interpolates a high-rate stream to frame times", "Smooth pose and joint-position signals", "Can smooth away transients between frames"],
  ["Downsample with aggregation", "Stores min, max or mean over a frame window", "Preserving that something happened", "Loses the event shape"],
  ["Keep the native rate", "Ships the high-rate stream beside video", "Force and tactile, where the transient is the signal", "Larger files and a more capable loader"],
] as const;

export const syncMethods = [
  ["Software timestamping", "Host clock stamps each stream on arrival", "Tens of milliseconds, drifting", "Slow tasks, coarse alignment and prototypes"],
  ["Network time protocol", "Devices share a disciplined network clock", "Sub-millisecond with PTP; worse with NTP", "Distributed rigs where triggering is impractical"],
  ["Hardware triggering", "A common electrical signal triggers devices", "Best available alignment", "Contact-rich work, multi-camera rigs and fast transients"],
] as const;

export const verificationRows = [
  ["Alignment verification", "A deliberate physical event appears in multiple modalities; offset is measured at session start and end."],
  ["Calibration residual", "Reprojection and transform residuals are computed and retained instead of accepted from a tool."],
  ["Gap & dropout scan", "Missing samples, resets and rate anomalies are logged—never silently interpolated."],
  ["Range & sanity checks", "Force, joint, depth and frozen-stream values are checked against plausible ranges."],
  ["Cross-modal consistency", "Visual motion is compared with proprioceptive motion to expose sync or calibration faults."],
  ["Loadability test", "Every pilot batch is loaded through the client’s declared pipeline before volume capture."],
] as const;

export const failureRows = [
  ["Synchronised asserted, never measured", "Streams disagree and the policy learns lag", "Measured error per episode from a cross-modal event"],
  ["Undocumented interpolation", "Contact transients disappear", "Alignment method recorded per stream"],
  ["Inverted extrinsic transform", "Spatial fusion is consistently wrong", "Transform direction stated and verified"],
  ["Uncompensated force-torque", "Gripper weight appears as contact force", "Gravity and centre-of-mass calibration across six orientations"],
  ["Calibration drift after a rig change", "Silent spatial offset affects an unknown range", "Versioned calibration, validity intervals and triggers"],
  ["Exposure timing confusion", "Every camera event is shifted", "Start- versus mid-exposure convention recorded"],
  ["Gaps silently interpolated", "Dropouts become smooth fake data", "Gaps logged and marked"],
  ["Batch-only metadata", "Affected episodes cannot be isolated", "Per-episode lineage, checksums and versions"],
  ["Proprioceptive state undefined", "A plausible wrong field degrades performance", "State definition validated in the pilot"],
  ["Format discovered late", "Volume requires re-export", "Pilot loaded in the client stack before scale"],
] as const;

export const clusterRows = [
  ["Human Demonstrations", "We create the episodes", "/robotics-training-data-services/human-demonstrations", "live"],
  ["Multimodal Sensor Data", "We capture and align the signals", "", "current"],
  ["3D & Spatial Annotation", "We label the world", "/robotics-training-data-services/3d-spatial-annotation", "live"],
  ["VLA Evaluation", "We score the model", "/robotics-training-data-services/vla-evaluation", "live"],
  ["Deployment Validation", "We verify it in place", "/robotics-training-data-services/deployment-validation", "live"],
] as const;

export const programmeSteps = [
  ["01", "Sensor scope & spec", "Weeks 1–2", "Choose modalities, rates, frames, units, format and a task-led alignment tolerance."],
  ["02", "Rig instrumentation", "Weeks 2–3", "Mount sensors, configure triggering and establish clock discipline."],
  ["03", "Calibration", "Week 3", "Record intrinsics, extrinsics, kinematics, force compensation, residuals and validity."],
  ["04", "Alignment verification", "Week 3", "Capture a cross-modal event and establish measured sync error."],
  ["05", "Pilot batch", "Week 4", "Deliver the manifest and load the batch in your stack. Nothing scales until this clears."],
  ["06", "Volume capture", "Week 5+", "Rolling delivery with episode-level QA and defined recalibration cadence."],
  ["07", "Ongoing verification", "Every batch", "Report sync error, calibration residuals and QA outcomes so drift appears early."],
] as const;

export const faqs = [
  { question: "What is multimodal sensor data in robotics?", answer: "The set of synchronised streams captured during a robot episode—RGB and depth video, proprioception, force-torque, tactile, IMU, audio and operational state—recorded with a common time reference and known spatial relationships. Multimodal only means something when streams are verified to agree about when and where. Several files from the same session are not a multimodal dataset." },
  { question: "How accurate does synchronisation need to be?", answer: "It depends on the task. Slow pick-and-place may tolerate tens of milliseconds. Contact-rich manipulation may not, because a contact transient can finish in a few milliseconds. We set the tolerance from the task, then measure whether it was achieved per episode." },
  { question: "What is the difference between hardware triggering and software timestamps?", answer: "Software timestamping marks arrival at the host and can leave tens of milliseconds of error plus drift. PTP can discipline clocks across devices to sub-millisecond. Hardware triggering uses a common electrical signal and provides the best available alignment. We specify it where supported and record the actual method used by each stream." },
  { question: "Why does the rate mismatch matter?", answer: "Video arrives at tens of frames per second while force, proprioception and control arrive at hundreds or thousands of hertz. Interpolation, holding, aggregation and index matching change what the model sees. We preserve force and tactile at native rate by default and record every stream’s method in the manifest." },
  { question: "What is force-torque gravity compensation and why does it matter?", answer: "A wrist force-torque sensor measures the gripper and payload below it as well as contact. Without compensation, that weight appears as contact force and changes with arm orientation. We calibrate across six distributed orientations to characterise gripper mass and centre of mass." },
  { question: "Do we really need tactile and force sensing?", answer: "If contact-rich manipulation is on the roadmap, instrument for it before you need it. Vision cannot reliably distinguish a seated insertion from a jam when the difference exists in the force signature. Retrofitting later can require recollecting the dataset." },
  { question: "What metadata comes with the data?", answer: "Per episode: identifiers, checksums, rates, units, frames, clock sources, exposure timing, measured offsets and drift, gaps, interpolation method, calibration version, residual error, validity interval, pipeline versions, limitations, QA outcomes, approval and correction or withdrawal history." },
  { question: "Can you audit a dataset we already have?", answer: "Yes. We assess synchronisation integrity, calibration consistency and metadata completeness, quantify what can be recovered by reprocessing versus what needs recollection, and document the findings. A typical audit takes two to three weeks." },
  { question: "Which formats do you deliver in?", answer: "LeRobot-compatible data, RLDS and Open X-Embodiment structures, HDF5 with native-rate streams, ROS bag or MCAP, or raw synchronised streams with a manifest. A pilot batch is loaded end-to-end in your stack before volume starts." },
  { question: "How is this different from human demonstration collection?", answer: "Human Demonstrations creates the episodes—the tasks, operators, trajectories, deliberate failures and recoveries. Multimodal Sensor Data captures, aligns, verifies and documents the signals beside them. Clients can buy either alone or combine them so trajectories and signals are aligned by construction." },
] as const;
