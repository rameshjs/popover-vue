module.exports = {
    lang: 'en-US',
    title: 'Popover vue',
    description: 'Vue.js popover component',
  
    base: '/popover-vue/',
  
    themeConfig: {
      repo: 'rameshjs/popover-vue',
      docsRepo: 'rameshjs/popover-vue',
      docsDir: 'docs',
      docsBranch: 'main',
      editLinks: true,
      socialLinks: [{ icon: 'github', link: 'https://github.com/rameshjs/popover-vue' }],
      nav: [{ text: 'Home', link: '/' }],
      sidebar: [
        {
          text: 'Getting Started',
          items: [
            { text: 'Installation', link: '/installation' },
          ],
        },
        {
          text: 'Usage',
          items: [
            { text: 'Passing content', link: '/usage' },
          ],
        },
        {
            text: 'Props',
            items: [
              { text: 'General configuration', link: '/general-configuration' },
            ],
          },
          {
            text: 'Slots',
            items: [
              { text: 'Content', link: '/content' },
              { text: 'Slot props', link: '/slot-props' },
            ],
          },
          {
            text: 'Events',
            items: [
              { text: 'Popover events', link: '/events' },
            ],
          },
          {
            text: 'Customization',
            items: [
              { text: 'css', link: '/css' },
            ],
          },
      ],
    },
  }