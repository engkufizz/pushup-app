export interface WorkoutPlan {
  sets: number[];
}

export const WORKOUT_PLANS: Record<number, Record<number, WorkoutPlan[]>> = {
  // Level 1: < 9 Pushups
  1: {
    1: [
      { sets: [2, 3, 2, 2, 3] }, // Day 1
      { sets: [2, 3, 2, 2, 4] }, // Day 2
      { sets: [3, 4, 2, 2, 4] }, // Day 3
    ],
    2: [
      { sets: [3, 4, 3, 3, 4] },
      { sets: [3, 4, 3, 3, 5] },
      { sets: [4, 5, 4, 4, 6] },
    ]
  },
  // Level 2: 9-11 Pushups
  2: {
    1: [
      { sets: [3, 5, 3, 3, 5] },
      { sets: [4, 6, 4, 4, 6] },
      { sets: [5, 7, 5, 5, 6] },
    ],
    2: [
      { sets: [5, 8, 5, 5, 8] },
      { sets: [6, 9, 6, 6, 8] },
      { sets: [6, 9, 6, 6, 10] },
    ]
  },
  // Level 3: 12-15 Pushups
  3: {
    1: [
      { sets: [6, 8, 6, 6, 8] },
      { sets: [6, 9, 6, 6, 9] },
      { sets: [7, 10, 6, 6, 9] },
    ],
    2: [
      { sets: [7, 10, 7, 7, 10] },
      { sets: [8, 11, 8, 8, 10] },
      { sets: [9, 11, 9, 9, 11] },
    ]
  },
  // Level 4: 16-20 Pushups
  4: {
    1: [
      { sets: [8, 11, 8, 8, 10] },
      { sets: [9, 12, 9, 9, 11] },
      { sets: [9, 13, 9, 9, 12] },
    ],
    2: [
      { sets: [10, 14, 10, 10, 13] },
      { sets: [11, 15, 10, 10, 13] },
      { sets: [11, 15, 11, 11, 13] },
    ],
    3: [
      { sets: [12, 16, 11, 11, 15] },
      { sets: [12, 16, 12, 12, 16] },
      { sets: [13, 17, 13, 13, 16] },
    ]
  },
  // Level 5: 21-25 Pushups
  5: {
    1: [
      { sets: [12, 16, 12, 12, 15] },
      { sets: [13, 16, 12, 12, 16] },
      { sets: [13, 17, 12, 12, 16] },
    ],
    2: [
      { sets: [14, 19, 13, 13, 18] },
      { sets: [14, 19, 14, 14, 19] },
      { sets: [15, 20, 14, 14, 20] },
    ],
    3: [
      { sets: [16, 20, 16, 16, 20] },
      { sets: [16, 21, 16, 16, 20] },
      { sets: [17, 22, 16, 16, 21] },
    ]
  },
  // Level 6: 26-30 Pushups
  6: {
    1: [
      { sets: [16, 18, 15, 15, 17] },
      { sets: [16, 20, 16, 16, 19] },
      { sets: [17, 21, 16, 16, 20] },
    ],
    2: [
      { sets: [17, 22, 17, 17, 22] },
      { sets: [18, 23, 18, 18, 22] },
      { sets: [19, 25, 18, 18, 24] },
    ],
    3: [
      { sets: [19, 26, 18, 18, 25] },
      { sets: [19, 27, 19, 19, 26] },
      { sets: [20, 28, 20, 20, 28] },
    ]
  },
  // Level 7: 31-35 Pushups
  7: {
    1: [
      { sets: [20, 25, 19, 19, 23] },
      { sets: [22, 25, 21, 21, 25] },
      { sets: [23, 26, 23, 23, 25] },
    ],
    2: [
      { sets: [24, 27, 24, 24, 26] },
      { sets: [25, 28, 24, 24, 27] },
      { sets: [25, 29, 25, 25, 28] },
    ],
    3: [
      { sets: [26, 29, 25, 25, 29] },
      { sets: [26, 30, 26, 26, 30] },
      { sets: [26, 32, 26, 26, 32] },
    ]
  },
  // Level 8: 36-40 Pushups
  8: {
    1: [
      { sets: [23, 27, 22, 22, 26] },
      { sets: [24, 28, 24, 24, 28] },
      { sets: [25, 29, 24, 24, 29] },
    ],
    2: [
      { sets: [26, 30, 25, 25, 30] },
      { sets: [26, 31, 25, 25, 31] },
      { sets: [26, 31, 26, 26, 31] },
    ],
    3: [
      { sets: [27, 31, 26, 26, 32] },
      { sets: [28, 32, 26, 26, 32] },
      { sets: [28, 34, 27, 27, 34] },
    ]
  },
  // Level 9: > 40 Pushups
  9: {
    1: [
      { sets: [25, 28, 24, 24, 26] },
      { sets: [25, 29, 25, 25, 28] },
      { sets: [25, 30, 25, 25, 29] },
    ],
    2: [
      { sets: [26, 31, 25, 25, 31] },
      { sets: [26, 32, 26, 26, 32] },
      { sets: [27, 32, 26, 26, 32] },
    ],
    3: [
      { sets: [27, 34, 26, 26, 33] },
      { sets: [28, 34, 26, 26, 34] },
      { sets: [29, 35, 27, 27, 35] },
    ]
  }
};

export const getPlanForDay = (level: number, sessionCount: number) => {
  const totalDays = sessionCount;
  const week = Math.floor(totalDays / 3) + 1;
  const dayIndex = totalDays % 3;
  
  // Default to Level 1 if invalid level
  const levelPlans = WORKOUT_PLANS[level] || WORKOUT_PLANS[1];
  
  // Find the max week for this level
  const maxWeek = Math.max(...Object.keys(levelPlans).map(Number));
  
  // Cap current week to max available week
  const currentWeek = Math.min(week, maxWeek);
  
  const weekPlans = levelPlans[currentWeek];
  
  // If we've run out of days in the final week, just repeat the last day
  const dayPlan = weekPlans[dayIndex] || weekPlans[weekPlans.length - 1];
  
  return {
    week: currentWeek,
    day: dayIndex + 1,
    plan: dayPlan
  };
};
