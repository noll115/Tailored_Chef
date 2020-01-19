import { Stitch, AnonymousCredential, RemoteMongoClient } from "mongodb-stitch-react-native-sdk";
let appClient = null;
let currUserID = null;
let mongoClient = null;
let db = null
let recipes = null;



let isLoggedIn = () => {
    return currUserID !== null;
};
let getUserID = () => {
    return currUserID;
};

let connectToCollection = client => {
    mongoClient = client.getServiceClient(
        RemoteMongoClient.factory,
        "mongodb-atlas"
    );
    db = mongoClient.db("CruzHacks")
    recipes = db.collection("recipes");
}

let loadClient = () => {
    if (!Stitch.defaultClientAppId) {
        return Stitch.initializeDefaultAppClient('cruzhacks2020-cldcx')
            .then(client => {
                appClient = client;
                if (client.auth.isLoggedIn) {
                    currUserID = client.auth.user.id;
                }
                connectToCollection(client);
                return client;
            })
    } else {
        appClient = Stitch.defaultAppClient;
        connectToCollection(appClient);
        return loginUser();
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
    return recipes.find({ calories: { $lt: calories } }, { a: 1 }).toArray();
}

let addRecipe = () => {

    return recipes.insertOne({
        title: "test",
        tasks: ["lol", "lols"]
    })
        .then(() => {
            console.log("added test");

        })
}


export default { isLoggedIn, getUserID, loadClient, loginUser, logOutUser, quieryForLTCals };