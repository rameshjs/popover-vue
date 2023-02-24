import { _ as s, c as n, o as a, a as e } from "./app.39ffa6d2.js";
const h = JSON.parse(
    '{"title":"Events","description":"","frontmatter":{},"headers":[],"relativePath":"events.md"}'
  ),
  o = { name: "events.md" },
  t = e(
    `<h1 id="events" tabindex="-1">Events <a class="header-anchor" href="#events" aria-hidden="true">#</a></h1><table><thead><tr><th>Name</th><th>Description</th></tr></thead><tbody><tr><td><code>open:popover</code></td><td>Triggered when the Popover is opened.</td></tr><tr><td><code>close:popover</code></td><td>Triggered when the Popover is hidden.</td></tr></tbody></table><p>On occasion, it may be necessary to include some additional behaviors when opening or closing Popover. The provided events can be utilized for this purpose:</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight" tabindex="0"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Popover</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@open:popper</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@close:popper</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Button</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Demo</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">Button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#A6ACCD;"> </span><span style="color:#89DDFF;">#</span><span style="color:#C792EA;">content</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">      </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span><span style="color:#A6ACCD;">Content</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">    </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#A6ACCD;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">Popover</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span></code></pre></div>`,
    4
  ),
  p = [t];
function l(r, c, D, F, y, i) {
  return a(), n("div", null, p);
}
const _ = s(o, [["render", l]]);
export { h as __pageData, _ as default };
