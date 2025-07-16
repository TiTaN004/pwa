// import React, { useEffect, useState } from 'react';

// const PremiumTextAnimation = ({ onComplete }) => {
//   const [animate, setAnimate] = useState(false);

//   useEffect(() => {
//     // Start animation after component mounts
//     const timer = setTimeout(() => {
//       setAnimate(true);
//     }, 100);

//     // Call onComplete after animation finishes
//     const completeTimer = setTimeout(() => {
//       if (onComplete) {
//         onComplete();
//       }
//     }, 5000); // 5 seconds total animation time

//     return () => {
//       clearTimeout(timer);
//       clearTimeout(completeTimer);
//     };
//   }, [onComplete]);

//   const splitText = (text) => {
//     return text.split('').map((char, index) => (
//       <span 
//         key={index} 
//         className={`inline-block transform transition-all duration-700 ease-out ${
//           animate 
//             ? 'translate-y-0 opacity-100 animate-bounce-subtle' 
//             : 'translate-y-24 opacity-0'
//         }`}
//         style={{ 
//           transitionDelay: `${index * 80}ms`,
//           animationDelay: `${2000 + index * 80}ms`,
//           display: char === ' ' ? 'inline' : 'inline-block'
//         }}
//       >
//         {char === ' ' ? '\u00A0' : char}
//       </span>
//     ));
//   };

//   return (
//     <>
//       <style jsx>{`
//         @keyframes bounce-subtle {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//         }
        
//         @keyframes float {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-10px); }
//         }
        
//         @keyframes glow-pulse {
//           0%, 100% { opacity: 0.3; }
//           50% { opacity: 0.6; }
//         }
        
//         .animate-bounce-subtle {
//           animation: bounce-subtle 0.6s ease-in-out;
//         }
        
//         .animate-float {
//           animation: float 3s ease-in-out infinite;
//         }
        
//         .animate-glow-pulse {
//           animation: glow-pulse 2s ease-in-out infinite;
//         }
        
//         .letter-shadow {
//           text-shadow: 0 0 20px rgba(168, 85, 247, 0.5);
//         }
//       `}</style>
      
//       <div className="fixed inset-0 z-50 min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center overflow-hidden">
//         <div 
//           className={`text-center relative transition-all duration-1000 ${
//             animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
//           }`}
//         >
//           {/* Background glow effect */}
//           <div className={`absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 blur-3xl rounded-full scale-150 ${animate ? 'animate-glow-pulse' : ''}`}></div>
          
//           {/* Main title */}
//           <h1 className={`text-6xl md:text-8xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent mb-4 relative z-10 letter-shadow ${animate ? 'animate-float' : ''}`}>
//             {splitText('PANTH ENTERPRISE')}
//           </h1>
          
//           {/* Animated line */}
//           <div 
//             className={`h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6 rounded-full transition-all duration-1200 ease-out ${
//               animate ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'
//             }`}
//             style={{ 
//               width: '300px',
//               transformOrigin: 'left center',
//               transitionDelay: '1000ms'
//             }}
//           ></div>
          
//           {/* Subtitle */}
//           <p 
//             className={`text-xl md:text-2xl text-gray-300 font-light tracking-wider relative z-10 transition-all duration-1000 ease-out ${
//               animate ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
//             } ${animate ? 'animate-float' : ''}`}
//             style={{ 
//               transitionDelay: '1500ms',
//               animationDelay: '2s'
//             }}
//           >
//             Experience Excellence
//           </p>
          
//           {/* Decorative elements with animation */}
//           <div className={`absolute -top-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-xl transition-all duration-2000 ${animate ? 'scale-110 animate-glow-pulse' : 'scale-100'}`} style={{ animationDelay: '2.5s' }}></div>
//           <div className={`absolute -bottom-20 -right-20 w-40 h-40 bg-pink-500/10 rounded-full blur-xl transition-all duration-2000 ${animate ? 'scale-110 animate-glow-pulse' : 'scale-100'}`} style={{ animationDelay: '3s' }}></div>
          
