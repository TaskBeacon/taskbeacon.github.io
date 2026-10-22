export function documentationHeadings(markdown: string) {
  let fence: string | null = null;
  return markdown.split(/\r?\n/).flatMap((line, index) => {
    const marker = line.trim().match(/^(`{3,}|~{3,})/)?.[1];
    if (marker) { fence = fence ? (marker[0] === fence[0] && marker.length >= fence.length ? null : fence) : marker; return []; }
    if (fence) return [];
    const heading = line.match(/^##\s+(.+?)(?:\s+#+)?\s*$/);
    return heading ? [{ id: `doc-line-${index + 1}`, title: heading[1].replace(/[*`]/g, "") }] : [];
  });
}
