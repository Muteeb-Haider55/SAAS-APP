import Image from "next/image";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning Your Way.</div>
      <h2 className="text-3xl font-semibold tracking-tight">
        Build and Personalized Learning Companion
      </h2>
      <p className="text-sm leading-relaxed text-white/90">
        Pick a name, voice, subject, & personality - and start learning through
        voice conversations that feel natural and fun
      </p>
      <Image src="/images/cta.svg" alt="cta" width={362} height={232} />
      <Link href="/companions/new" className="btn-primary">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <p>Build a New Companion</p>
      </Link>
    </section>
  );
};

export default CTA;
