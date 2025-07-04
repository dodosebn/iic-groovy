'use client';

import React, { useRef, useState } from 'react';

const ShareAndCopy = () => {
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyToClipboard = async () => {
    if (linkInputRef.current) {
      try {
        await navigator.clipboard.writeText(linkInputRef.current.value);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const shareOnSocialMedia = (platform: string) => {
    let shareUrl = '';
    const title = 'Hi, Check out this Survey from Idea is Capital';

    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank');
  };

  return (
    <div className="w-full bg-[#fff7ea] md:bg-none px-4 py-8 rounded-xl">
      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#3b2e1e] mb-5 text-center">Share Article:</h3>

      <div className="flex justify-center flex-wrap gap-4 mb-8">
        <button
          className="w-10 h-10 rounded-full bg-[#6d92f6] text-white font-bold text-lg"
          onClick={() => shareOnSocialMedia('facebook')}
        >
          f
        </button>
        <button
          className="w-10 h-10 rounded-full bg-[#2e2e2e] text-white font-bold text-lg"
          onClick={() => shareOnSocialMedia('twitter')}
        >
          x
        </button>
        <button
          className="w-10 h-10 rounded-full bg-[#58c791] text-white font-bold text-lg"
          onClick={() => shareOnSocialMedia('whatsapp')}
        >
          w
        </button>
        <button
          className="w-10 h-10 rounded-full bg-[#ffdb7f] text-white font-bold text-lg"
          onClick={() => shareOnSocialMedia('email')}
        >
          e
        </button>
      </div>

      {/* ✅ COPY BOX */}
      <div className="w-full max-w-full overflow-hidden">
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm w-full max-w-3xl mx-auto">
          <input
            type="text"
            value={currentUrl}
            readOnly
            ref={linkInputRef}
            className="flex-1 min-w-0 h-12 text-sm sm:text-base px-3 outline-none bg-transparent truncate"
          />
          <button
            className="bg-pink-200 border border-[#3b2e1e] text-[#3b2e1e] font-bold py-2 px-4 
              hover:bg-pink-300 transition-all rounded-full whitespace-nowrap"
            onClick={copyToClipboard}
          >
            {isCopied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>

      {/* <hr className="mt-8 border-t border-[#3b2e1e] w-[90%] mx-auto" /> */}
    </div>
  );
};

export default ShareAndCopy;
