const dotenv = require('dotenv').config()
const { atTracking } = require('@keystonejs/list-plugins')
const { Keystone } = require('@keystonejs/keystone')
const { PasswordAuthStrategy } = require('@keystonejs/auth-password')
const { GraphQLApp } = require('@keystonejs/app-graphql')
const { AdminUIApp } = require('@keystonejs/app-admin-ui')
const { NextApp } = require('@keystonejs/app-next')
const { StaticApp } = require('@keystonejs/app-static')

const { MongooseAdapter: Adapter } = require('@keystonejs/adapter-mongoose')
const PROJECT_NAME = 'Flesz.Events'
const adapterConfig = { mongoUri: process.env.MONGO_URI }

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  cookieSecret: process.env.COOKIE_SECRET,
  secureCookies: process.env.NODE_ENV === 'production'
})

const isAdmin = ({ authentication: { item: user } }) => {
  return !!user && !!user.isAdmin
}

const isLoggedIn = ({ authentication: { item: user } }) => {
  return !!user
}

const UserSchema = require('./lists/User')
const PostSchema = require('./lists/Post')
const CategorySchema = require('./lists/Category')
const TagSchema = require('./lists/Tag')
const ImageSchema = require('./lists/Image')

keystone.createList('Post', {
  fields: PostSchema.fields,
  labelResolver: (item) => item.title,
  plugins: [
    atTracking({
      createdAtField: 'createdAt',
      updatedAtField: 'updatedAt',
      format: 'dd-MM-yyyy HH:mm:ss',
      access: {
        read: true,
        create: true,
        update: true
      }
    })
  ],
  access: {
    read: true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn
  }
})

keystone.createList('Category', {
  fields: CategorySchema.fields,
  plugins: [
    atTracking({
      createdAtField: 'createdAt',
      updatedAtField: 'updatedAt'
    })
  ],
  access: {
    read: true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn
  }
})

keystone.createList('Tag', {
  fields: TagSchema.fields,
  plugins: [
    atTracking({
      createdAtField: 'createdAt',
      updatedAtField: 'updatedAt'
    })
  ],
  access: {
    read: true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn
  }
})

keystone.createList('User', {
  fields: UserSchema.fields,
  access: {
    read: true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin
  }
})

keystone.createList('Image', {
  fields: ImageSchema.fields,
  labelResolver: (item) =>
    `${item.image.filename} | ${item.image._meta.secure_url}`,
  access: {
    read: true,
    create: isLoggedIn,
    update: isLoggedIn,
    delete: isLoggedIn
  }
})

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: 'User',
  config: {
    identityField: 'email',
    secretField: 'password'
  }
})

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: false,
      authStrategy
    }),
    new NextApp({ dir: 'client' })
  ],
  configureExpress: (app) => {
    app.set('trust proxy', true)
  }
}
