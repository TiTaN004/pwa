import React, { useRef, useState } from 'react'
import noise from '../../assets/noise.svg'
import logo from '../../assets/logo.PNG'
import { Menu, X } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Link } from 'react-router-dom';

export default function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null)
  const linksRef = useRef([])
  const nav = useRef(null)

  useGSAP(() => {
        if (menuOpen) {
      gsap.set(overlayRef.current, { display: 'flex' })

      gsap.to(overlayRef.current, {
        duration: 0.5,
        y: 0,
        opacity: 1,
        scale: 1,
        ease: 'power3.out',
      })

      gsap.fromTo(
        linksRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          delay: 0.3,
          ease: 'power3.out',
        }
      )
    } else {
      // Create timeline to sequence exit animations
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(overlayRef.current, { display: 'none' })
        },
      })

      tl.to(linksRef.current, {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.in',
        duration: 0.3,
      })

      tl.to(
        overlayRef.current,
        {
          y: '100%',
          opacity: 0,
          scale: 0.95,
          ease: 'power3.in',
          duration: 0.4,
        },
        '-=0.2' // slight overlap with previous animation to keep it smooth
      )
    }
  }, [menuOpen]);

  useGSAP(()=>{
    const tl = gsap.timeline();

  tl.from(nav.current, {
    y: -100,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
  });
  })

  return (
    <nav ref={nav} className='top-0 fixed z-50 w-screen h-[100px] bg-[rgba(217,217,217,0.02)] backdrop-blur-[146px] text-white flex justify-center items-center'>
        
        {/* Noise svg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("${noise}")`,
            backgroundSize: '100%',
            opacity: 0.5,
          }}
        ></div>

       {/* Content */}
      <div className="relative w-[90%] z-10 flex justify-between items-center font-montserrat">
        <div>
          <Link to={'/'}><img src={logo} alt="logo" className="w-[100px] md:w-[130px]" /></Link>
        </div>

        {/* Hamburger toggle */}
        <div className="lg:hidden z-50">
          {menuOpen ? (
            <X
              className="text-white w-8 h-8 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <Menu
              className="text-white w-8 h-8 cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>

        {/* Desktop links */}
        <div className="hidden lg:flex  w-[60%] min-[1100px]:w-[50%] text-[14px] font-semibold justify-around">
          <Link className='' to="/">HOME</Link>
          <Link className='' to="/products">PRODUCTS</Link>
          <Link className='' to="/about">ABOUT US</Link>
          <Link className='' to="/contact">CONTACT US</Link>
          <Link className='' to="/e-catalogue">E - CATALOGUE</Link>
        </div>
      </div>

      {/* Full-screen overlay menu */}
      <div
        ref={overlayRef}
        id="overlayMenu"
        className="fixed top-0 left-0 w-full h-screen bg-black bg-opacity-95 text-white flex-col justify-center items-center text-2xl gap-6 font-semibold"
        style={{
          transform: 'translateY(-100%) scale(0.95)',
          opacity: 0,
          display: 'none',
        }}
      >
        {['HOME','PRODUCTS', 'ABOUT US', 'CONTACT US', 'E-CATALOGUE'].map(
          (item, i) => (
            <Link
              key={item}
              to={item == 'HOME' ? '/' : `/${item.toLowerCase().split(" ")[0]}`}
              onClick={() => setMenuOpen(false)}
              ref={(el) => (linksRef.current[i] = el)}
              className="cursor-pointer"
            >
              {item}
            </Link>
          )
        )}
      </div>
    </nav>
  )
}
