type suggestionType = {
  id: number;
  name: string;
  icon: string;
};
export const suggestions: suggestionType[] = [
  {
    id: 1,
    name: 'How does photosynthesis work?',
    icon: '/img/icon _leaf_.svg',
  },
  {
    id: 2,
    name: 'What are the benefits of regular exercise?',
    icon: '/img/icon _dumbell_.svg',
  },
  {
    id: 3,
    name: 'Can you explain the theory of relativity?',
    icon: '/img/icon _atom_.svg',
  },
];

type sourceType = {
  id: number;
  name: string;
  link: string;
  img: string;
};

export const sources: sourceType[] = [
  {
    id: 1,
    name: 'How To Design A Website (2024 Guide)',
    link: 'www.forbes.com/advisor/business/software/how-design-website/',
    img: '/img/F.svg',
  },
  {
    id: 2,
    name: '13 tips to make you a better web designer',
    link: 'https://webflow.com/blog/web-design-tips',
    img: '/img/W.svg',
  },
  {
    id: 3,
    name: '17 Essential Web Designer Skills',
    link: 'https://www.indeed.com/career-advice/resumes-cover-letters/web-designing-skills',
    img: '/img/indeed.svg',
  },
  {
    id: 4,
    name: '13 tips to make you a better web designer',
    link: 'https://webflow.com/blog/web-design-tips',
    img: '/img/W.svg',
  },
  {
    id: 5,
    name: '17 Essential Web Designer Skills',
    link: 'https://www.indeed.com/career-advice/resumes-cover-letters/web-designing-skills',
    img: '/img/indeed.svg',
  },
  {
    id: 6,
    name: 'How To Design A Website (2024 Guide)',
    link: 'www.forbes.com/advisor/business/software/how-design-website/',
    img: '/img/F.svg',
  },
];

type answerType = string;

export const answers: answerType[] = [
  'To improve your web design skills, there are several approaches you can take. One effective method is to participate in design competitions, as they push you to work on diverse styles and topics outside of your comfort zone [1]. Staying inspired is also crucial to avoid creative stagnation, so keep yourself updated with exciting designs on platforms such as Awards, Behance, Dribbble, and the Webflow Showcase [2].',
  "Additionally, having a solid understanding of design principles is foundational to becoming a design expert. Even if you don't have an artistic background, knowing basic principles like balance, hierarchy, and contrast can help elevate your designs [3].",
  "Developing soft skills, such as time management, is another essential aspect of improving your web design skills. By effectively managing your time and meeting project deadlines, you'll be better equipped to handle the challenges of a web design career [4].",
  'Consistent typography and imagery are essential for creating a cohesive and clear brand message. Increasing font sizes, especially for headings and important text blocks, can help users quickly recognize key messages and calls to action [5], [6] . Lastly, organizing your resources and tools on an all-in-one platform, like Notion or Google Drive, can help you manage your time and work more efficiently, allowing you to focus on improving your design skills [7].',
  'Information is missing on additional skills and resources that could help improve your web design abilities. Conduct further research to supplement the recommendations provided here.',
];

type similarTopicsType = string;

export const similarTopics: similarTopicsType[] = [
  'Which design competitions can I join for practice?',
  'What are the top design websites to get inspired from?',
  'Where can I organize my design resources?',
];
