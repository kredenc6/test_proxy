import axios from "axios";
import { Context } from "aws-lambda";

export async function handler(event: any, context: Context) {
  try {
    const response = await axios.get("https://swapi.dev/api/people/1");
    if (!(response.status >= 200 && response.status < 300)) {
      // NOT res.status >= 200 && res.status < 300
      return { statusCode: response.status, body: response.statusText };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ msg: response.data.name })
    };
  } catch (err) {
    console.log(err); // output to netlify function log
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }) // Could be a custom message or object i.e. JSON.stringify(err)
    };
  }
}
