const { File } = require('@keystonejs/fields')
const { LocalFileAdapter } = require('@keystonejs/file-adapters')

const fileAdapter = new LocalFileAdapter({
  path: '/images',
  src: './images',
  getFilename: ({ originalFilename }) => {
    return originalFilename
  }
})

const imageFields = {
  fields: {
    file: {
      type: File,
      adapter: fileAdapter,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.file) {
            await fileAdapter.delete(existingItem.file)
          }
        }
      }
    }
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem.file) {
        await fileAdapter.delete(existingItem.file)
      }
    }
  }
}

module.exports = imageFields
