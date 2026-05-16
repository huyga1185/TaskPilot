import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");

test("app shell includes core Nuxt components", async () => {
  const appVue = await readFile(resolve(root, "app/app.vue"), "utf8");

  assert.match(appVue, /<template>/);
  assert.match(appVue, /<NuxtRouteAnnouncer\s*\/>/);
  assert.match(appVue, /<NuxtWelcome\s*\/>/);
});