//           {/* Additional sparkle effects */}
//           <div className={`absolute top-10 right-20 w-2 h-2 bg-white rounded-full transition-all duration-500 ${animate ? 'opacity-100 animate-ping' : 'opacity-0'}`} style={{ animationDelay: '2.8s' }}></div>
//           <div className={`absolute bottom-20 left-16 w-1 h-1 bg-purple-300 rounded-full transition-all duration-500 ${animate ? 'opacity-100 animate-ping' : 'opacity-0'}`} style={{ animationDelay: '3.2s' }}></div>
//           <div className={`absolute top-1/3 left-10 w-1.5 h-1.5 bg-pink-300 rounded-full transition-all duration-500 ${animate ? 'opacity-100 animate-ping' : 'opacity-0'}`} style={{ animationDelay: '3.5s' }}></div>
//         </div>
        
//         {/* Skip button */}
//         <button 
//           onClick={() => onComplete && onComplete()}
//           className="absolute top-6 right-6 text-white/40 hover:text-white/80 transition-colors duration-300 text-sm font-medium z-60"
//         >
//           Skip Animation
//         </button>
//       </div>
//     </>
//   );
// };

// export default PremiumTextAnimation;


import React, { useEffect, useState } from 'react';

const PremiumTextAnimation = ({ onComplete }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    // Start animation after component mounts
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 200);

    // Call onComplete after animation finishes
    const completeTimer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 4500); // Refined timing

    return () => {
      clearTimeout(timer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const splitText = (text) => {
    return text.split('').map((char, index) => (
      <span 
        key={index} 
        className={`inline-block transform transition-all duration-800 ease-out ${
          animate 
            ? 'translate-y-0 opacity-100 animate-marble-shine' 
            : 'translate-y-16 opacity-0'
        }`}
        style={{ 
          transitionDelay: `${index * 60}ms`,
          animationDelay: `${1800 + index * 60}ms`,
          display: char === ' ' ? 'inline' : 'inline-block'
        }}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <>
      <style jsx>{`
        @keyframes marble-shine {
          0% { transform: translateY(0px); }
          25% { transform: translateY(-4px); }
          50% { transform: translateY(0px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes elegant-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes luxury-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.8; }
        }
        
        @keyframes marble-texture {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes refined-glow {
          0%, 100% { 
            box-shadow: 0 0 30px rgba(213, 37, 29, 0.3),
                       0 0 60px rgba(213, 37, 29, 0.1); 
          }
          50% { 
            box-shadow: 0 0 40px rgba(213, 37, 29, 0.5),
                       0 0 80px rgba(213, 37, 29, 0.2); 
          }
        }
        
        .animate-marble-shine {
          animation: marble-shine 0.8s ease-out;
        }
        
        .animate-elegant-float {
          animation: elegant-float 4s ease-in-out infinite;
        }
        
        .animate-luxury-pulse {
          animation: luxury-pulse 3s ease-in-out infinite;
        }
        
        .animate-marble-texture {
          animation: marble-texture 8s ease-in-out infinite;
        }
        
        .animate-refined-glow {
          animation: refined-glow 2.5s ease-in-out infinite;
        }
        
        .marble-text-shadow {
          text-shadow: 
            0 0 20px rgba(255, 255, 255, 0.3),
            0 0 40px rgba(213, 37, 29, 0.2),
            0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .luxury-gradient-text {
          background: linear-gradient(135deg, #ffffff 0%, #f5f5f5 25%, #ffffff 50%, #e5e5e5 75%, #ffffff 100%);
          background-size: 300% 300%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: marble-texture 6s ease-in-out infinite;
        }
      `}</style>
      
      <div className="fixed inset-0 z-50 min-h-screen bg-[#010000] flex items-center justify-center overflow-hidden">
        {/* Marble texture overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full bg-gradient-to-br from-gray-400 via-gray-200 to-gray-400 opacity-10"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent animate-marble-texture"></div>
        </div>
        
        <div 
          className={`text-center relative transition-all duration-1200 ${
            animate ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          {/* Background luxury glow effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-red-900/10 via-gray-800/10 to-red-900/10 blur-3xl rounded-full scale-150 ${animate ? 'animate-luxury-pulse' : ''}`}></div>
          
          {/* Main title with marble effect */}
          <h1 className={`font-montserrat text-3xl md:text-8xl font-semibold text-white mb-4 relative z-10 marble-text-shadow ${animate ? 'animate-elegant-float' : ''}`}>
          {/* <h1 className={`font-montserrat text-6xl md:text-8xl font-semibold luxury-gradient-text mb-4 relative z-10 marble-text-shadow ${animate ? 'animate-elegant-float' : ''}`}> */}
            {splitText('Pant Enterprise')}
          </h1>
          
          {/* Refined animated line with marble colors */}
          <div 
            className={`h-0.5 bg-gradient-to-r from-transparent via-[#D5251D] to-transparent mx-auto mb-6 rounded-full transition-all duration-1500 ease-out ${
              animate ? 'scale-x-100 opacity-100 animate-refined-glow' : 'scale-x-0 opacity-0'
            }`}
            style={{ 
              width: '320px',
              transformOrigin: 'center',
              transitionDelay: '1200ms'
            }}
          ></div>
          
          {/* Subtitle with refined styling */}
          <p 
            className={`font-montserrat text-sm md:text-2xl text-gray-300 font-light tracking-[0.2em] relative z-10 transition-all duration-1200 ease-out ${
              animate ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${animate ? 'animate-elegant-float' : ''}`}
            style={{ 
              transitionDelay: '1800ms',
              animationDelay: '2.5s'
            }}
          >
            MARBLE EXCELLENCE
          </p>
          
          {/* Refined decorative elements */}
          <div className={`absolute -top-16 -left-16 w-32 h-32 bg-gradient-to-r from-[#D5251D]/5 to-gray-500/5 rounded-full blur-2xl transition-all duration-2500 ${animate ? 'scale-125 animate-luxury-pulse' : 'scale-100'}`} style={{ animationDelay: '3s' }}></div>
          <div className={`absolute -bottom-16 -right-16 w-32 h-32 bg-gradient-to-l from-[#D5251D]/5 to-gray-500/5 rounded-full blur-2xl transition-all duration-2500 ${animate ? 'scale-125 animate-luxury-pulse' : 'scale-100'}`} style={{ animationDelay: '3.5s' }}></div>
          
          {/* Elegant sparkle effects */}
          <div className={`absolute top-8 right-24 w-1.5 h-1.5 bg-[#D5251D] z-50 rounded-full transition-all duration-600 ${animate ? 'opacity-80 animate-ping' : 'opacity-0'}`} style={{ animationDelay: '3.2s' }}></div>
          <div className={`absolute bottom-16 left-20 w-1 h-1 bg-[#D5251D] rounded-full transition-all duration-600 ${animate ? 'opacity-60 animate-ping' : 'opacity-0'}`} style={{ animationDelay: '3.6s' }}></div>
          <div className={`absolute top-1/4 left-12 w-1.5 h-1.5 bg-[#D5251D] rounded-full transition-all duration-600 ${animate ? 'opacity-70 animate-ping' : 'opacity-0'}`} style={{ animationDelay: '4s' }}></div>
          
          {/* Marble veining effect */}
          <div className={`absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent transform rotate-12 transition-all duration-3000 ${animate ? 'opacity-30' : 'opacity-0'}`} style={{ transitionDelay: '2s' }}></div>
          <div className={`absolute top-0 right-1/3 w-px h-full bg-gradient-to-b from-transparent via-[#D5251D]/20 to-transparent transform -rotate-6 transition-all duration-3000 ${animate ? 'opacity-20' : 'opacity-0'}`} style={{ transitionDelay: '2.5s' }}></div>
        </div>
        
        {/* Refined skip button */}
        <button 
          onClick={() => onComplete && onComplete()}
          className="absolute top-8 right-8 text-gray-400 hover:text-white transition-all duration-300 text-sm font-montserrat font-light tracking-wider z-60 hover:scale-105"
        >
          SKIP
        </button>
      </div>
    </>
  );
};

export default PremiumTextAnimation;