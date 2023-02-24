import { _ as s, c as n, o as t, a as e } from "./app.39ffa6d2.js";
const h = JSON.parse(
    '{"title":"Passing content","description":"","frontmatter":{},"headers":[{"level":2,"title":"using the content slot","slug":"using-the-content-slot","link":"#using-the-content-slot","children":[]}],"relativePath":"usage.md"}'
  ),
  a = { name: "usage.md" },
  o = e(
    `<h1 id="passing-content" tabindex="-1">Passing content <a class="header-anchor" href="#passing-content" aria-hidden="true">#</a></h1><h2 id="using-the-content-slot" tabindex="-1">using the content <code>slot</code> <a class="header-anchor" href="#using-the-content-slot" aria-hidden="true">#</a></h2><p>we can use the <code>#content</code> slot to pass desired content to popover</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Popover</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Button</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">content</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">Popover</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div><p>In the above code snippet, the Popover component contains a button and a template element with the <code>#content</code> slot. The content within this slot will be rendered inside the popover when it is displayed.</p><p>To pass custom content to the popover, simply replace the div element within the #content slot with your desired content.</p>`,
    6
  ),
  l = [o];
function p(c, r, i, D, F, d) {
  return t(), n("div", null, l);
}
const g = s(a, [["render", p]]);
export { h as __pageData, g as default };
