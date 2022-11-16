## To run the application
 * Make sure node is installed in your computer
 * `git clone https://github.com/sidheshwar-s/RSA-example.git`
 * `cd RSA-example`
 * `npm install`
 * `npm start` to start the server

## Api end-points

**URL** : `/generate` - **To generate the public and private key**

**Method** : `GET`

**URL** : `/encrypt` - **To encrypt plain text**

**Method** : `POST`

```json
{"message": "your plain text"}
```

**URL** : `/encrypt` - **To decyrpt cipher text**

**Method** : `POST`

```json
{"message": "your cipher text"}
```