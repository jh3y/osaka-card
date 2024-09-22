'use client';
import React from 'react'
import gsap from 'gsap'
import { Bebas_Neue } from "next/font/google";
const beba = Bebas_Neue({ weight: "400", subsets: ["latin"] });

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
  requestPermission?: () => Promise<'granted' | 'denied'>;
}

export function Card () {
  React.useEffect(() => {
    const UPDATE = ({ x, y }: { x: number, y: number }) => {
      gsap.set(document.documentElement, {
        '--x': gsap.utils.mapRange(0, window.innerWidth, -1, 1, x),
        '--y': gsap.utils.mapRange(0, window.innerHeight, -1, 1, y),
      })
    }
    window.addEventListener('mousemove', UPDATE)
    return () => {
      window.removeEventListener('mousemove', UPDATE)
    }
  }, [])

  React.useEffect(() => {
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const { beta, gamma } = event
      const isLandscape = window.matchMedia('(orientation: landscape)').matches
      if (beta !== null && gamma !== null) {
        gsap.set(document.documentElement, {
          '--x': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(-45, 45, -1, 1, beta) : gsap.utils.mapRange(-45, 45, -1, 1, gamma)),
          '--y': gsap.utils.clamp(-1, 1, isLandscape ? gsap.utils.mapRange(20, 70, 1, -1, Math.abs(gamma)) : gsap.utils.mapRange(20, 70, 1, -1, beta)),
        })
      }
    }
    const initiate = () => {
      const requestPermission = (DeviceOrientationEvent as unknown as DeviceOrientationEventiOS).requestPermission;
      const iOS = typeof requestPermission === 'function';
      if (iOS) {
        Promise.all([
          requestPermission(),
        ]).then((results) => {
          if (results.every((result: string) => result === "granted")) {
            window.addEventListener("deviceorientation", handleOrientation);
          }
        });
      } else {
        window.addEventListener("deviceorientation", handleOrientation);
      }
    };
    document.body.addEventListener('click', initiate, { once: true })
    return () => {
      document.body.removeEventListener('click', initiate)
      window.removeEventListener('deviceorientation', handleOrientation)
    }
  }, [])

  return (
    <article className="w-[600px] aspect-[2/1.1] max-h-[calc(100svh-2rem)] relative overflow-hidden max-w-[calc(100%-2rem)] portrait:min-h-[330px]">
      <div className="assets absolute inset-0 rounded-[4em] overflow-hidden">
        <img className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[660px] max-w-[unset] object-cover select-none pointer-events-none saturate-[1.5] brightness-[0.9]" src="https://assets.codepen.io/605876/do-not-copy-osaka-sky.jpeg" alt="" />
        <h3 className={`${beba.className} absolute left-1/2 top-[6%] m-0 text-[8rem] uppercase text-[canvas]`}>Osaka</h3>
        <img className="absolute top-0 left-1/2 -translate-x-1/2 h-full w-[660px] max-w-[unset] object-cover select-none pointer-events-none" src="https://assets.codepen.io/605876/do-not-copy-osaka-tower.png" alt="" />
      </div>
      <div className="blurs absolute inset-0 [--layers:5]">
        <div>
          <div className="layer absolute inset-0" style={{"--index": 1} as React.CSSProperties}/>
          <div className="layer absolute inset-0" style={{"--index": 2} as React.CSSProperties}/>
          <div className="layer absolute inset-0" style={{"--index": 3} as React.CSSProperties}/>
          <div className="layer absolute inset-0" style={{"--index": 4} as React.CSSProperties}/>
          <div className="layer absolute inset-0" style={{"--index": 5} as React.CSSProperties}/>
        </div>
      </div>
      <div className="content min-h-[32%] absolute bottom-0 w-full text-[canvas] grid gap-[0.2rem] place-items-center content-center pb-[0.5rem] z-20">
        <p className="m-0 flex items-center gap-2 text-[1.2rem] relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5"
          >
            <title>Location Pin</title>
            <path
              d="M15.75 8.25a.75.75 0 0 1 .75.75c0 1.12-.492 2.126-1.27 2.812a.75.75 0 1 1-.992-1.124A2.243 2.243 0 0 0 15 9a.75.75 0 0 1 .75-.75Z"
            />
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM4.575 15.6a8.25 8.25 0 0 0 9.348 4.425 1.966 1.966 0 0 0-1.84-1.275.983.983 0 0 1-.97-.822l-.073-.437c-.094-.565.25-1.11.8-1.267l.99-.282c.427-.123.783-.418.982-.816l.036-.073a1.453 1.453 0 0 1 2.328-.377L16.5 15h.628a2.25 2.25 0 0 1 1.983 1.186 8.25 8.25 0 0 0-6.345-12.4c.044.262.18.503.389.676l1.068.89c.442.369.535 1.01.216 1.49l-.51.766a2.25 2.25 0 0 1-1.161.886l-.143.048a1.107 1.107 0 0 0-.57 1.664c.369.555.169 1.307-.427 1.605L9 13.125l.423 1.059a.956.956 0 0 1-1.652.928l-.679-.906a1.125 1.125 0 0 0-1.906.172L4.575 15.6Z"
              clipRule="evenodd"
            />
          </svg>
          <span>Osaka Castle</span>
        </p>
        <p className="opacity-80 m-0">Osaka, Japan</p>
      </div>
    </article>
  )
}
