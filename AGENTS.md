<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## TimberX workflow rules

- The canonical website repository is `stratmarketroom/timberx-website`; work inside this repository unless the user explicitly asks to manage the outer planning/archive folder.
- Do not create, convert, vendor, or push an additional root repository for the website unless the user explicitly asks for that repository structure.
- For website changes, the normal flow is: inspect current state, edit only needed site files, run `npm run lint`, run `npm run build`, test locally when relevant, commit in this repository, then push to `origin/main`.
- Treat Vercel/GitHub deployment from `timberx-website` as the production path. Do not introduce submodules or alternative deployment structures without explicit approval.
- If the request is about making the live site reliable, verify the existing `timberx-website` workflow first before proposing any structural changes.
