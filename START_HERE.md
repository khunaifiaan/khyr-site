# Start here (for the owner)

1. Unzip this folder into the root of your empty GitHub repo (e.g. khyr-site), so CLAUDE.md sits at the top level.
2. Open the repo folder in Claude Code (desktop app Code tab, VS Code, or terminal).
3. Paste this prompt:

   Read CLAUDE.md and build the KHYR Labs website exactly as described. Use reference/prototype.html as the visual source of truth. Set up Astro, the content collections from seed/, the Pages CMS config, then run the build and fix any errors. Show me the site running locally before we deploy, then walk me through connecting Cloudflare Pages and the khyr.my.id domain.

4. When it is done, check the local preview in both languages and both themes, then let Claude Code push to GitHub and follow the Cloudflare steps it gives you.
