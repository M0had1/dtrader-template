---
name: CJS-to-ESM conversions in _common
description: The _common/*.js files in packages/core/src used CommonJS; any file imported via ES `import` must use ES module syntax
---

## Rule
Any file in `packages/core/src/_common/` that is imported by a file using ES `import` syntax must itself use ES module syntax (`export`/`import`), not CommonJS (`module.exports`/`require`).

**Why:** Webpack 5 strict mode throws a runtime error ("ES Modules may not assign module.exports") when a CJS file is referenced via an ES import. Webpack also can't resolve named exports from CJS default exports.

**How to apply:** For any new or modified `_common/` file: use `export default` or `export { ... }` at the bottom; use `import ... from '...'` at the top. Already converted: utility.js, socket_base.js, socket_cache.js, api_middleware.js, network_monitor_base.js, server_time.js.
