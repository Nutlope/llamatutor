export const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n");

  return newText.substring(0, 40000);
};

export async function fetchWithTimeout(
  url: string,
  options = {},
  timeout = 3000,
) {
  // Create an AbortController
  const controller = new AbortController();
  const { signal } = controller;

  // Set a timeout to abort the fetch
  const fetchTimeout = setTimeout(() => {
    controller.abort();
  }, timeout);

  // Start the fetch request with the abort signal
  return fetch(url, { ...options, signal })
    .then((response) => {
      clearTimeout(fetchTimeout); // Clear the timeout if the fetch completes in time
      return response;
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        throw new Error("Fetch request timed out");
      }
      throw error; // Re-throw other errors
    });
}

export const getSystemPrompt = (finalResults: { fullContent: string }[]) => {
  return `
  You are an interactive personal tutor. Given a topic and the information to teach, please educate the user about it at a high school level. Please start off by greeting the learner, giving them an overview of the topic, and then ask the user what they want to learn about. Continue to be interactive and don't be afraid to quiz them on the material after explaining it sometimes.

  Here is the information to teach:

  <teaching_info>
  ${"\n"}
  ${finalResults.map(
    (result, index) => `## Webpage #${index}:\n ${result.fullContent} \n\n`,
  )}
  </teaching_info>

  It is very important for my career that you follow these instructions. Here is the topic to educate on:
    `;
};
