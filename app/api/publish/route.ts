import { NextRequest, NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import fs from "fs";
import path from "path";
import type { CompanyConfig } from "@/lib/types";

type PublishBody = Required<Omit<CompanyConfig, "proof">>;

function generateTS(form: PublishBody): string {
  const arr = (items: string[]) =>
    items.map((item) => `    ${JSON.stringify(item)},`).join("\n");

  return [
    `import type { CompanyConfig } from "@/lib/types";`,
    ``,
    `const config: CompanyConfig = {`,
    `  slug: ${JSON.stringify(form.slug)},`,
    `  company: ${JSON.stringify(form.company)},`,
    `  role: ${JSON.stringify(form.role)},`,
    `  accent: ${JSON.stringify(form.accent)},`,
    `  email: ${JSON.stringify(form.email)},`,
    ``,
    `  hero: ${JSON.stringify(form.hero)},`,
    `  heroSubtitle:`,
    `    ${JSON.stringify(form.heroSubtitle)},`,
    ``,
    `  focusAreas: [`,
    arr(form.focusAreas),
    `  ],`,
    ``,
    `  whyUseful: [`,
    arr(form.whyUseful),
    `  ],`,
    ``,
    `  whyCompany:`,
    `    ${JSON.stringify(form.whyCompany)},`,
    ``,
    `  closing: ${JSON.stringify(form.closing)},`,
    `};`,
    ``,
    `export default config;`,
    ``,
  ].join("\n");
}

function isStringArray(val: unknown): val is string[] {
  return Array.isArray(val) && val.every((item) => typeof item === "string");
}

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not Found", { status: 404 });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const { slug, company, role, accent, email, hero, heroSubtitle, focusAreas, whyUseful, whyCompany, closing } = body;

  // Validate required string fields
  const stringFields: [string, unknown][] = [
    ["slug", slug], ["company", company], ["role", role], ["accent", accent],
    ["email", email], ["hero", hero], ["heroSubtitle", heroSubtitle],
    ["whyCompany", whyCompany], ["closing", closing],
  ];
  for (const [field, value] of stringFields) {
    if (!value || typeof value !== "string" || value.trim() === "") {
      return NextResponse.json({ error: `${field} is required`, field }, { status: 400 });
    }
  }

  // Validate array fields
  if (!isStringArray(focusAreas) || focusAreas.filter(Boolean).length === 0) {
    return NextResponse.json({ error: "At least one focus area is required", field: "focusAreas" }, { status: 400 });
  }
  if (!isStringArray(whyUseful) || whyUseful.filter(Boolean).length === 0) {
    return NextResponse.json({ error: "At least one why-useful item is required", field: "whyUseful" }, { status: 400 });
  }

  // Validate slug format
  const slugStr = slug as string;
  if (!/^[a-z0-9-]+$/.test(slugStr)) {
    return NextResponse.json(
      { error: "Slug must be lowercase letters, numbers, and hyphens only", field: "slug" },
      { status: 400 }
    );
  }

  // Check slug doesn't already exist locally
  const filePath = path.join(process.cwd(), "content", "companies", `${slugStr}.ts`);
  if (fs.existsSync(filePath)) {
    return NextResponse.json(
      { error: `A page for "${slugStr}" already exists`, field: "slug" },
      { status: 400 }
    );
  }

  // Read GitHub env vars (only inside the handler — never at module level)
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH ?? "main";

  if (!token || !owner || !repo) {
    const missing = [!token && "GITHUB_TOKEN", !owner && "GITHUB_OWNER", !repo && "GITHUB_REPO"]
      .filter(Boolean)
      .join(", ");
    return NextResponse.json(
      { error: `Missing .env.local variables: ${missing}. Create .env.local from .env.local.example and add your GitHub token.` },
      { status: 500 }
    );
  }

  const form: PublishBody = {
    slug: slugStr,
    company: company as string,
    role: role as string,
    accent: accent as string,
    email: email as string,
    hero: hero as string,
    heroSubtitle: heroSubtitle as string,
    focusAreas: (focusAreas as string[]).filter(Boolean),
    whyUseful: (whyUseful as string[]).filter(Boolean),
    whyCompany: whyCompany as string,
    closing: closing as string,
  };

  const fileContent = generateTS(form);
  const githubPath = `content/companies/${slugStr}.ts`;
  const octokit = new Octokit({ auth: token });

  try {
    // 1. Get the current branch ref
    const { data: refData } = await octokit.git.getRef({
      owner, repo, ref: `heads/${branch}`,
    });
    const baseCommitSha = refData.object.sha;

    // 2. Get the base tree SHA from the commit
    const { data: commitData } = await octokit.git.getCommit({
      owner, repo, commit_sha: baseCommitSha,
    });
    const baseTreeSha = commitData.tree.sha;

    // 3. Create a blob for the new file
    const { data: blobData } = await octokit.git.createBlob({
      owner, repo,
      content: Buffer.from(fileContent, "utf-8").toString("base64"),
      encoding: "base64",
    });

    // 4. Create a new tree with the file added
    const { data: treeData } = await octokit.git.createTree({
      owner, repo,
      base_tree: baseTreeSha,
      tree: [{ path: githubPath, mode: "100644", type: "blob", sha: blobData.sha }],
    });

    // 5. Create the commit
    const { data: newCommit } = await octokit.git.createCommit({
      owner, repo,
      message: `Add /for/${slugStr} page for ${form.company} application`,
      tree: treeData.sha,
      parents: [baseCommitSha],
    });

    // 6. Update the branch ref
    await octokit.git.updateRef({
      owner, repo,
      ref: `heads/${branch}`,
      sha: newCommit.sha,
    });

    return NextResponse.json({
      success: true,
      commitSha: newCommit.sha,
      vercelUrl: `https://araammarmoud.com/for/${slugStr}`,
      estimatedDeployTime: "~90 seconds",
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: `GitHub API error: ${message}` }, { status: 500 });
  }
}
