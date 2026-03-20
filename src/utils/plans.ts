export interface WorkoutPlan {
  sets: number[];
}

export const WORKOUT_PLANS: Record<number, Record<number, WorkoutPlan[]>> = {
  // Level 1: < 5 Reps
  1: {
    1: [
      { sets: [2, 3, 2, 2, 3] }, // Day 1
      { sets: [3, 4, 2, 3, 4] }, // Day 2
      { sets: [4, 5, 4, 4, 5] }, // Day 3
    ]
  },
  // Level 2: 6-20 Reps
  2: {
    1: [
      { sets: [6, 6, 4, 4, 5] }, // Day 1
      { sets: [7, 7, 5, 5, 7] }, // Day 2
      { sets: [8, 8, 5, 5, 10] }, // Day 3
    ],
    2: [
        { sets: [9, 11, 8, 8, 11] }, // Day 1
        { sets: [10, 12, 9, 9, 13] }, // Day 2
        { sets: [12, 13, 10, 10, 15] }, // Day 3
    ]
  },
  // Level 3: 21+ Reps
  3: {
    1: [
      { sets: [10, 12, 7, 7, 9] }, // Day 1
      { sets: [10, 12, 8, 8, 12] }, // Day 2
      { sets: [11, 13, 9, 9, 13] }, // Day 3
    ]
  }
};

export const getPlanForDay = (level: number, sessionCount: number) => {
  const week = Math.floor(sessionCount / 3) + 1;
  const day = (sessionCount % 3) + 1;
  
  // Fallback if plan doesn't exist for high weeks
  const levelPlans = WORKOUT_PLANS[level] || WORKOUT_PLANS[2];
  const weekPlans = levelPlans[week] || levelPlans[1];
  const dayPlan = weekPlans[day - 1] || weekPlans[weekPlans.length - 1];
  
  return {
    week,
    day,
    plan: dayPlan
  };
};
