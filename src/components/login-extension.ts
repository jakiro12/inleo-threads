export function loginWithKeychain(
  username: string
): Promise<boolean> {
  return new Promise((resolve) => {
    if (!window.hive_keychain) {
      resolve(false);
      return;
    }

    window.hive_keychain.requestSignBuffer(
      username,
      "Login to InLeo Reposter",
      "Posting",
      (response: any) => {
        resolve(response.success === true);
      }
    );
  });
}