import { useState, useEffect, useRef } from 'react';
import styles from './FAQ.module.scss';

const faqContent = {
  intro: "Check out our FAQ page for expert tips from GalaxyStar's support team. If you don't find what you're looking for, don't worry—we're here to help! Feel free to reach out to us directly or connect with the GalaxyStar Community for assistance.",
  community: "Want to master your GalaxyStar speaker or earbuds? Watch our step-by-step User Guides on YouTube—simple, clear, and hassle-free!",
  keyboard: {
    image: "/images/galaxy-keyboard-pro3.webp",
    items: [
      {
        question: "How do I update my keyboard's firmware?",
        answer: "First plug in your keyboard using the USB cable and set it to wired mode. Open the GalaxyStar configuration tool - it will automatically detect and install any available updates. When you see a green checkmark, the update is done. Just unplug and replug your keyboard to finish."
      },
      {
        question: "What size are your 75% keyboards?",
        answer: "Our Mercury models measure about 12.5 x 5 inches (32 x 13 cm) - small enough to save desk space but large enough to keep all the important keys. They weigh just under 2 pounds, so they're easy to take anywhere."
      },
      {
        question: "Are these good for gaming?",
        answer: "Definitely! The Mercury K1 Pro has our fastest wireless connection (under 1ms delay) and customizable mechanical switches. The compact size gives you more mouse space while keeping all your gaming controls."
      }
    ]
  },
  mouse: {
    image: "/images/galaxy-mouse-dark.webp",
    items: [
      {
        question: "Can I Return My Mouse If It Doesn't Meet My Expectations?",
        answer: "Absolutely. If your mouse is unused and in its original packaging, you have 30 days to return it. Just contact our support team first - we'll provide a prepaid return label for approved requests. Note: Products bought from other retailers must be returned to those sellers directly, as their return policies may differ from ours."
      },
      {
        question: "What Does the Warranty Cover for Gaming Mice?",
        answer: "Every GalaxyStar mouse comes with a 1-year manufacturer's warranty. This covers any defects in materials or workmanship, but doesn't include normal wear, accidental damage, or modifications. Keep your receipt - you'll need it for warranty service."
      },
      {
        question: "Wired or Wireless: Which Mouse Should I Choose?",
        answer: "It comes down to your gaming style. Wired mice deliver rock-solid performance with zero lag - perfect for esports pros who demand absolute reliability. Wireless models offer freedom of movement and a clean setup, with today's tech nearly matching wired speeds. The best part? GalaxyStar mice give you both - plus Bluetooth. One mouse, three ways to connect. Switch between them instantly depending on your needs."
      }
    ]
  },
  speakers: {
    image: "/images/galaxy-speaker-pro.webp",
    items: [
      {
        question: "What Bluetooth version do GalaxyStar speakers use?",
        answer: "GalaxyStar speakers feature Bluetooth 5.0 technology, offering faster pairing, extended range (up to 30m), lower latency, and improved power efficiency compared to older Bluetooth 4.2 versions."
      },
      {
        question: "Can Mars Pro pair with original Mars speakers?",
        answer: "No - the Mars Pro uses an advanced wireless protocol that's incompatible with first-gen Mars models. For stereo pairing, you'll need two Mars Pro units."
      },
      {
        question: "Are charging bases interchangeable between models?",
        answer: "No. Each speaker generation requires its specific charging base due to different power requirements and connector designs."
      }
    ]
  }
};

function FAQItem({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={styles.faqItem}>
      <div
        className={styles.faqQuestion}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3>{question}</h3>
        <span className={styles.faqToggle}>{isOpen ? '−' : '+'}</span>
      </div>
      {isOpen && <p className={styles.faqAnswer}>{answer}</p>}
    </div>
  );
}

export default function FAQPage() {
  return (
    <div className={styles.faqContainer}>
      <h1 className={styles.faqTitle}>FAQ's</h1>
      <p className={styles.faqIntro}>{faqContent.intro}</p>
      <p className={styles.faqCommunity}>{faqContent.community}</p>

      <section className={styles.faqSection}>
        <h2>Keyboard</h2>
        {faqContent.keyboard.items.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </section>

      <section className={styles.faqSection}>
        <h2>Mouse</h2>
        {faqContent.mouse.items.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </section>

      <section className={styles.faqSection}>
        <h2>Speakers</h2>
        {faqContent.speakers.items.map((item, index) => (
          <FAQItem key={index} question={item.question} answer={item.answer} />
        ))}
      </section>
    </div>
  );
}