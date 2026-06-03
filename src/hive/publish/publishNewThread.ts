export function publishThread(
  username: string,
  body: string,
  permlink: string,
  parentAuthor: string,
  parentPermlink: string
): Promise<any> {
  return new Promise((resolve) => {
    const operations = [
      [
        "comment",
        {
          parent_author: parentAuthor,

          parent_permlink: parentPermlink,

          author: username,

          permlink,

          title: "",

          body,

          json_metadata: JSON.stringify({
            app: "leothreads/0.3",
            format: "markdown",
            tags: ["leofinance"],
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