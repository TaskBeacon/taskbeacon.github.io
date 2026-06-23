import fs from "node:fs";
import path from "node:path";

export type SiteDocId =
  | "taps"
  | "localization"
  | "versioning"
  | "getting-started"
  | "cli-qa"
  | "audio-instructions";

const DOC_PATHS: Record<SiteDocId, string> = {
  taps: "source/taps.md",
  localization: "source/localization.md",
  versioning: "source/versioning.md",
  "getting-started": "source/tutorial-getting-started.md",
  "cli-qa": "source/tutorial-cli-qa.md",
  "audio-instructions": "source/text2voice.md"
};

function rewriteDocRoles(markdown: string): string {
  const routeMap: Record<string, string> = {
    taps: "/framework/taps/",
    localization: "/tutorial/localization/",
    versioning: "/contribute/versioning/",
    "tutorial-getting-started": "/tutorial/getting-started/",
    "tutorial-cli-qa": "/tutorial/cli-qa/",
    text2voice: "/tutorial/audio-instructions/"
  };

  return markdown.replace(/\{doc\}`([^`<]+?)\s*<([^`>]+)>`/g, (_match, label, target) => {
    const normalizedTarget = String(target).replace(/\.md$/i, "");
    const route = routeMap[normalizedTarget.toLowerCase()];
    if (route) return `[${label}](${route})`;
    return `[${label}](https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/source/${normalizedTarget}.md)`;
  });
}

function rewriteSphinxImages(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const imageMatch = /^\.\.\s+image::\s+(.+?)\s*$/.exec(lines[index]);
    if (!imageMatch) {
      out.push(lines[index]);
      continue;
    }

    const imagePath = imageMatch[1].trim();
    let alt = "Document image";

    while (index + 1 < lines.length && /^\s+:\w+:/.test(lines[index + 1])) {
      index += 1;
      const altMatch = /^\s+:alt:\s+(.+?)\s*$/.exec(lines[index]);
      if (altMatch) alt = altMatch[1].trim();
    }

    out.push(`![${alt}](${imagePath})`);
  }

  return out.join("\n");
}

function normalizeSiteMarkdown(markdown: string): string {
  return rewriteSphinxImages(rewriteDocRoles(markdown));
}

export function readSiteDoc(docId: SiteDocId): string {
  const relativePath = DOC_PATHS[docId];
  const absolutePath = path.join(process.cwd(), relativePath);
  return normalizeSiteMarkdown(fs.readFileSync(absolutePath, "utf8"));
}

export function siteDocGithubUrl(docId: SiteDocId): string {
  return `https://github.com/TaskBeacon/taskbeacon.github.io/blob/main/${DOC_PATHS[docId]}`;
}
