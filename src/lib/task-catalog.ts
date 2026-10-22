import type { TaskIndexItem } from "./task-index";

// Editorial navigation categories, not claims of psychometric validation.
const areas: Record<string, number[]> = {
  "Attention & control": [1,3,4,5,11,12,13,14,15,16,18,27,32,33,46,56,58,61,63,64,67,70,71,73,79,80,88,95,114,116,133,136],
  "Memory & learning": [8,9,20,21,28,35,38,40,51,52,53,54,55,57,59,60,65,68,69,75,77,78,82,86,89,90,93,97,100,102,111,112,113,117,118,128,129,130],
  "Decision & reward": [2,6,17,19,22,29,30,31,36,37,39,41,76,81,92,110,124,140],
  "Social & emotion": [3,23,24,25,34,42,87,94,106,107,115,120,122,123,138,139],
  "Perception & action": [26,43,44,45,46,50,57,61,66,71,80,83,84,85,96,99,101,103,105,108,117,121,132,133,134,135,137,141],
  "Language & reasoning": [47,48,49,62,72,74,91,92,98,104,109,119,125,126,127,130,131],
  "Rest & naturalistic viewing": [7,10]
};

export function taskDomains(task: Pick<TaskIndexItem, "id" | "repo">): string[] {
  const id = Number((task.id || task.repo).match(/^[TH](\d{6})/)?.[1]);
  const matches = Object.entries(areas).filter(([, ids]) => ids.includes(id)).map(([label]) => label);
  return matches.length ? matches : ["Other / uncategorized"];
}

export function taskParadigms(task: TaskIndexItem): string[] {
  return task.tags?.paradigm?.length ? task.tags.paradigm : [task.title || task.repo];
}

const summaries: Record<string, string> = {
  T000044: "Tap along with a metronome at different tempos to examine sensorimotor synchronization.",
  T000057: "Respond to targets at four screen positions to examine learning of repeated movement sequences.",
  T000058: "Identify two targets in a rapid visual stream to examine the attentional blink.",
  T000059: "Remember which objects appeared at which positions to examine object–location binding.",
  T000069: "Solve arithmetic problems while remembering items to examine working-memory capacity.",
  T000123: "Make choices in a social interaction task to explore adaptation to another agent's behavior.",
  T000140: "Make numerical estimates after seeing an anchor to explore anchoring effects. This implementation is an unvalidated pilot."
};

export function taskSummary(task: TaskIndexItem): string {
  const id = task.id || task.repo.match(/^T\d{6}/)?.[0] || "";
  if (summaries[id]) return summaries[id];
  const description = task.short_description?.trim();
  if (!description || /^TaskBeacon ID:| task template \(PsyFlow/.test(description)) {
    return `Explore the ${task.title || "task"} procedure, response requirements and setup in the task guide.`;
  }
  return description;
}

export function maturityDescription(value: string): string {
  const descriptions: Record<string, string> = {
    draft: "Draft implementation. Review the procedure and test it before use.",
    smoke_tested: "Basic execution checks reported. This does not establish timing accuracy or scientific validity.",
    piloted: "Pilot use reported. Review the task documentation for the scope and remaining limitations.",
    validated: "Marked validated by its maintainers. Consult the task documentation for the validation evidence.",
    production: "Marked production by its maintainers. Check the task documentation for intended use and evidence."
  };
  return descriptions[value.toLowerCase().replace(/\s+/g, "_")] || "Maintainer-reported status. See the task documentation for details.";
}
