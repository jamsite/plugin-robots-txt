const fs = require('fs')
const path = require('path')
const { PageTemplate } = require('@jamsite/jamsite')

const template = fs.readFileSync(
  path.join(__dirname, 'robots.txt.hbs'),
  { encoding: 'utf8' }
)

module.exports = {
  options: {
    disallow: true,
    sitemap: false
  },

  setOptions (options) {
    this.options = Object.assign({}, this.options, options)
  },

  async onAfterLoadRes (jamsite) {
    if ('robots.txt' in jamsite.pageTemplatePromises) {
      throw new Error('robots.txt page template is already registered!')
    }

    addRobotsTxtPage(jamsite, this.options)
  }
}

function addRobotsTxtPage (jamsite, options) {
  const name = 'robots.txt'
  jamsite.addPageTemplate(name, new PageTemplate(name, template, false, options))
}
