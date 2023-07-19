import axios from 'axios';
import camelcaseKeys from 'camelcase-keys';
import snakecaseKeys from 'snakecase-keys';
import express from 'express';
import dotenv from 'dotenv'
import jwtDecode from 'jwt-decode';

const VIOLET_APP_ID_HEADER = 'X-Violet-App-Id';
const VIOLET_APP_SECRET_HEADER = 'X-Violet-App-Secret';
const VIOLET_TOKEN_HEADER = 'X-Violet-Token';

const apiRoute = express();

dotenv.config();
const port = 8020; // default port to listen

/**
 * Middleware to check cookie authentication
 *
 * @param req
 * @param res
 */
const tokenIsExpired = (token: string) => {
  const { exp }: any = jwtDecode(token);
  // Refresh the token 30 minutes before the token expires
  return exp * 1000 < Date.now() - 1800000;
};

export default tokenIsExpired;

// Fetch a new token with the Violet refresh token
const refreshToken = async (next: any) => {
  try {
    const getTokenResponse = await axios.get(`${process.env.API_ENDPOINT}/v1/auth/token`, {
      headers: {
        [VIOLET_APP_SECRET_HEADER]: process.env.APP_SECRET as string,
        [VIOLET_APP_ID_HEADER]: process.env.APP_ID as string,
        [VIOLET_TOKEN_HEADER]: process.env.REFRESH_TOKEN as string,
      },
    });
  
    return getTokenResponse.data.token;
  } catch (e: any) {
    next(e);
  }
};

let token = '';

export const injectUserToken = async (
  req: any,
  res: any,
  next: any
) => {
  // Check if the server has a valid token for requests
  if (!token || tokenIsExpired(token)) {
    // Login with username and password from environment variables
    token = await refreshToken(next);
  }

  req.headers[VIOLET_TOKEN_HEADER] = token;
  next();
};


const parsedUrl = (req: any) => {
  console.log('start >>> parsedUrl')
  console.log(`http://${req.headers.host}`)
  
  const reqUrlFromFE = new URL(req.url as string, `http://${req.headers.host}`);

  // Trim /api from the pathname
  const pathname = reqUrlFromFE.pathname.substring(4);

  // Append the pathname to the Violet API prefix
  console.log(`${process.env.API_ENDPOINT}/v1` + `${pathname}`);
  console.log('end >>> parsedUrl')
  return `${process.env.API_ENDPOINT}/v1` + `${pathname}`;
};

/**
 * This NextJS api routes forwards all the requests from the client to Violet.
 * This allows us to use the APP_SECRET, APP_ID, and REFRESH_TOKEN environment variables on the server side
 * without exposing it to the browser.
 */
apiRoute.use(injectUserToken)
apiRoute.use(express.json());
apiRoute.all('/api/*', async (req: any, res: any) => {
  try {
    const response = await axios(parsedUrl(req), {
      method: req.method,
      // The Violet API expects snakecase keys in the query and body parameters
      data: req.body,
      params: req.query,
      headers: {
        [VIOLET_APP_SECRET_HEADER]: process.env.APP_SECRET as string,
        [VIOLET_APP_ID_HEADER]: process.env.APP_ID as string,
        [VIOLET_TOKEN_HEADER]: req.headers[VIOLET_TOKEN_HEADER] as string,
        'Content-Type': 'application/json',
      },
    });
    res
      .status(response.status)
      // Convert snakecase keys into camelcase for use within the project
      .json(response.data);
  } catch (e: any) {
    console.log(e)
    res.status(e.response?.status).json(e.response.data);
  }
});

// start the Express server
apiRoute.listen(port, () => {
    console.log( `server started at http://localhost:${port}.`);
});