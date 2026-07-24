import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import TopNavbar from "../../components/common/TopNavbar";
// import Logo from "../../components/common/Logo";

import mascot from "../../assets/mascot-robo.png";

import {
  FaArrowRight,
  FaArrowLeft,
  FaForward,
  FaRobot,
  FaCircleCheck,
  FaBrain,
  FaMagnifyingGlass,
  FaCode,
  FaGraduationCap,
  FaServer,
  FaLaptopCode,
  FaLayerGroup,
  FaChartLine,
  FaGears,
  FaMobileScreen,
  FaGamepad,
  FaShieldHalved,
  FaCloud,
  FaPalette,
  FaXmark,
  FaSpinner,
  FaCircleExclamation,
} from "react-icons/fa6";

import "../../styles/wizard.css";

/* ------------------------------------------------------------------ */
/* Static data                                                         */
/* ------------------------------------------------------------------ */

const ROLES = [
  {
    id: "backend-developer",
    title: "Backend Developer",
    description: "APIs, databases and the systems that power everything.",
    icon: FaServer,
  },
  {
    id: "frontend-developer",
    title: "Frontend Developer",
    description: "Interfaces people touch, click and remember.",
    icon: FaLaptopCode,
  },
  {
    id: "fullstack-developer",
    title: "Full Stack Developer",
    description: "Comfortable on both sides of the stack.",
    icon: FaLayerGroup,
  },
  {
    id: "ai-engineer",
    title: "AI Engineer",
    description: "Build products powered by language and reasoning models.",
    icon: FaBrain,
  },
  {
    id: "ml-engineer",
    title: "Machine Learning Engineer",
    description: "Train, ship and scale models in production.",
    icon: FaRobot,
  },
  {
    id: "data-scientist",
    title: "Data Scientist",
    description: "Turn raw data into decisions worth trusting.",
    icon: FaChartLine,
  },
  {
    id: "devops-engineer",
    title: "DevOps Engineer",
    description: "Pipelines, infrastructure and reliability at scale.",
    icon: FaGears,
  },
  {
    id: "android-developer",
    title: "Android Developer",
    description: "Native apps for the world's most-used platform.",
    icon: FaMobileScreen,
  },
  {
    id: "game-developer",
    title: "Game Developer",
    description: "Worlds, mechanics and the systems that run them.",
    icon: FaGamepad,
  },
  {
    id: "cybersecurity-engineer",
    title: "Cyber Security Engineer",
    description: "Find the weak points before someone else does.",
    icon: FaShieldHalved,
  },
  {
    id: "cloud-engineer",
    title: "Cloud Engineer",
    description: "Design infrastructure that scales without drama.",
    icon: FaCloud,
  },
  {
    id: "uiux-designer",
    title: "UI/UX Designer",
    description: "Shape how products look, feel and flow.",
    icon: FaPalette,
  },
];

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Express",
  "Python",
  "Django",
  "FastAPI",
  "Flask",
  "SQL",
  "PostgreSQL",
  "MongoDB",
  "Docker",
  "Kubernetes",
  "Git",
  "GitHub",
  "Linux",
  "Redis",
  "AWS",
  "Azure",
  "GCP",
  "TensorFlow",
  "PyTorch",
  "NumPy",
  "Pandas",
  "Machine Learning",
  "Data Analysis",
  "Power BI",
  "Java",
  "C",
  "C++",
  "Rust",
  "Go",
  "Spring Boot",
  "Flutter",
  "React Native",
  "Kotlin",
  "Swift",
  "Unity",
  "Godot",
  "GraphQL",
  "REST APIs",
  "Figma",
  "C#",
];

const STEP_LABELS = [
  "Destination",
  "Current knowledge",
  "Review",
  "Generating",
];

const buildInitialStages = () => [
  { title: "Understanding your destination", status: "pending" },
  { title: "Analyzing your current knowledge", status: "pending" },
  { title: "Searching StackMaps Knowledge Graph", status: "pending" },
  { title: "Finding missing prerequisites", status: "pending" },
  { title: "Reasoning with AI", status: "pending" },
  { title: "Generating personalized roadmap", status: "pending" },
  { title: "Preparing dashboard", status: "pending" },
];

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

