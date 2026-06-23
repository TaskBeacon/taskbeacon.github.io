import assert from "node:assert/strict";
import {
  taskFlowOutputForRepo,
  taskFlowPublicPath,
  taskFlowRawUrl
} from "./task-flow-assets.mjs";

assert.equal(taskFlowPublicPath("T000001-ax-cpt"), "/task-flows/T000001-ax-cpt.webp");

assert.equal(
  taskFlowRawUrl({
    fullName: "TaskBeacon/T000001-ax-cpt",
    defaultBranch: "main"
  }),
  "https://raw.githubusercontent.com/TaskBeacon/T000001-ax-cpt/main/task_flow.png"
);

assert.deepEqual(
  taskFlowOutputForRepo({
    repo: "T000001-ax-cpt",
    outDir: "public/task-flows"
  }),
  {
    fileName: "T000001-ax-cpt.webp",
    publicPath: "/task-flows/T000001-ax-cpt.webp",
    outputPath: "public/task-flows/T000001-ax-cpt.webp"
  }
);

console.log("task-flow asset helpers ok");
