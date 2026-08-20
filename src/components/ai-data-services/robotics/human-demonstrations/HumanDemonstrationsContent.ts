export const collectionMethods = [
  ["Handheld / wrist-mounted (UMI-style)", "A gripper-mounted capture device records the task as an operator performs it directly.", "20–60 episodes/hour", "High-volume manipulation and varied real environments", "No robot in the loop; kinematic feasibility is checked afterwards"],
  ["Leader-follower bimanual (ALOHA-style)", "A leader arm drives a follower robot while actions and states are recorded.", "10–30 episodes/hour", "Exact action–state correspondence and contact-rich bimanual tasks", "Typically $15,000–20,000 per station and tied to one embodiment"],
  ["VR teleoperation", "Headset and hand tracking are mapped to the robot.", "10–25 episodes/hour", "Natural manipulation, remote operation and rapid reconfiguration", "Kinematic translation introduces error; comfort limits session length"],
  ["Exoskeleton / full-body", "Wearable capture records whole-body humanoid motion.", "5–15 episodes/hour", "Humanoid locomotion and whole-body manipulation", "Lowest throughput, highest setup cost and greatest operator strain"],
  ["Egocentric human video", "Head-mounted capture records a person completing the task naturally, without a robot.", "Hours of continuous capture", "Task and scene diversity, pre-training, affordance and intent learning", "No robot actions; requires retargeting or human-video learning methods"],
] as const;

export const diversityAxes = [
  ["Task", "Distinct verbs and goals—not variations of one motion", "The longest-lasting marginal return"],
  ["Object", "Instances within a category and categories within a task", "The policy learns mugs, not one mug"],
  ["Scene", "Backgrounds, surfaces, clutter, layout and room", "Prevents silent scene overfit"],
  ["Lighting", "Daylight, artificial, mixed, low and hard shadow", "Cheap variation with disproportionate value"],
  ["Initial conditions", "Start pose, placement and distractors", "Covers the edges of the start distribution"],
  ["Operator", "Multiple people performing the same task", "Avoids learning one person's motion style"],
  ["Embodiment", "More than one robot or rig where feasible", "Improves cross-embodiment generalisation"],
] as const;

export const qualityDimensions = [
  ["Action–state correspondence", "Recorded actions genuinely produced the recorded states", "The policy learns a mapping that does not exist"],
  ["Timestamp alignment", "All streams synchronised to the application requirement", "Vision and proprioception drift apart"],
  ["Embodiment-matched kinematics", "Motion is achievable by the target robot", "Demonstrations the robot cannot execute"],
  ["Smooth, intentional motion", "Deliberate motion without corrective twitch", "Operator noise is learned as intent"],
  ["Consistent task framing", "One task means the same thing across operators", "Silent label drift and contradictions"],
  ["Complete metadata", "Task, operator, environment, objects, rig, outcome and calibration", "The bad batch cannot be isolated later"],
  ["Honest outcome labelling", "Success, partial, failure and recovery are distinct", "Downstream filters and evaluation are corrupted"],
  ["Operator freshness", "Collection stays inside managed session lengths", "Fatigue quietly degrades later episodes"],
] as const;

export const failureModes = [
  ["Depth without breadth", "Thousands of near-identical episodes produce memorisation", "Design and track a diversity split"],
  ["Success-only data", "The policy has never seen recovery", "Inject and label failures deliberately"],
  ["Single operator", "One person's motion becomes the task", "Rotate multiple certified operators"],
  ["Fatigue degradation", "Quality falls gradually through a long session", "Cap sessions and track operator quality"],
  ["Undocumented action convention", "Absolute/delta mismatch can destroy performance", "State the convention in manifest, docs and pilot"],
  ["Proprioceptive mismatch", "The wrong state source changes model behaviour", "Define and validate the source in the pilot"],
  ["Timestamp drift", "Vision and state streams stop representing one moment", "Verify alignment per episode"],
  ["Batch-only QA", "Individual harmful episodes still ship", "Review every episode"],
  ["Scene overfit", "One room, surface and lighting condition", "Design environment variation"],
  ["Format discovered late", "A full dataset needs re-export", "Load a pilot in the client's stack first"],
  ["Thin metadata", "A discovered defect cannot be filtered", "Ship complete per-episode metadata"],
] as const;