const Wizard = () => {
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);

  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    goal: "",
    known_topics: [],
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [generationStages, setGenerationStages] =
    useState(buildInitialStages());
  const [error, setError] = useState("");

  const stageTimeouts = useRef([]);

  useEffect(() => {
    return () => {
      stageTimeouts.current.forEach((t) => clearTimeout(t));
    };
  }, []);

  /* -------------------------- helpers -------------------------- */

  const selectedRole = useMemo(
    () => ROLES.find((role) => role.id === formData.goal),
    [formData.goal],
  );

  const filteredSkills = useMemo(() => {
    if (!searchTerm.trim()) return SKILLS;
    const term = searchTerm.trim().toLowerCase();
    return SKILLS.filter((skill) => skill.toLowerCase().includes(term));
  }, [searchTerm]);

  const toggleSkill = (skill) => {
    setError("");
    setFormData((prev) => {
      const exists = prev.known_topics.includes(skill);
      return {
        ...prev,
        known_topics: exists
          ? prev.known_topics.filter((item) => item !== skill)
          : [...prev.known_topics, skill],
      };
    });
  };

  const removeSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      known_topics: prev.known_topics.filter((item) => item !== skill),
    }));
  };

  const selectRole = (roleId) => {
    setError("");
    setFormData((prev) => ({ ...prev, goal: roleId }));
  };

  const validateStep = (step) => {
    if (step === 1 && !formData.goal) {
      setError("Choose a destination to continue.");
      return false;
    }
   if (step === 2 && !formData.is_beginner && formData.known_topics.length === 0) {
      setError("Select at least one skill you already know.");
      return false;
    }
    return true;
  };

  const goNext = () => {
    if (!validateStep(currentStep)) return;
    setError("");
    if (currentStep === 3) {
      startGeneration();
      return;
    }
    setCurrentStep((step) => Math.min(step + 1, 4));
  };

  const goBack = () => {
    setError("");
    setCurrentStep((step) => Math.max(step - 1, 1));
  };

  const skipWizard = () => {
    navigate("/dashboard");
  };

  /* ----------------------- AI generation ------------------------ */

  const updateStage = (index, status) => {
    setGenerationStages((prev) =>
      prev.map((stage, i) => (i === index ? { ...stage, status } : stage)),
    );
  };

  const startGeneration = async () => {
  setCurrentStep(4);
  setError("");

  try {
    const payload = {
      goal: formData.goal,
      known_topics: formData.known_topics,
      is_beginner: formData.is_beginner,
    };

    await api.post(
      "/learning/generate-roadmap/",
      payload,
      {
        withCredentials: true,
      }
    );

    navigate("/dashboard");

  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Failed to generate roadmap."
    );
      console.log(err);
    console.log(err.response);
    console.log(err.request);
    console.log(err.message);

    setCurrentStep(3);
  }
};


  /* ------------------------------------------------------------ */
  /* Render helpers                                                 */
  /* ------------------------------------------------------------ */

  const renderStepOne = () => (
    <div className="wizard-step wizard-step-goal">
      <div className="wizard-step-header">
        <h1 className="wizard-title">What do you want to become?</h1>
        <p className="wizard-subtitle">
          Choose your learning destination. StackMaps AI will build the shortest
          learning path.
        </p>
      </div>

      <div className="wizard-role-grid">
        {ROLES.map((role) => {
          const Icon = role.icon;
          const isSelected = formData.goal === role.id;
          return (
            <button
              type="button"
              key={role.id}
              className={`wizard-role-card${
                isSelected ? " wizard-role-card-selected" : ""
              }`}
              onClick={() => selectRole(role.id)}
            >
              <span className="wizard-role-icon">
                <Icon />
              </span>
              <span className="wizard-role-title">{role.title}</span>
              <span className="wizard-role-description">
                {role.description}
              </span>
              {isSelected && (
                <span className="wizard-role-check">
                  <FaCircleCheck />
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );

  const renderStepTwo = () => (
    <div className="wizard-step wizard-step-skills">
      <div className="wizard-step-header">
        <h1 className="wizard-title">What do you already know?</h1>
        <p className="wizard-subtitle">
          Select every technology you're comfortable with. StackMaps AI will
          skip what you already know.
        </p>
      </div>

      <div className="wizard-search-bar">
        <FaMagnifyingGlass className="wizard-search-icon" />
        <input
          type="text"
          className="wizard-search-input"
          placeholder="Search technologies..."
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />
      </div>
      <div className="wizard-beginner-checkbox">
        <label>
          <input
            type="checkbox"
            checked={formData.is_beginner}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                is_beginner: e.target.checked,
                known_topics: e.target.checked ? [] : prev.known_topics,
              }))
            }
          />
          I am a complete beginner
        </label>
      </div>

      <div className="wizard-chip-grid">
        {filteredSkills.map((skill) => {
          const isActive = formData.known_topics.includes(skill);
          return (
            <button
              type="button"
              key={skill}
              disabled={formData.is_beginner}
              className={`wizard-chip ${
                isActive ? "wizard-chip-active" : ""
              } ${formData.is_beginner ? "wizard-chip-disabled" : ""}`}
              onClick={() => toggleSkill(skill)}
            >
              {skill}
            </button>
          );
        })}
        {filteredSkills.length === 0 && (
          <p className="wizard-chip-empty">
            No technologies match "{searchTerm}".
          </p>
        )}
      </div>

      <div className="wizard-selected-panel">
        <h3 className="wizard-selected-title">
          Selected skills
          <span className="wizard-selected-count">
            {formData.known_topics.length}
          </span>
        </h3>
        {formData.known_topics.length === 0 ? (
          <p className="wizard-selected-empty">
            Nothing selected yet. Pick a few technologies above to continue.
          </p>
        ) : (
          <div className="wizard-selected-tags">
            {formData.known_topics.map((skill) => (
              <span className="wizard-selected-tag" key={skill}>
                {skill}
                <button
                  type="button"
                  className="wizard-selected-tag-remove"
                  onClick={() => removeSkill(skill)}
                  aria-label={`Remove ${skill}`}
                >
                  <FaXmark />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderStepThree = () => {
    const Icon = selectedRole?.icon || FaGraduationCap;
    return (
      <div className="wizard-step wizard-step-review">
        <div className="wizard-step-header">
          <h1 className="wizard-title">Ready to build your roadmap?</h1>
          <p className="wizard-subtitle">
            Here's everything StackMaps AI will use to design your path.
          </p>
        </div>

        <div className="wizard-review-grid">
          <div className="wizard-glass-card wizard-review-card">
            <div className="wizard-review-card-header">
              <span className="wizard-review-icon">
                <Icon />
              </span>
              <h3>Destination</h3>
            </div>
            <p className="wizard-review-value">{selectedRole?.title}</p>
            <p className="wizard-review-caption">{selectedRole?.description}</p>
          </div>

          <div className="wizard-glass-card wizard-review-card">
            <div className="wizard-review-card-header">
              <span className="wizard-review-icon">
                <FaCode />
              </span>
              <h3>Current knowledge</h3>
            </div>
            <div className="wizard-review-skill-list">
              {formData.known_topics.map((skill) => (
                <span className="wizard-review-skill-pill" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button type="button" className="wizard-cta-button" onClick={goNext}>
          <FaRobot className="wizard-cta-icon" />
          Generate AI Roadmap
        </button>
      </div>
    );
  };

  const renderStepFour = () => (
  <div className="wizard-loading">

    <img
      src={mascot}
      alt="AI"
      className="wizard-loading-image"
    />

    <h1>Generating Your Learning Path</h1>

    <p>
      StackMaps AI is understanding your goal and creating
      a personalized roadmap.
    </p>

    <div className="wizard-loader">

      <div
        className="wizard-loader-fill"
        style={{ width: `${progress}%` }}
      />

    </div>

    <div className="wizard-loader-percent">
      {Math.floor(progress)}%
    </div>

    <div className="wizard-loader-text">

      {progress < 20 && "🧠 Thinking..."}

      {progress >= 20 &&
        progress < 45 &&
        "🔍 Searching Knowledge Graph..."}

      {progress >= 45 &&
        progress < 70 &&
        "📚 Finding Missing Prerequisites..."}

      {progress >= 70 &&
        progress < 90 &&
        "🤖 Generating Personalized Roadmap..."}

      {progress >= 90 &&
        progress < 100 &&
        "💾 Finalizing Roadmap..."}

      {progress === 100 &&
        "✅ Roadmap Ready"}

    </div>

  </div>
);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return renderStepOne();
      case 2:
        return renderStepTwo();
      case 3:
        return renderStepThree();
      case 4:
        return renderStepFour();
      default:
        return null;
    }
  };

  const isLastInteractiveStep = currentStep === 3;
  const showFooterNav = currentStep !== 4;

  return (
    <div className="wizard-page">
      <div className="wizard-shell">
        <header className="wizard-header">
          <TopNavbar />
          <div className="wizard-progress-indicator">
            {STEP_LABELS.map((label, index) => {
              const stepNumber = index + 1;
              const isActive = stepNumber === currentStep;
              const isDone = stepNumber < currentStep;
              return (
                <div
                  className={`wizard-progress-step${
                    isActive ? " wizard-progress-step-active" : ""
                  }${isDone ? " wizard-progress-step-done" : ""}`}
                  key={label}
                >
                  <span className="wizard-progress-step-dot" />
                  <span className="wizard-progress-step-label">{label}</span>
                </div>
              );
            })}
          </div>
        </header>

        <main className="wizard-body">
          {error && (
            <div className="wizard-error-banner">
              <FaCircleExclamation />
              <span>{error}</span>
            </div>
          )}
          {renderCurrentStep()}
        </main>

        {showFooterNav && (
          <footer className="wizard-footer">
            <button
              type="button"
              className="wizard-footer-back"
              onClick={goBack}
              disabled={currentStep === 1}
            >
              <FaArrowLeft />
              Back
            </button>

            <button
              type="button"
              className="wizard-footer-skip"
              onClick={skipWizard}
            >
              Skip
              <FaForward />
            </button>

            {!isLastInteractiveStep && (
              <button
                type="button"
                className="wizard-footer-next"
                onClick={goNext}
              >
                Next
                <FaArrowRight />
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
};

export default Wizard;
