'use strict';
// Require the Box SDK and the fs module
const box = require('box-node-sdk');
const fs = require('fs');

// Read and parse the automatically created Box configuration file.
let configFile = fs.readFileSync(__dirname + '/26302194_wreanra5_config.json');
configFile = JSON.parse(configFile);

// Initialize the SDK with the Box configuration file and create a client that uses the Service Account.
let session = box.getPreconfiguredInstance(configFile);
let serviceAccountClient = session.getAppAuthClient('enterprise');

// Use the users.get method to retrieve current user's information by passing 'me' as the ID.
// Since this client uses the Service Account, this will return the Service Account's information.

// serviceAccountClient.folders.getItems('0', null, (err, res) => {
//   console.log(err, res);
// })
serviceAccountClient.files.getEmbedLink('283046381258',
  (err, res) => {
    console.log(err, res);
});

// serviceAccountClient.search.query('FRX-007555', { limit: 1 }, (err, res) => {
//   console.log(err, res);
// })

const uploader = (doc, fileStream) => new Promise((resolve, reject) => {
  serviceAccountClient.files.uploadFile('0', doc, fileStream, (err, data) => {
    if (err) {
      console.log(err);
      return reject(err);
    }
    console.log(data);
    resolve(data);
  })
});

const handler = async () => {
  try {
    const docs = fs.readdirSync(__dirname + '/record');
    for (let doc of docs) {
      const fileStream = fs.createReadStream(__dirname + '/record/' + doc);
      await uploader(doc, fileStream);
    }
  } catch (err) {
    console.log(err);
  }
};

// handler();


// serviceAccountClient.post('/users', {
//   body: {
//     name: 'uim_dashboard',
//     is_platform_access_only: true
//   }
// }, serviceAccountClient.defaultResponseHandler((err, data) => {
//   if (err) console.log(err);
//   if (data) console.log(data);
//   console.log("DATHASDJK", data.id)
// }))
// serviceAccountClient.folders.get({ id: "0", params: {fields: "name,item_collection"} }).then((folder) => {
//   console.log(folder);
// }).catch(err => console.log(err))
// console.log(Object.keys(serviceAccountClient));
// serviceAccountClient.users.get('Admin', null)
//   .then((serviceAccountUser) => {
//     console.log(serviceAccountClient.folders.client.files);
//       // Log the Service Account's login value which should contain "AutomationUser".
//       // For example, AutomationUser_375517_dxVhfxwzLL@boxdevedition.com
//       console.log(serviceAccountUser.login)
//   })
//   .catch((err) => {
//       // Log any errors for debugging
//       console.log(err);
//   });
