import { create } from 'zustand'

export type Question = {
  label: string
  type: string
}

export type Survey = {
  id: string
  title: string
  description: string
  tag: string
  questions: Question[]
}

type SurveyStore = {
  surveys: Survey[]
  fetchSurveys: () => Promise<void>
  postSurvey: (newSurvey: Omit<Survey, 'id'>) => Promise<void>
}

export const useSurveyStore = create<SurveyStore>((set) => ({
  surveys: [],

  fetchSurveys: async () => {
    try {
      const res = await fetch('/api/surveys');

      if (!res.ok) {
        console.error("Fetch failed with status:", res.status);
        set({ surveys: [] });
        return;
      }

      const text = await res.text();

      if (!text) {
        console.warn("Empty response body from /api/surveys");
        set({ surveys: [] });
        return;
      }

      let data: Survey[] = [];

      try {
        const parsed = JSON.parse(text);
        data = Array.isArray(parsed) ? parsed : [];
      } catch (jsonError) {
        console.error("Error parsing JSON from /api/surveys:", jsonError);
      }

      set({ surveys: data });
    } catch (error) {
      console.error("Error fetching surveys:", error);
      set({ surveys: [] });
    }
  },

  postSurvey: async (newSurvey) => {
    try {
      const res = await fetch('/api/boss_surveys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSurvey),
      });

      if (!res.ok) {
        console.error("Failed to post survey:", res.statusText);
        return;
      }

      // ✅ Refetch surveys after a successful post
      const fetchSurveys = useSurveyStore.getState().fetchSurveys;
      await fetchSurveys();

    } catch (err) {
      console.error("Error posting survey:", err);
    }
  }
}));
