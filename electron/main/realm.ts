import Realm from "realm"

declare global {
  // Import realm to prevent referencing type from global
  // Realm global is deprecated
  // @deprecated — Will be removed in v13.0.0. Please use an import statement
  type _Realm = import("realm")
  interface Realm extends _Realm {}

  // Assign realm client to global runtime
  // eslint-disable-next-line no-var
  var realm: _Realm
}

const APP_ID = "application-0-dkfju"

const realmTypeBehavior = {
  type: Realm.OpenRealmBehaviorType.OpenImmediately,
}

export async function initRealm(opts: Realm.Configuration) {
  const app = new Realm.App({ id: APP_ID })
  await app.logIn(Realm.Credentials.anonymous())

  globalThis.realm = await Realm.open({
    schema: opts.schema,
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

export function ObjectId(id: string) {
  return new Realm.BSON.ObjectID(id)
}
