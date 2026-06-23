import fs from "node:fs";
import path from "node:path";

const TASK_FLOW_FILE = "task_flow.png";
const TASK_FLOW_WIDTH = 900;
const TASK_FLOW_QUALITY = 78;

export function safeAssetName(name) {
  return String(name ?? "").replace(/[^a-zA-Z0-9._-]/g, "_");
}

export function taskFlowPublicPath(repo) {
  return `/task-flows/${safeAssetName(repo)}.webp`;
}

export function taskFlowRawUrl({ fullName, defaultBranch }) {
  return `https://raw.githubusercontent.com/${fullName}/${encodeURIComponent(
    defaultBranch
  )}/${TASK_FLOW_FILE}`;
}

export function taskFlowContentApiUrl({ org, repo }) {
  return `https://api.github.com/repos/${encodeURIComponent(org)}/${encodeURIComponent(
    repo
  )}/contents/${TASK_FLOW_FILE}`;
}

export function taskFlowOutputForRepo({ repo, outDir }) {
  const fileName = `${safeAssetName(repo)}.webp`;
  return {
    fileName,
    publicPath: taskFlowPublicPath(repo),
    outputPath: `${outDir}/${fileName}`
  };
}

function ensureDir(p) {
  fs.mkdirSync(p, { recursive: true });
}

function copyIfPresent(source, target) {
  if (!fs.existsSync(source)) return false;
  ensureDir(path.dirname(target));
  fs.copyFileSync(source, target);
  return true;
}

async function toWebp(buffer) {
  const sharp = (await import("sharp")).default;
  return sharp(buffer)
    .resize({ width: TASK_FLOW_WIDTH, withoutEnlargement: true })
    .webp({ quality: TASK_FLOW_QUALITY })
    .toBuffer();
}

export async function syncTaskFlowAsset({
  repo,
  fullName,
  defaultBranch,
  updatedAt,
  hasTaskFlow,
  tmpDir,
  existingDir,
  previousTaskFlow = null,
  fetchBinary,
  downloadUrl,
  logger = console
}) {
  if (!hasTaskFlow) return null;

  const output = taskFlowOutputForRepo({ repo, outDir: tmpDir });
  const existingPath = `${existingDir}/${output.fileName}`;
  const source = taskFlowRawUrl({ fullName, defaultBranch });
  const canReuse =
    previousTaskFlow?.updated_at === updatedAt &&
    previousTaskFlow?.thumb === output.publicPath &&
    copyIfPresent(existingPath, output.outputPath);

  if (canReuse) {
    return {
      thumb: output.publicPath,
      source,
      updated_at: updatedAt,
      format: "webp"
    };
  }

  try {
    const raw = await fetchBinary(downloadUrl ?? source);
    if (!raw || raw.byteLength === 0) throw new Error("empty task_flow.png response");
    const webp = await toWebp(Buffer.from(raw));
    ensureDir(path.dirname(output.outputPath));
    fs.writeFileSync(output.outputPath, webp);
    return {
      thumb: output.publicPath,
      source,
      updated_at: updatedAt,
      format: "webp"
    };
  } catch (err) {
    const reused = copyIfPresent(existingPath, output.outputPath);
    const message = err instanceof Error ? err.message : String(err);
    logger.warn?.(
      `Task flow sync failed for ${repo}: ${message}${reused ? " (kept previous asset)" : ""}`
    );
    if (!reused) return null;
    return {
      thumb: output.publicPath,
      source,
      updated_at: previousTaskFlow?.updated_at ?? updatedAt,
      format: "webp"
    };
  }
}
