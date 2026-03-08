import { useEffect, useState } from "react";
import { useWorkout } from "../context/WorkoutContext.jsx";

export default function ExerciseCard({ exercise }) {
  const { addToPlan } = useWorkout();
  const [imageSrc, setImageSrc] = useState(null);

  const name = exercise?.name || "Unknown Exercise";
  const bodyPart = exercise?.bodyPart || "—";
  const equipment = exercise?.equipment || "—";
  const target = exercise?.target || "—";

  useEffect(() => {
    let objectUrl;

    async function loadImage() {
      if (!exercise?.id) {
        setImageSrc(null);
        return;
      }

      try {
        const response = await fetch(
          `https://exercisedb.p.rapidapi.com/image?exerciseId=${exercise.id}&resolution=180`,
          {
            headers: {
              "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
              "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
            },
          }
        );

        if (!response.ok) throw new Error("Image failed");

        const blob = await response.blob();
        objectUrl = URL.createObjectURL(blob);
        setImageSrc(objectUrl);
      } catch {
        setImageSrc(null);
      }
    }

    loadImage();

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [exercise?.id]);

  return (
    <div className="card exercise-card">
      <div className="exercise-media">
        {imageSrc ? (
          <img className="exercise-img" src={imageSrc} alt={name} loading="lazy" />
        ) : (
          <div className="exercise-img placeholder" aria-hidden="true" />
        )}
      </div>

      <div className="exercise-body">
        <h3 className="h3">{name}</h3>
        <p className="muted">
          {bodyPart} • {target} • {equipment}
        </p>

        <button className="btn" onClick={() => addToPlan(exercise)}>
          Add to Workout
        </button>
      </div>
    </div>
  );
}