"use client";

import { subjects } from "@/constants";
import { getSubjectColor } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

const HeroSection = () => {
  const [activeSubject, setActiveSubject] = useState(subjects[0]);

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

    return {
      color,
      ...details[activeSubject],
    };
  }, [activeSubject]);

  return (
    <section className="hero-section">
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

        <div className="hero-chips">
          {subjects.map((subject) => (
            <button
              key={subject}
              type="button"
              onMouseEnter={() => setActiveSubject(subject)}
              onFocus={() => setActiveSubject(subject)}
              onClick={() => setActiveSubject(subject)}
              className={`hero-chip ${
                activeSubject === subject ? "hero-chip-active" : ""
              }`}
            >
              {subject}
            </button>
          ))}
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
          <p className="hero-preview-duration">{preview.duration}</p>
        </div>

        <div className="hero-preview-footer">
          <span className="hero-dot" />
          Live voice session ready
        </div>
      </article>
    </section>
  );
};

export default HeroSection;
