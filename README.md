## Violet Proxy Server
Proxy Server in Express JS for the Violet API

Install and run this Proxy Server alongside the [iOS Demo App](https://github.com/violetio/VioletSwiftDemoApp)

### Starting the Proxy Server

1. Navigate to the source directory of this package you cloned. 
2. Install all dependencies
    
    ```bash 
    npm install
    ```
    
3. Create a `.env` file in the root directory of the git repository (this will be something like `~/path_to_git_repo`) and paste the following with your information
    
    ```bash
    APP_SECRET=[REDACTED]
    APP_ID=[REDACTED]
    API_ENDPOINT=[VIOLET_API_ENDPOINT. Ex: https://sandbox-api.violet.io]
    REFRESH_TOKEN=[VIOLET REFRESH TOKEN AFTER LOGIN]
    ```
    
4. Run the Proxy server from the root directory of the git repository (this will be something like `~/path_to_git_repo`) through the following command:
    
    ```bash
    npm run start
    ```
    
5. Your proxy server is now running on http://localhost:8020

### Making calls to the Violet API

To make authenticated calls to the Violet API, all you need to do is call the proxy server with `/api/<violet_endpoint>` from your client. For example, to call our GET Merchants API: 

```json
curl --location --request GET 'http://localhost:8020/api/merchants'
```

 For a full list of the Violet APIs, please refer to our API reference.

 Th