type Tryer<T> = () => Promise<T>;
type TryerSync<T> = () => T;

/**
 * tryCatch is a wrapper for try/catch block
 * The problem with the try/catch block is for us to access
 * the data inside the block, we need to create a "temporary variable"
 * which gives us a temptation to mutate something unexepectedly.
 * Also, adding the block gives our mind extra flow to manage or understand
 *
 * example:
 *
 * let response;
 * try {
 *   response = await getMyAsyncData();
 * } catch ()
 *
 * but with this tryCatch wrapper, we can remove the "temporary variable"
 * and remove the block to understand the flow easily
 *
 * example:
 *
 * const [response, error] = tryCatch(() => getMyAsyncData());
 *
 *
 * The result signature [] is inspired by the programming language Go
 * You can read more about here https://5error.com/go-style-error-handling-in-javascript/
 */

// Support `catcher` if needed
// try-catch that handles async `tryer` function
export const tryCatch = async <T>(
  tryer: Tryer<T>,
) => {
  try {
    const result = await tryer();
    return [result, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
};

export const tryCatchSync = <T>(
  tryer: TryerSync<T>,
) => {
  try {
    const result = tryer();
    return [result, null] as const;
  } catch (error) {
    return [null, error] as const;
  }
};
