export const createExcerpt = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }

  const excerptText = text.slice(0, maxLength).trim() + "...";
  return excerptText;
};
