const { CloudinaryAdapter } = require('@keystonejs/file-adapters')
const { CloudinaryImage } = require('@keystonejs/fields-cloudinary-image')

const fileAdapter = new CloudinaryAdapter({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  apiKey: process.env.CLOUDINARY_KEY,
  apiSecret: process.env.CLOUDINARY_SECRET,
  folder: process.env.FOLDER_NAME
})

const imageFields = {
  fields: {
    image: {
      type: CloudinaryImage,
      adapter: fileAdapter,
      hooks: {
        beforeChange: async ({ existingItem }) => {
          if (existingItem && existingItem.image) {
            await fileAdapter.delete(existingItem.image)
          }
        }
      }
    }
  },
  hooks: {
    afterDelete: async ({ existingItem }) => {
      if (existingItem.image) {
        await fileAdapter.delete(existingItem.image)
      }
    }
  }
}

module.exports = imageFields
