// src/pages/Onboarding.js
import React, { useState } from 'react';

const cardsData = [
  {
    id: 1,
    title: "Onboarding",
    contentPages: [
      "Welcome to Onboarding! Here you'll learn how to set up your account and get started.",
      "Step 2: Complete the required forms and review company policies.",
      "Step 3: Meet your team and access training resources."
    ]
  },
  {
    id: 2,
    title: "Time Management",
    contentPages: [
      "Manage your time effectively with our tools for tracking hours and scheduling.",
      "View pay periods, overtime, and more detailed metrics.",
      "Learn tips and best practices to maximize productivity."
    ]
  },
  {
    id: 3,
    title: "Job Lists",
    contentPages: [
      "Keep track of all your projects and job assignments in one place.",
      "Organize tasks, deadlines, and progress updates.",
      "Easily assign and reassign work among team members."
    ]
  },
  {
    id: 4,
    title: "Employee Benefits",
    contentPages: [
      "Explore the range of benefits available to you.",
      "Detailed information on health, retirement, and other perks.",
      "Find resources to help you maximize your benefits."
    ]
  },
  {
    id: 5,
    title: "Company Resources",
    contentPages: [
      "Access critical company resources and documents here.",
      "Stay updated with the latest resource releases.",
      "Learn how to utilize these resources effectively."
    ]
  },
  {
    id: 6,
    title: "Employee Directory",
    contentPages: [
      "Browse the employee directory to find contact info and roles.",
      "Use the search and filter tools for quick access.",
      "Connect with your colleagues effortlessly."
    ]
  }
];

function Onboarding() {
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [pageIndex, setPageIndex] = useState(0);

  const handleCardClick = (id) => {
    setSelectedCardId(id);
    setPageIndex(0);
  };

  const handleBackToGrid = () => {
    setSelectedCardId(null);
    setPageIndex(0);
  };

  const handlePrevPage = () => {
    setPageIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNextPage = (card) => {
    setPageIndex((prev) =>
      prev < card.contentPages.length - 1 ? prev + 1 : prev
    );
  };

  if (selectedCardId !== null) {
    // Expanded view for the selected card.
    const selectedCard = cardsData.find((card) => card.id === selectedCardId);
    return (
      // Clicking outside the card will close it.
      <div style={{ padding: '2rem', position: 'relative' }} onClick={handleBackToGrid}>
        <div
          className="glass-card"
          style={{
            minHeight: '400px',
            padding: '2rem',
            textAlign: 'center',
            margin: '3rem auto',
            width: '80%'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="btn btn-primary"
            onClick={handleBackToGrid}
            style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}
          >
            ← Back
          </button>
          <h2 style={{ marginBottom: '1rem', fontSize: '3.6rem' }}>{selectedCard.title}</h2>
          <div style={{ marginBottom: '2rem', minHeight: '100px', fontSize: '1rem' }}>
            {selectedCard.contentPages[pageIndex]}
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={handlePrevPage}
              disabled={pageIndex === 0}
              style={{ marginRight: '1rem' }}
            >
              &lt;
            </button>
            <button
              className="btn btn-primary"
              onClick={() => handleNextPage(selectedCard)}
              disabled={pageIndex === selectedCard.contentPages.length - 1}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Vertical stack view of cards
  return (
    <div style={{ padding: '2rem' }}>
      <h2 className="text-center" style={{ marginBottom: '2rem' }}>
        Onboarding Overview
      </h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {cardsData.map((card) => (
          <div
            key={card.id}
            className="glass-card"
            style={{
              minHeight: '200px',
              width: '33%',
              margin: '0 auto',
              cursor: 'pointer',

              /* Center content horizontally & vertically */
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onClick={() => handleCardClick(card.id)}
          >
            <h3 style={{ fontSize: '2.4rem', margin: 0 }}>{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Onboarding;
