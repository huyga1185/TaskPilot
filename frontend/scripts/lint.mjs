import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const filesToCheck = [
  {
    path: "app/app.vue",
    requiredSnippets: ["<template>", "NuxtRouteAnnouncer", "NuxtWelcome"],
  },
  {
    path: "nuxt.config.ts",
    requiredSnippets: ["defineNuxtConfig", "compatibilityDate"],
  },
];

const mergeConflictMarkerPattern = /^(<<<<<<<|=======|>>>>>>>)/m;
let hasError = false;

for (const file of filesToCheck) {
  const content = await readFile(resolve(root, file.path), "utf8");

  if (mergeConflictMarkerPattern.test(content)) {
    console.error(`Merge conflict markers found in ${file.path}`);
    hasError = true;
  }

  for (const snippet of file.requiredSnippets) {
    if (!content.includes(snippet)) {
      console.error(`Missing "${snippet}" in ${file.path}`);
      hasError = true;
    }
  }
}

if (hasError) {
  process.exit(1);
}

console.log("Frontend checks passed.");
