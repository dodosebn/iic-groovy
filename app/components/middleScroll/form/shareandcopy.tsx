'use client';

import React, { useRef, useState } from 'react';
import { FaSquareInstagram, FaTiktok, FaWhatsapp, FaTelegram } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';

const ShareAndCopy = () => {
  const linkInputRef = useRef<HTMLInputElement>(null);
  const [isCopied, setIsCopied] = useState(false);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  const title = 'Hi, Check out this Survey from Idea is Capital';

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

    switch (platform) {
      case 'instagram':
        shareUrl = `https://www.instagram.com/?url=${encodeURIComponent(currentUrl)}`;
        break;
      case 'tiktok':
        shareUrl = `https://www.tiktok.com`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${title} ${currentUrl}`)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title)}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(currentUrl)}`;
        break;
      default:
        return;
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="w-full bg-[#fff7ea] md:bg-transparent px-4 py-8 rounded-xl">
      <h3 className="text-[18px] sm:text-[20px] font-bold text-[#3b2e1e] mb-5 text-center">
        Share Article:
      </h3>

      {/* Social Icons */}
      <div className="flex justify-center flex-wrap gap-4 mb-8">
        <button
          aria-label="Share on Instagram"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#6d92f6] text-white"
          onClick={() => shareOnSocialMedia('instagram')}
        >
          <FaSquareInstagram size={20} />
        </button>
        <button
          aria-label="Share on TikTok"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#2e2e2e] text-white"
          onClick={() => shareOnSocialMedia('tiktok')}
        >
          <FaTiktok size={20} />
        </button>
        <button
          aria-label="Share on WhatsApp"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#58c791] text-white"
          onClick={() => shareOnSocialMedia('whatsapp')}
        >
          <FaWhatsapp size={20} />
        </button>
        <button
          aria-label="Share on Telegram"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#0088cc] text-white"
          onClick={() => shareOnSocialMedia('telegram')}
        >
          <FaTelegram size={20} />
        </button>
        <button
          aria-label="Share via Email"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-[#ffdb7f] text-white"
          onClick={() => shareOnSocialMedia('email')}
        >
          <MdEmail size={20} />
        </button>
      </div>

      {/* Copy Link */}
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
            aria-label="Copy link to clipboard"
            className="bg-pink-200 border border-[#3b2e1e] text-[#3b2e1e] font-bold py-2 px-4 
              hover:bg-pink-300 transition-all rounded-full whitespace-nowrap"
            onClick={copyToClipboard}
          >
            {isCopied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShareAndCopy;
