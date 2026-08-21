export const annotationTypes = [
  ["6-DoF object pose", "Full position and orientation relative to a declared frame", "Pose training, pick planning and placement precision"],
  ["Grasp pose sets", "Gripper pose, approach vector, finger configuration and closing width", "Robust task-conditioned manipulation"],
  ["Dexterous contacts", "Per-finger contact points for multi-finger hands", "In-hand reorientation and dexterous control"],
  ["Affordance regions", "Graspable, pushable, pourable, hangable and containable surfaces", "Grounding instructions in geometry"],
  ["3D part segmentation", "Functional parts such as handle, lid, spout, button and hinge", "Part-level instruction following"],
  ["Semantic keypoints", "Named functional points such as spout tip or insertion-axis end", "Compact representations across instances"],
  ["Articulation", "Joint type, axis, origin, limits and motion waypoints", "Doors, drawers, tools, valves and appliances"],
  ["Insertion directions", "Approach axis and alignment tolerance", "Assembly and contact-rich work"],
  ["Spatial relations", "On, in, under, behind, supporting and occluding", "Scene understanding and multi-step planning"],
  ["Navigation targets", "Approach poses and standoff positions", "Mobile manipulation and humanoids"],
  ["Physical properties", "Mass, centre of mass, friction and deformability class", "Simulation-ready assets and contact planning"],
] as const;

export const poseMethods = [
  ["Marker-based", "Fiducials derive pose geometrically", "High and repeatable", "Markers occlude the object"],
  ["Motion capture", "External tracking transformed into camera coordinates", "Highest available", "Requires a mocap volume"],
  ["CAD alignment", "Known mesh registered to observed depth or points", "Good on rigid scanned objects", "Degrades with symmetry and occlusion"],
  ["Manual + refinement", "Human initialisation with algorithmic convergence", "Object-dependent", "Slowest fallback"],
  ["Multi-view consistency", "Several calibrated views constrain one pose", "Good and self-checking", "Needs a calibrated rig"],
] as const;

export const failures = [
  ["One grasp per object", "A policy learns one arbitrary approach", "Deliver grasp sets and measure coverage"],
  ["No task conditioning", "A valid grasp blocks the next step", "Label permitted downstream operations"],
  ["Gripper-agnostic labels", "The actual end effector cannot execute them", "Condition every grasp on the gripper"],
  ["Symmetry ignored", "Equivalent rotations are penalised", "Declare and evaluate symmetry classes"],
  ["Simulation read as proof", "Sim-passing grasps fail on hardware", "Report hardware results separately"],
  ["Inverted transform", "Every fusion is consistently wrong", "State and verify transform direction"],
  ["Asset never actuated", "A plausible URDF behaves absurdly", "Load, actuate and report changes"],
  ["Automated output accepted", "Systematic candidate failures survive", "Human verification and hard-case arbitration"],
  ["Generator bias hidden", "The next batch repeats the same defect", "Return the failure pattern, not only corrections"],
  ["Wrong agreement metric", "Ambiguity is blamed on annotators", "Measure coverage and exclusion agreement"],
  ["Deformables treated as rigid", "Labels assume fixed geometry", "Declare deformability and handle separately"],
] as const;

export const programmeSteps = [
  ["01", "Scope & guideline", "Week 1–2", "Define primitives, end effectors, tasks, objects, symmetry and validity."],
  ["02", "Asset preparation", "Week 2", "Source or scan meshes; establish scale, frames and physical properties."],
  ["03", "Annotator calibration", "Week 2–3", "Measure coverage overlap and exclusion agreement on a reference set."],
  ["04", "Pilot batch", "Week 3", "Load and use the agreed format end to end. Nothing scales before it clears."],
  ["05", "Production / verification", "Week 4+", "Produce labels or verify generated candidates with per-label metadata."],
  ["06", "Physical verification", "Parallel", "Execute a stratified sample where hardware access is in scope."],
  ["07", "Review & iterate", "Ongoing", "Turn recurring disagreement into clearer guidelines at source."],
] as const;

export const faqs = [
  { question: "What is 3D spatial annotation for robotics?", answer: "Labelling that describes how a robot can interact with objects rather than merely detect them—grasp poses with approach vectors and gripper configuration, affordance regions, 6-DoF object pose, part segmentation, articulation, insertion directions, spatial relations and physical properties. It is manipulation annotation, distinct from perception annotation used in driving and mapping." },
  { question: "How is this different from LiDAR and point-cloud annotation?", answer: "Point-cloud and LiDAR annotation answers what is where—cuboids, semantic segmentation and tracking—for perception in driving, mapping and inspection. Spatial annotation for manipulation answers how to interact: where fingers close, along what vector, on which part and whether the grasp supports the next task. We run both as separate engagements with separate guidelines." },
  { question: "Why do you not annotate one correct grasp per object?", answer: "Because there usually is not one. A mug can be grasped by the handle, rim, body or from above. We annotate grasp sets and measure coverage, correct exclusion, task conditioning, gripper specificity and robustness instead of teaching a policy that one arbitrary approach is the only answer." },
  { question: "We already run an automated annotation pipeline. What would you add?", answer: "Verification. We review generated candidates against physical feasibility, gripper constraints and task requirements, arbitrate hard cases, audit whether the generator covered the full grasp space and report the failure pattern in the generator itself so engineers can improve the source rather than repeatedly correct batches." },
  { question: "Is physics-simulation validation enough?", answer: "It is a useful filter, not proof. Simulation depends on contact models, friction assumptions and asset properties. Where hardware access is in scope, we execute a stratified sample and report sim-to-real pass rate by object class so you know where automation is trustworthy." },
  { question: "How do you handle symmetric objects?", answer: "We declare symmetry classes per object and handle equivalent poses explicitly in annotation and evaluation. A cylinder has infinitely many valid rotations around its axis and a rectangular box has four; penalising an equivalent rotation corrupts the metric." },
  { question: "How do you establish 6-DoF pose ground truth?", answer: "Depending on object class, we use fiducial markers, motion capture, CAD-to-point-cloud registration, manual initialisation with refinement, or multi-view consistency. We propose the method during scoping and report achieved accuracy rather than a theoretical best." },
  { question: "Can you prepare simulation-ready articulated assets?", answer: "Yes—joint types, axes and origins, limits, kinematic trees, part segmentation, collision meshes and physical properties in URDF or MJCF. We validate by loading and actuating the asset in a simulator and report the changes required for plausible behaviour." },
  { question: "How do you measure quality when there is no single right answer?", answer: "We use coverage overlap, exclusion agreement, physical verification rate where hardware is available, task-conditioning consistency and geometric error for pose or keypoints where one answer exists. Recurring disagreement is treated as a guideline defect and fixed at source." },
  { question: "How quickly can you start?", answer: "Verification over an existing automated pipeline typically reaches first delivery in about two weeks. A from-scratch annotation programme usually takes about three weeks to a cleared pilot, including guideline design and annotator calibration." },
] as const;
