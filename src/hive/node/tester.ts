import { hiveClient } from "../client";

export async function getUserPost(
  author: string,
  permlink: string
) {
  const result = await hiveClient.call(
    "condenser_api",
    "get_content",
    [
      author,
      permlink
    ]
  );

  console.log(result);

  return result;
}