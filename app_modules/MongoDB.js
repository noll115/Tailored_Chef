import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
let appClient = null;
let currUserID = null;
let isLoggedIn = () => {
    return currUserID !== null;
};
let getUserID = () => {
    return currUserID;
};

let loadClient = () => {
    if (!Stitch.defaultClientAppId) {
        return Stitch.initializeDefaultAppClient('cruzhacks2020-cldcx')
            .then(client => {
                appClient = client;
                if (client.auth.isLoggedIn) {
                    currUserID = client.auth.user.id;
                }
                return client;
            })
    } else {
        appClient = Stitch.defaultAppClient;
        return this.loginUser();
    }
};
let loginUser = () => appClient.auth.loginWithCredential(new AnonymousCredential())
    .then(user => {
        console.log(`logged in as ${user.id}`);
        currUserID = user.id;
        return user;
    }).catch(err => {
        console.log(`Failed to log in anonymously: ${err}`);
        currUserID = null;
    });

let logOutUser = () =>
    appClient.auth.logout().then(user => {
        console.log(`Successfully logged out`);
        currUserID = null;
    }).catch(err => {
        console.log(`Failed to log out: ${err}`);
        currUserID = null;
    });


let quieryForLTCals = calories => {

}

let addRecipe = () => {
    const mongoClient = appClient.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
    );
    const db = mongoClient.db("CruzHacks");
    const recipies = db.collection("recipes");
    recipies.insertOne({
        title: "test",
        tasks: ["lol", "lols"]
    })
        .then(() => {
            console.log("added test");

        })
}


export default { isLoggedIn, getUserID, loadClient, loginUser, logOutUser };