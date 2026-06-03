export function publishPost(
  username: string,
  title: string,
  body: string,
  permlink: string
): Promise<any> {
  return new Promise((resolve) => {
    const operations = [
      [
        "comment",
        {
          parent_author: "",
          parent_permlink: "blog",

          author: username,
          permlink,

          title,
          body,

          json_metadata: JSON.stringify({
            tags: ["blog"],
            app: "my-hive-app/0.1",
          }),
        },
      ],
    ];

    window.hive_keychain?.requestBroadcast(
      username,
      operations,
      "Posting",
      (response: any) => {
        resolve(response);
      }
    );
  });
}