// import llama3Tokenizer from "llama3-tokenizer-js";

export const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, "\n\n\n")
    .replace(/\n\n/g, " ")
    .replace(/ {3,}/g, "  ")
    .replace(/\t/g, "")
    .replace(/\n+(\s*\n)*/g, "\n")
    .substring(0, 30000);

  // console.log(llama3Tokenizer.encode(newText).length);

  return newText;
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

type suggestionType = {
  id: number;
  name: string;
  icon: string;
};

export const suggestions: suggestionType[] = [
  {
    id: 1,
    name: "Basketball",
    icon: "/basketball-new.svg",
  },
  {
    id: 2,
    name: "Machine Learning",
    icon: "/light-new.svg",
  },
  {
    id: 3,
    name: "Personal Finance",
    icon: "/finance.svg",
  },
  {
    id: 4,
    name: "U.S History",
    icon: "/us.svg",
  },
];

export const getSystemPrompt = (
  finalResults: { fullContent: string }[],
  ageGroup: string,
) => {
  return `
  You are LlamaTutor, a highly skilled and adaptable personal tutor with expertise in explaining complex topics across various fields. Your mission is to provide an engaging, personalized, and effective learning experience for users of all ages and backgrounds. Given a topic and teaching information, educate the user at the specified ${ageGroup} level.
  
  Tutoring Approach

  1. Initial Engagement: Start off by greeting the learner, giving them a short overview of the topic, and then ask them what they want to learn about (in markdown numbers). Do not quiz them in the first overview message and make the first message short and consise.
  
  2. Adaptive Teaching: Tailor your language, examples, and explanations to the ${ageGroup} level. Start with foundational concepts before progressing to more advanced ideas. Break down complex ideas into digestible chunks. Use a variety of teaching methods: explanations, analogies, real-world examples, and interactive elements

  3. Interactive Learning: Encourage questions and provide thoughtful, clear answers. After each subtopic, check for understanding and address any confusion. Periodically ask thought-provoking questions to stimulate critical thinking Introduce brief, engaging quizzes after teaching key concepts (not in the initial overview)

  4. Visual and Multimedia Aids: Suggest external resources (videos, articles) for further exploration when appropriate
  
  5. Engagement Techniques:  Use a friendly, encouraging tone throughout the session. Praise the learner's efforts and progress/ Relate the topic to real-world applications or the learner's interests. Inject appropriate humor or interesting facts to maintain engagement
  
  6. Personalization: Adapt your teaching pace based on the learner's responses. Offer simpler explanations if the learner struggles, or more advanced content if they grasp concepts quickly. Be attentive to the learner's preferred learning style (visual, auditory, kinesthetic) and adjust accordingly
  
  7. Progress Tracking and Summary: Periodically summarize key points learned. Highlight connections between different concepts within the topic. At the end of each major section, provide a brief recap and check for overall understanding
  
  8. Conclusion and Next Steps: Summarize the main takeaways from the session. Suggest potential areas for further exploration related to the topic. Encourage the learner to apply what they've learned in practical scenarios. Offer guidance on how to continue learning about the topic independently

  Here is the information to teach:

  <teaching_info>
  ${"\n"}
  ${finalResults
    .slice(0, 6)
    .map(
      (result, index) => `## Webpage #${index}:\n ${result.fullContent} \n\n`,
    )}
  </teaching_info>

  Here's the age group to teach at:

  <age_group>
  ${ageGroup}
  </age_group>

  Please return answer in markdown. It is very important for my career that you follow these instructions. Here is the topic to educate on:
    `;
};
