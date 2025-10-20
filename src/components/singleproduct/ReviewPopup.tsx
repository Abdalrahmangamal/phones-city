import React, { useState } from 'react';

const StarIcon = ({ rating, index, active }: { rating: number, index: number, active: boolean }) => {
  let face = null;
  if (rating > 0) {
    let mouth;
    if (rating <= 2) {
      // Sad mouth
      mouth = <path d="M13 22.5 C13 22.5 15.5 20.5 18.5 20.5 C21.5 20.5 24 22.5 24 22.5" stroke={active ? '#B36622' : '#C6C6C6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
    } else if (rating === 3) {
      // Neutral mouth
      mouth = <path d="M13 22.5 L24 22.5" stroke={active ? '#B36622' : '#C6C6C6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
    } else {
      // Happy mouth
      mouth = <path d="M13 20.5 C13 20.5 15.5 22.5 18.5 22.5 C21.5 22.5 24 20.5 24 20.5" stroke={active ? '#B36622' : '#C6C6C6'} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />;
    }
    face = (
      <g>
        <circle cx="15" cy="16" r="1.5" fill={active ? '#B36622' : '#C6C6C6'} />
        <circle cx="22" cy="16" r="1.5" fill={active ? '#B36622' : '#C6C6C6'} />
        {mouth}
      </g>
    )
  }

  return (
    <svg
      width="44"
      height="44"
      viewBox="0 0 37 37"
      fill={active ? '#F3AC5D' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      style={{ cursor: 'pointer' }}
    >
      <path
        d="M18.5 2.3125L22.8375 11.0375L32.375 12.4375L25.4375 19.1875L27.175 28.6875L18.5 24.1L9.825 28.6875L11.5625 19.1875L4.625 12.4375L14.1625 11.0375L18.5 2.3125Z"
        stroke={active ? '#F3AC5D' : '#E8E8E8'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {face}
    </svg>
  );
};

const ReviewPopup = ({ onClose }: { onClose: () => void }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: '699px',
          borderRadius: '24px',
          padding: '48px',
          backgroundColor: 'white',
          boxShadow: '0px 30px 80px 0px #0000001A',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
          <h2
            style={{
              fontFamily: 'Roboto',
              fontWeight: 500,
              fontSize: '18px',
              lineHeight: '32px',
              color: '#211C4D',
              textAlign: 'center',
              width: '100%'
            }}
          >
            ارسال مراجعتك
          </h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer', position: 'absolute', right: 0 }}>&times;</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
            <label
              style={{
                fontFamily: 'Roboto',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19.2px',
                color: '#211C4D',
              }}
            >
              قيم الطلب
            </label>
            <div style={{ display: 'flex', gap: '4px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <div key={star} onClick={() => setRating(star)}>
                  <StarIcon rating={rating} index={star} active={star <= rating} />
                </div>
              ))}
            </div>
          </div>

          <textarea
            placeholder="ارسال مراجعتك ............."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{
              width: '100%',
              height: '168px',
              borderRadius: '16px',
              padding: '23px 15px',
              background: '#F6F6F6',
              border: 'none',
              resize: 'none',
              fontFamily: 'Roboto',
              fontSize: '14px',
              color: '#211C4D',
            }}
          />
        </div>

        <button
          style={{
            width: '100%',
            height: '61px',
            borderRadius: '16px',
            background: '#F3AC5D',
            color: 'white',
            border: 'none',
            fontFamily: 'Roboto',
            fontWeight: 700,
            fontSize: '24px',
            cursor: 'pointer',
          }}
        >
          ارسال
        </button>
      </div>
    </div>
  );
};

export default ReviewPopup;