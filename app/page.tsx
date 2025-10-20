import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

const Page = async () => {
  // Fetch data with error handling - don't let DB errors crash the page
  let companions = [];
  let recentSessionsCompanions = [];

  try {
    companions = await getAllCompanions({ limit: 3 });
  } catch (error) {
    console.error("Failed to fetch companions:", error);
  }

  try {
    recentSessionsCompanions = await getRecentSessions(10);
  } catch (error) {
    console.error("Failed to fetch recent sessions:", error);
  }

  return (
    <main>
      <h1 className="text-2xl underline">Popular Companions</h1>
      <section className="home-section">
        {companions.length > 0 ? (
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          <p className="text-muted-foreground">No companions available yet.</p>
        )}
      </section>

      <section className="home-section">
        <CompanionsList
          title="Recent complete sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
