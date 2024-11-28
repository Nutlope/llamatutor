import React from "react";

export function ShareButtons({ conversationText }: { conversationText: string }) {
  const shareToTwitter = () => {
    const text = encodeURIComponent(conversationText);
    const url = `https://twitter.com/intent/tweet?text=${text}`;
    window.open(url, "_blank");
  };

  const shareToClipboard = () => {
    navigator.clipboard.writeText(conversationText).then(() => {
      alert("Conversation copied to clipboard!");
    });
  };

  return (
    <div className="flex gap-4">
      <button
        onClick={shareToTwitter}
        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
      >
        Share to Twitter
      </button>
      <button
        onClick={shareToClipboard}
        className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-700"
      >
        Copy to Clipboard
      </button>
    </div>
  );
}
