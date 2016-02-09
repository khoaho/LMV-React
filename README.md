# LMV React

A React-based integration with Autodesk View & Data API (LMV)

Based on [universal-react-flux-boilerplate](https://github.com/voronianski/universal-react-flux-boilerplate) by [Dmitri Voronianski](https://github.com/voronianski) 

## Setup/Usage Instructions
 
* Request your own View & Data API keys from Autodesk developer portal: [developer.autodesk.com](http://developer.autodesk.com)
* Use environment variables to store your credentials:<br />
  ```
  ConsumerKey: process.env.LMV_CONSUMERKEY
  ConsumerSecret: process.env.LMV_CONSUMERSECRET
  ```

* Upload models to your account and get their URN's
  - That tools allows you to upload and translate models without setup required: [models.autodesk.io](http://models.autodesk.io)

* Populate a local or cloud hosted mongoDB (TBD) <br />

* Install node dependencies: <br />
  ```
  npm install
  ```
* build the sample using webpack: <br />
  ```
  webpack --config [webpack.config.dev.js | webpack.config.prod.js]
  ```
* Run the server from the Node.js console, by running the following command: <br />
  ```
  node bin/runServer.js
  ```

* Connect to you local server using a WebGL-compatible browser: [http://localhost:8080/node/lmv-react](http://localhost:8080/node/lmv-react)


## License

[MIT License](http://opensource.org/licenses/MIT).

## Written by 

Written by [Philippe Leefsma](http://adndevblog.typepad.com/cloud_and_mobile/philippe-leefsma.html)<br>
Autodesk Developer Network
