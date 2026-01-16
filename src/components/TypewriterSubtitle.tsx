import React, { useEffect, useState } from 'react';
type AnimationState = 'typing' | 'pausing' | 'deleting' | 'waiting';
export function TypewriterSubtitle() {
  const phrases = ['Building scalable applications', 'Driving AI-powered development', 'Merging code with creativity', 'Crafting visual stories', 'Mastering the art of the code and the cut', 'Crafting videos that tell a story'];
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [animationState, setAnimationState] = useState<AnimationState>('typing');
  const [showCursor, setShowCursor] = useState(true);
  const currentPhrase = phrases[phraseIndex];
  const longestPhrase = phrases.reduce((a, b) => a.length > b.length ? a : b);
  // Main animation state machine
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    switch (animationState) {
      case 'typing':
        if (displayedText.length < currentPhrase.length) {
          // Continue typing
          timeout = setTimeout(() => {
            setDisplayedText(currentPhrase.slice(0, displayedText.length + 1));
          }, 60); // 60ms per character
        } else {
          // Finished typing, move to pause
          timeout = setTimeout(() => {
            setAnimationState('pausing');
          }, 1700); // 1.7s pause after typing
        }
        break;
      case 'pausing':
        // Pause complete, start deleting
        timeout = setTimeout(() => {
          setAnimationState('deleting');
        }, 0); // Immediate transition
        break;
      case 'deleting':
        if (displayedText.length > 0) {
          // Continue deleting backward
          timeout = setTimeout(() => {
            setDisplayedText(displayedText.slice(0, -1));
          }, 35); // 35ms per character (faster delete)
        } else {
          // Finished deleting, move to waiting
          timeout = setTimeout(() => {
            setAnimationState('waiting');
          }, 400); // 400ms pause after deleting
        }
        break;
      case 'waiting':
        // Waiting complete, move to next phrase and start typing
        setPhraseIndex(prev => (prev + 1) % phrases.length);
        setAnimationState('typing');
        break;
    }
    return () => clearTimeout(timeout);
  }, [displayedText, animationState, currentPhrase, phrases.length]);
  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530); // 530ms blink
    return () => clearInterval(interval);
  }, []);
  return <div className="w-full flex flex-col items-start text-left gap-2 md:gap-3">
    {/* Static Subtitle - appears ONCE */}
    <p className="text-lg md:text-2xl text-gray-200 font-medium tracking-wide">
      Next-Gen Developer & Video Editor
    </p>

    {/* Typewriter effect with phrases */}
    <div className="text-sm md:text-lg text-gray-400 h-6 md:h-7 flex items-center mb-2 md:mb-0" style={{
      minWidth: `${longestPhrase.length * 0.6}em`
    }}>
      <span>{displayedText}</span>
      <span className={`inline-block w-0.5 h-4 md:h-5 bg-cyan-500 ml-1 transition-opacity duration-100 ${showCursor ? 'opacity-100' : 'opacity-0'}`} />
    </div>
  </div>;
}