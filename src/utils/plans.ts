export interface WorkoutPlan {
  sets: number[];
}

export const WORKOUT_PLANS: Record<number, Record<number, WorkoutPlan[]>> = {
  // Level 1: < 5 Initial Reps
  1: {
    1: [
      { sets: [2, 3, 2, 2, 3] }, // Day 1
      { sets: [3, 4, 2, 3, 4] }, // Day 2
      { sets: [4, 5, 4, 4, 5] }, // Day 3
    ],
    2: [
      { sets: [4, 6, 4, 4, 6] },
      { sets: [5, 6, 4, 4, 7] },
      { sets: [5, 7, 5, 5, 8] },
    ],
    3: [
      { sets: [6, 8, 6, 6, 9] },
      { sets: [7, 8, 6, 6, 10] },
      { sets: [8, 9, 7, 7, 11] },
    ],
    4: [
      { sets: [9, 11, 8, 8, 11] },
      { sets: [10, 11, 8, 8, 12] },
      { sets: [11, 12, 9, 9, 13] },
    ],
    5: [
      { sets: [12, 14, 11, 11, 14] },
      { sets: [13, 15, 12, 12, 15] },
      { sets: [14, 16, 12, 12, 17] },
    ],
    6: [
      { sets: [16, 17, 14, 14, 20] },
      { sets: [17, 19, 15, 15, 20] },
      { sets: [18, 20, 16, 16, 25] },
    ],
    7: [
      { sets: [20, 22, 18, 18, 25] },
      { sets: [22, 24, 20, 20, 28] },
      { sets: [25, 25, 22, 22, 30] },
    ]
  },
  // Level 2: 6-20 Initial Reps
  2: {
    1: [
      { sets: [6, 6, 4, 4, 5] }, // Day 1
      { sets: [7, 7, 5, 5, 7] }, // Day 2
      { sets: [8, 8, 5, 5, 10] }, // Day 3
    ],
    2: [
      { sets: [9, 11, 8, 8, 11] },
      { sets: [10, 12, 9, 9, 13] },
      { sets: [12, 13, 10, 10, 15] },
    ],
    3: [
      { sets: [14, 16, 12, 12, 16] },
      { sets: [15, 17, 13, 13, 18] },
      { sets: [16, 18, 14, 14, 20] },
    ],
    4: [
      { sets: [18, 20, 14, 14, 20] },
      { sets: [19, 21, 15, 15, 22] },
      { sets: [20, 22, 16, 16, 25] },
    ],
    5: [
      { sets: [22, 24, 18, 18, 25] },
      { sets: [24, 26, 20, 20, 28] },
      { sets: [26, 28, 22, 22, 30] },
    ],
    6: [
      { sets: [28, 30, 24, 24, 30] },
      { sets: [30, 32, 25, 25, 35] },
      { sets: [32, 35, 26, 26, 40] },
    ],
    7: [
      { sets: [35, 38, 28, 28, 40] },
      { sets: [38, 40, 30, 30, 45] },
      { sets: [40, 45, 35, 35, 50] },
    ]
  },
  // Level 3: 21+ Initial Reps
  3: {
    1: [
      { sets: [10, 12, 7, 7, 9] }, // Day 1
      { sets: [10, 12, 8, 8, 12] }, // Day 2
      { sets: [11, 13, 9, 9, 13] }, // Day 3
    ],
    2: [
      { sets: [12, 14, 10, 10, 15] },
      { sets: [14, 16, 12, 12, 17] },
      { sets: [16, 18, 13, 13, 20] },
    ],
    3: [
      { sets: [18, 20, 14, 14, 22] },
      { sets: [20, 22, 16, 16, 25] },
      { sets: [22, 24, 18, 18, 28] },
    ],
    4: [
      { sets: [25, 27, 20, 20, 30] },
      { sets: [27, 29, 22, 22, 32] },
      { sets: [30, 32, 25, 25, 35] },
    ],
    5: [
      { sets: [32, 35, 26, 26, 40] },
      { sets: [35, 38, 28, 28, 42] },
      { sets: [38, 40, 30, 30, 45] },
    ],
    6: [
      { sets: [40, 45, 35, 35, 50] },
      { sets: [45, 50, 40, 40, 55] },
      { sets: [50, 55, 45, 45, 60] },
    ],
    7: [
      { sets: [55, 60, 50, 50, 65] },
      { sets: [60, 65, 55, 55, 70] },
      { sets: [65, 70, 60, 60, 75] },
    ]
  }
};

export const getPlanForDay = (level: number, sessionCount: number) => {
  const totalDays = sessionCount;
  const week = Math.floor(totalDays / 3) + 1;
  const dayIndex = totalDays % 3;
  
  const levelPlans = WORKOUT_PLANS[level] || WORKOUT_PLANS[2];
  
  // Cap at week 7
  const currentWeek = Math.min(week, 7);
  const weekPlans = levelPlans[currentWeek] || levelPlans[1];
  
  const dayPlan = weekPlans[dayIndex] || weekPlans[weekPlans.length - 1];
  
  return {
    week: currentWeek,
    day: dayIndex + 1,
    plan: dayPlan
  };
};
