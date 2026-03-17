"use client";

import { subjects } from "@/constants";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

interface HeroCompanion {
  id: string;
  name: string;
  subject: string;
  topic: string;
  duration: number;
}

interface HeroSectionProps {
  companions?: HeroCompanion[];
}

const HeroSection = ({ companions = [] }: HeroSectionProps) => {
  const [activeCompanionId, setActiveCompanionId] = useState(
    companions[0]?.id ?? ""
  );

  const activeCompanion =
    companions.find((companion) => companion.id === activeCompanionId) ||
    companions[0] ||
    null;

  const activeSubject = activeCompanion?.subject || subjects[0];

  const preview = useMemo(() => {
    const color = getSubjectColor(activeSubject);

    const details: Record<string, { label: string; lesson: string; duration: string }> = {
      maths: {
        label: "Math Mastery",
        lesson: "Derivatives & Integrals",
        duration: "20 min guided lesson",
      },
      language: {
        label: "Language Practice",
        lesson: "Advanced Vocabulary & Speaking",
        duration: "15 min voice practice",
      },
      science: {
        label: "Science Lab",
        lesson: "Neural Networks Basics",
        duration: "25 min concept walkthrough",
      },
      history: {
        label: "History Explorer",
        lesson: "World Wars and Timelines",
        duration: "18 min story-based session",
      },
      coding: {
        label: "Coding Coach",
        lesson: "If/Else and Logic Patterns",
        duration: "22 min interactive coding",
      },
      economics: {
        label: "Economics Insight",
        lesson: "Supply and Demand Fundamentals",
        duration: "16 min real-world examples",
      },
    };

    if (activeCompanion) {
      return {
        color,
        label: `${activeCompanion.subject} Companion`,
        lesson: activeCompanion.name,
        topic: activeCompanion.topic,
        duration: `${activeCompanion.duration} min live lesson`,
        href: `/companions/${activeCompanion.id}`,
      };
    }

    return {
      color,
      ...details[activeSubject],
      topic: "Choose a subject and begin a personalized voice session.",
      href: "/companions/new",
    };
  }, [activeSubject, activeCompanion]);

  return (
    <section className="hero-section">
      <div className="hero-ambient" aria-hidden="true" />

      <div className="hero-copy">
        <p className="hero-kicker">AI Voice Learning Platform</p>
        <h1 className="hero-title">Learn faster with your personal AI companion</h1>
        <p className="hero-description">
          Choose a subject, start a live voice lesson, and build momentum with
          sessions tailored to your pace.
        </p>

        <div className="hero-actions">
          <Link href="/companions/new" className="btn-primary">
            <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
            <span>Create Companion</span>
          </Link>
          <Link href="/companions" className="btn-signin">
            Explore Library
          </Link>
        </div>

        {companions.length > 0 ? (
          <div className="hero-chips">
            {companions.map((companion) => (
              <button
                key={companion.id}
                type="button"
                onMouseEnter={() => setActiveCompanionId(companion.id)}
                onFocus={() => setActiveCompanionId(companion.id)}
                onClick={() => setActiveCompanionId(companion.id)}
                className={`hero-chip ${
                  activeCompanion?.id === companion.id ? "hero-chip-active" : ""
                }`}
              >
                {companion.name}
              </button>
            ))}
          </div>
        ) : (
          <div className="hero-chips">
            {subjects.map((subject) => (
              <button
                key={subject}
                type="button"
                className={`hero-chip ${
                  activeSubject === subject ? "hero-chip-active" : ""
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        )}

        <div className="hero-metrics">
          <div className="hero-metric-pill">Real-time voice</div>
          <div className="hero-metric-pill">Adaptive sessions</div>
          <div className="hero-metric-pill">Multi-subject support</div>
        </div>
      </div>

      <article className="hero-preview" style={{ backgroundColor: preview.color }}>
        <div className="hero-preview-icon">
          <Image
            src={`/icons/${activeSubject}.svg`}
            alt={activeSubject}
            width={54}
            height={54}
          />
        </div>

        <div className="space-y-2">
          <p className="hero-preview-label">{preview.label}</p>
          <h3 className="hero-preview-lesson">{preview.lesson}</h3>
          <p className="hero-preview-duration line-clamp-2">{preview.topic}</p>
          <p className="hero-preview-duration">{preview.duration}</p>
        </div>

        <div className="flex items-center justify-between gap-3 max-sm:flex-col max-sm:items-start">
          <div className="hero-preview-footer">
            <span className="hero-dot" />
            Live voice session ready
          </div>
          <Link href={preview.href} className="btn-primary hero-preview-action">
            Launch Companion
          </Link>
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
