export const cleanedText = (text: string) => {
  let newText = text
    .trim()
    .replace(/(\n){4,}/g, '\n\n\n')
    .replace(/\n\n/g, ' ')
    .replace(/ {3,}/g, '  ')
    .replace(/\t/g, '')
    .replace(/\n+(\s*\n)*/g, '\n');

  if (newText.length > 50000) {
    return newText.substring(0, 50000);
  }
  return newText;
};
