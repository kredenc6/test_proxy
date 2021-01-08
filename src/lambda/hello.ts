import { APIGatewayEvent, Context, Callback, Handler } from "aws-lambda";

export const handler: Handler = async (
  event: APIGatewayEvent,
  context: Context,
  callback: Callback
) => {
  const params = event.queryStringParameters;
  const result = {
    statusCode: 200,
    body: JSON.stringify({message: "Hello World"}),
    params
  };
  return result;
  // callback(null, result);
};
