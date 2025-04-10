import { useState } from 'react';

interface ShareButtonsProps {
  conversationText: string;
}

export const ShareButtons = ({ conversationText }: ShareButtonsProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(conversationText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareConversation = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LlamaTutor Conversation',
          text: conversationText,
        });
      } catch (err) {
        console.error('Failed to share:', err);
      }
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <button
        onClick={copyToClipboard}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      {navigator.share && (
        <button
          onClick={shareConversation}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Share
        </button>
      )}
    </div>
  );
};
