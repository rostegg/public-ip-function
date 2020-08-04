## Why?
Well, if you often check your public ip address (for example, various plugins for the desktop), then public api usually have a limit on the request interval and can completely ban you for frequent use of the service.

:warning: Default Firebase functions plan propose only 125k requests per month, this is about `one request every 21 seconds`.
## Setup

There are two options for the function: with public access and access via token:

* Install the Firebase CLI and log in:
```
npm install -g firebase-tools
firebase login
```


* Create Firebase project via CLI or browser:
```
firebase projects:create
```
:warning: Don't forget change name in `.firebaserc`, or just create project with name `public-ip-function`.

:warning: Function use deprecated Node.js 8 runtime, but Node.js >10 runtime for now requires Blaze plan. So, if you use not default Firebase plan, just change `"node"` property in `functions/package.json`

* Deploy function:

    * Public function:
    
    ```
    firebase deploy --only functions:publicFunctions
    ```

    * Auth function:
    
    ```
    firebase deploy --only functions:authFunctions
    ```

* Now you can access via link, like this (or just look for it in Firebase Console):

    * Public function:
    
    ```
    https://us-central1-MY_PROJECT.cloudfunctions.net/getPublicIp
    ```

    * Auth function:
    
    ```
    https://us-central1-MY_PROJECT.cloudfunctions.net/getPublicIpWithAuth?auth=USER_UID
    ```
    
    Create user in `Develop > Authentication > Users > Add User` and use his User UID as access token.
    

