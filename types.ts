export interface MemePackage {
  title: string;
  url: string;
  finalModelRepresentation: {
    type: 'document' | 'text';
    content: string; // URL to the document or the text itself
  };
  imagePrompts: [string, string];
  generatedImages: [string, string]; // URLs to the images
}
