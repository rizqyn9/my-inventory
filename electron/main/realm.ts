import Realm from "realm"

const APP_ID = "application-0-dkfju"
const realmTypeBehavior = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export const productSchema: Realm.ObjectSchema = {
  name: "product",
  properties: {
    _id: "objectId",
    description: "string",
    image: "string",
    price: "int",
    rating: "double",
    stock: "int",
    title: "string",
  },
  primaryKey: "_id",
}

export let realm: Realm

export async function initRealm() {
  const app = new Realm.App({ id: APP_ID })
  await app.logIn(Realm.Credentials.anonymous())

  realm = await Realm.open({
    schema: [productSchema],
    disableFormatUpgrade: true,
    sync: {
      user: app.currentUser!,
      flexible: true,
      newRealmFileBehavior: realmTypeBehavior,
      existingRealmFileBehavior: realmTypeBehavior,
      initialSubscriptions: {
        rerunOnOpen: true,
        update(subs, realm) {
          subs.add(realm.objects("product"))
        },
      },
    },
  })

  return realm
}
