import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";
import "../../styles/landing.css"


const faqs = [
  {
    question: "Is StackMaps.sh free?",
    answer:
      "Yes! StackMaps.sh offers a free plan that lets you generate personalized learning roadmaps, track your progress, and access curated learning resources. Premium plans unlock advanced AI mentoring, interview preparation, and productivity features.",
  },
  {
    question: "How does the AI generate personalized roadmaps?",
    answer:
      "Our AI analyzes your current skill level, career goals, preferred technologies, and learning pace to create a customized roadmap. As you complete topics, the roadmap automatically adapts to keep your learning journey optimized.",
  },
  {
    question: "Can I customize my learning roadmap?",
    answer:
      "Absolutely. You can add, remove, reorder, or skip topics at any time. You can also choose your preferred learning resources, set weekly goals, and personalize your learning schedule.",
  },
  {
    question: "Is StackMaps.sh suitable for beginners?",
    answer:
      "Yes. Whether you're a complete beginner or an experienced developer exploring new technologies, StackMaps.sh provides step-by-step guidance, AI assistance, and curated resources tailored to your experience level.",
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section" id="faq">
      <div className="container">

        <div className="faq-header">
          <h2>Frequently Asked Questions</h2>
        </div>

        <div className="faq-flex">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-card ${
                openIndex === index ? "active" : ""
              }`}
            >
              <button
                className="faq-question"
                onClick={() => toggleFAQ(index)}
              >
                <span>{faq.question}</span>

                <div className="faq-icon">
                  {openIndex === index ? (
                    <FaMinus />
                  ) : (
                    <FaPlus />
                  )}
                </div>
              </button>

              <div
                className={`faq-answer ${
                  openIndex === index ? "show" : ""
                }`}
              >
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default FAQ;