export const faqs = [
  { question: "What is human demonstration data?", answer: "Recordings of a person performing a task in a form a robot policy can learn from—typically synchronised video, robot or rig proprioception, and the action sequence that produced the motion. It is collected either through teleoperation, where an operator drives a rig or robot that records actions directly, or through egocentric human video, where a person performs the task naturally with head-mounted capture and no robot involved." },
  { question: "How many demonstrations do we need per task?", answer: "Current practice suggests the marginal value of additional episodes declines sharply once a task is covered at roughly 500–1,000 demonstrations, while the marginal value of new task types stays high up to thousands of distinct tasks. In practice, breadth beats depth: 800 episodes each across six tasks in varied environments will usually produce a better-generalising policy than 5,000 episodes of one task for the same budget." },
  { question: "Which teleoperation rig should we use?", answer: "It depends on your robot, task and budget. Handheld wrist-mounted rigs offer the highest typical throughput at 20–60 episodes an hour, while leader-follower bimanual rigs provide exact action–state correspondence on the target robot at 10–30 episodes an hour. VR supports natural manipulation with translation trade-offs; full-body exoskeletons suit humanoid work. We recommend the appropriate method, including when the least expensive option is the right one." },
  { question: "Why does failure data matter?", answer: "A policy trained only on successful episodes has never seen recovery. It does not recognise a partial failure from the inside or know how to get back on track. We deliberately record grasp failures and re-grasps, perturbations, partial completions, near-miss corrections and genuine dead ends as a labelled subset." },
  { question: "Can you collect data without a robot?", answer: "Yes. Egocentric human video capture requires no robot, rig calibration or kinematic mapping, so it scales across environments and task varieties that teleoperation cannot economically reach. It works best as a diversity and pre-training layer beneath a smaller, embodiment-specific teleoperation set." },
  { question: "What formats do you deliver in?", answer: "We support LeRobot-compatible datasets, RLDS and Open X-Embodiment-compatible structures, HDF5 episode files in ALOHA-lineage conventions, or raw synchronised streams with a manifest. Every delivery includes a per-episode metadata sidecar covering task, operator, environment, object set, rig configuration, outcome and calibration reference." },
  { question: "Why do you insist on a pilot batch?", answer: "Format and convention mismatches are catastrophic and easy to miss. Published evaluation work has documented 0% task success from confusing absolute and delta action representation and a 55-percentage-point swing from using the wrong proprioceptive source. A pilot loaded end-to-end in your stack catches these mistakes before volume collection." },
  { question: "How do you keep quality consistent at volume?", answer: "We use managed session lengths with enforced rotation, operator certification against a calibration set, multiple operators per task, per-episode QA and per-operator quality tracking over time so fatigue and drift are caught and re-calibrated." },
  { question: "Do you own or reuse the data you collect for us?", answer: "No. Episodes collected for you are yours exclusively. Nothing is folded into a general dataset, resold or reused for another client. Data is held under ISO 27001 controls and handled according to the retention and destruction schedule agreed at scoping." },
  { question: "How quickly can you start?", answer: "Setup through a cleared pilot batch typically takes about four weeks: task design, environment build, rig calibration, operator training and certification, then the pilot. Volume collection scales from there with rolling delivery so early batches can enter training while later batches are still being collected." },
] as const;

export const programmeSteps = [
  ["01", "Scope & task design", "Weeks 1–2", "Tasks, diversity, failure modes, rig, format and acceptance criteria."],
  ["02", "Environment build", "Weeks 2–3", "Surfaces, lighting, clutter, objects and multiple configurations."],
  ["03", "Rig setup & calibration", "Weeks 2–3", "Configuration checked against the embodiment constraints."],
  ["04", "Operator certification", "Weeks 3–4", "Calibration tasks and the failure-injection protocol."],
  ["05", "Pilot batch", "Week 4", "Loaded end-to-end in your stack. Nothing scales until this clears."],
  ["06", "Volume collection", "Week 5 onward", "Per-episode QA, operator tracking and rolling delivery."],
  ["07", "Ongoing review", "Continuous", "Coverage reports and re-scoping against emerging weaknesses."],
] as const;
