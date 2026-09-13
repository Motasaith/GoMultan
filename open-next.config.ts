import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// Design preview: no page cache needed yet because every page is static.
// For the live store, switch to the R2 incremental cache:
//   import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
//   export default defineCloudflareConfig({ incrementalCache: r2IncrementalCache });
export default defineCloudflareConfig({});
