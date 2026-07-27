import React, { useState } from 'react';

export default function SeatingChartSVG() {
  const [hoveredSeat, setHoveredSeat] = useState(null);

  return (
    <div className="max-w-5xl mx-auto p-5">
      <style>{`
        .seating-chart-svg {
          width: 100%;
          height: auto;
          background-color: #0a0a0a;
          border-radius: 12px;
        }

        .conductor-box {
          fill: #1a202c;
        }

        .conductor-text {
          fill: #ffffff;
          font-family: sans-serif;
          font-weight: 700;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .orchestra-seat {
          stroke-width: 2px;
          cursor: pointer;
          transition: all 0.2s ease-in-out;
        }

        .seat-light {
          fill: #d0eae4;
          stroke: #a1cec3;
        }

        .seat-medium {
          fill: #aedbb5;
          stroke: #8ac493;
        }

        .seat-dark {
          fill: #7ac17d;
          stroke: #5e9e61;
        }

        .orchestra-seat:hover {
          fill: #ffffff;
          stroke: #1a202c;
          stroke-width: 3px;
          filter: drop-shadow(0px 4px 6px rgba(0,0,0,0.5));
        }
      `}</style>

      <svg 
        version="1.1" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 900 650" 
        className="seating-chart-svg" 
        preserveAspectRatio="xMidYMid meet"
      >
        <title>DYSO Orchestra Seating Chart</title>
        <desc>An interactive map of the orchestra seating arrangement.</desc>

        {/* Conductor Podium */}
        <g id="conductor-podium">
          <rect x="350" y="30" width="200" height="60" rx="12" className="conductor-box" />
          <text x="450" y="68" textAnchor="middle" className="conductor-text">Conductor</text>
        </g>

        {/* Seat Shape Definition */}
        <defs>
          <rect id="seat-shape" width="58" height="58" rx="10" />
        </defs>

        {/* Upper Left Section */}
        <g id="section-upper-left">
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="120" y="200" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="195" y="190" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="270" y="210" />
          
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="140" y="220" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="215" y="210" />

          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="85" y="255" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="165" y="250" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="235" y="245" />

          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="110" y="295" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-light" x="185" y="285" />
        </g>

        {/* Upper Right Section */}
        <g id="section-upper-right">
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="650" y="195" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="725" y="185" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="805" y="200" />
      
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="700" y="225" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="775" y="230" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="845" y="240" />

          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="735" y="260" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="810" y="275" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="755" y="300" />
        </g>

        {/* Middle Section */}
        <g id="section-middle">
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="350" y="205" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="430" y="225" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="510" y="240" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="585" y="220" />

          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="310" y="250" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="390" y="260" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="470" y="275" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="550" y="285" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="625" y="265" />

          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="270" y="290" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="345" y="300" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="480" y="325" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="560" y="315" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-medium" x="635" y="305" />
        </g>

        {/* Lower Section */}
        <g id="section-lower">
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="320" y="340" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="410" y="335" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="580" y="345" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="685" y="335" />
          
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="380" y="380" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="480" y="385" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="560" y="390" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="640" y="375" />

          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="350" y="430" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="430" y="440" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="525" y="440" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="610" y="430" />

          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="280" y="465" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="375" y="485" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="470" y="495" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="565" y="490" />
          <use xlinkHref="#seat-shape" className="orchestra-seat seat-dark" x="655" y="470" />
        </g>
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-6 mt-8">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#d0eae4' }} />
          <span className="text-[#ededed] text-sm">Violin I</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#aedbb5' }} />
          <span className="text-[#ededed] text-sm">Violin II & Viola</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded" style={{ backgroundColor: '#7ac17d' }} />
          <span className="text-[#ededed] text-sm">Cello & Bass</span>
        </div>
      </div>
    </div>
  );
}