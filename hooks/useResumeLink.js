import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const useResumeLink = () => {
  const [resumeLink, setResumeLink] = useState("/");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResumeLink = async () => {
      try {
        const docRef = doc(db, "settings", "resume");
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setResumeLink(docSnap.data().link);
        }
      } catch (err) {
        setError(err.message);
        console.error("Error fetching resume link:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeLink();
  }, []);

  return { resumeLink, loading, error };
};
