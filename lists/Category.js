const { Text, Slug } = require('@keystonejs/fields')

const categoryFields = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
      isUnique: true
    },
    description: {
      type: Text,
      isMultiline: true,
      isRequired: false
    },
    slug: {
      type: Slug,
      isUnique: true
    }
  }
}

module.exports = categoryFields
