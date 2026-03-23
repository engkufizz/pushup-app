export interface WorkoutPlan {
  sets: number[];
  restHours: number;
}

export const WORKOUT_PLANS: Record<number, WorkoutPlan[]> = {
  // Level 1: < 9 Pushups
  1: [
    { sets: [2, 3, 2, 2, 3], restHours: 48 }, // 12
    { sets: [2, 3, 2, 2, 4], restHours: 48 }, // 13
    { sets: [3, 4, 2, 2, 4], restHours: 72 }, // 15
    { sets: [3, 4, 3, 3, 4], restHours: 48 }, // 17
    { sets: [3, 4, 3, 3, 5], restHours: 48 }, // 18
    { sets: [4, 5, 4, 4, 6], restHours: 72 }, // 23
  ],
  // Level 2: 9-11 Pushups
  2: [
    { sets: [3, 5, 3, 3, 5], restHours: 48 }, // 19
    { sets: [4, 6, 4, 4, 6], restHours: 48 }, // 24
    { sets: [5, 7, 5, 5, 6], restHours: 72 }, // 28
    { sets: [5, 8, 5, 5, 8], restHours: 48 }, // 31
    { sets: [6, 9, 6, 6, 8], restHours: 48 }, // 35
    { sets: [6, 9, 6, 6, 10], restHours: 72 }, // 37
  ],
  // Level 3: 12-15 Pushups
  3: [
    { sets: [6, 8, 6, 6, 8], restHours: 48 }, // 34
    { sets: [6, 9, 6, 6, 9], restHours: 48 }, // 36
    { sets: [7, 10, 6, 6, 9], restHours: 72 }, // 38
    { sets: [7, 10, 7, 7, 10], restHours: 48 }, // 41
    { sets: [8, 11, 8, 8, 10], restHours: 48 }, // 45
    { sets: [9, 11, 9, 9, 11], restHours: 72 }, // 49
  ],
  // Level 4: 16-20 Pushups
  4: [
    { sets: [8, 11, 8, 8, 10], restHours: 48 }, // 45
    { sets: [9, 12, 9, 9, 11], restHours: 48 }, // 50
    { sets: [9, 13, 9, 9, 12], restHours: 72 }, // 52
    { sets: [10, 14, 10, 10, 13], restHours: 48 }, // 57
    { sets: [11, 15, 10, 10, 13], restHours: 48 }, // 59
    { sets: [11, 15, 11, 11, 13], restHours: 72 }, // 61
    { sets: [12, 16, 11, 11, 15], restHours: 48 }, // 65
    { sets: [12, 16, 12, 12, 16], restHours: 48 }, // 68
    { sets: [13, 17, 13, 13, 16], restHours: 48 }, // 72
  ],
  // Level 5: 21-25 Pushups
  5: [
    { sets: [12, 16, 12, 12, 15], restHours: 48 }, // 67
    { sets: [13, 16, 12, 12, 16], restHours: 48 }, // 69
    { sets: [13, 17, 12, 12, 16], restHours: 72 }, // 70
    { sets: [14, 19, 13, 13, 18], restHours: 48 }, // 77
    { sets: [14, 19, 14, 14, 19], restHours: 48 }, // 80
    { sets: [15, 20, 14, 14, 20], restHours: 72 }, // 83
    { sets: [16, 20, 16, 16, 20], restHours: 48 }, // 88
    { sets: [16, 21, 16, 16, 20], restHours: 48 }, // 89
    { sets: [17, 22, 16, 16, 21], restHours: 48 }, // 92
  ],
  // Level 6: 26-30 Pushups
  6: [
    { sets: [16, 18, 15, 15, 17], restHours: 48 }, // 81
    { sets: [16, 20, 16, 16, 19], restHours: 48 }, // 87
    { sets: [17, 21, 16, 16, 20], restHours: 72 }, // 90
    { sets: [17, 22, 17, 17, 22], restHours: 48 }, // 95
    { sets: [18, 23, 18, 18, 22], restHours: 48 }, // 99
    { sets: [19, 25, 18, 18, 24], restHours: 72 }, // 104
    { sets: [19, 26, 18, 18, 25], restHours: 48 }, // 106
    { sets: [19, 27, 19, 19, 26], restHours: 48 }, // 110
    { sets: [20, 28, 20, 20, 28], restHours: 48 }, // 116
  ],
  // Level 7: 31-35 Pushups
  7: [
    { sets: [20, 25, 19, 19, 23], restHours: 48 }, // 106
    { sets: [22, 25, 21, 21, 25], restHours: 48 }, // 114
    { sets: [23, 26, 23, 23, 25], restHours: 72 }, // 120
    { sets: [24, 27, 24, 24, 26], restHours: 48 }, // 125
    { sets: [25, 28, 24, 24, 27], restHours: 48 }, // 128
    { sets: [25, 29, 25, 25, 28], restHours: 72 }, // 132
    { sets: [26, 29, 25, 25, 29], restHours: 48 }, // 134
    { sets: [26, 30, 26, 26, 30], restHours: 48 }, // 138
    { sets: [26, 32, 26, 26, 32], restHours: 48 }, // 142
  ],
  // Level 8: 36-40 Pushups
  8: [
    { sets: [23, 27, 22, 22, 26], restHours: 48 }, // 120
    { sets: [24, 28, 24, 24, 28], restHours: 48 }, // 128
    { sets: [25, 29, 24, 24, 29], restHours: 72 }, // 131
    { sets: [26, 30, 25, 25, 30], restHours: 48 }, // 136
    { sets: [26, 31, 25, 25, 31], restHours: 48 }, // 138
    { sets: [26, 31, 26, 26, 31], restHours: 72 }, // 140
    { sets: [27, 31, 26, 26, 32], restHours: 48 }, // 142
    { sets: [28, 32, 26, 26, 32], restHours: 48 }, // 144
    { sets: [28, 34, 27, 27, 34], restHours: 48 }, // 150
  ],
  // Level 9: > 40 Pushups
  9: [
    { sets: [25, 28, 24, 24, 26], restHours: 48 }, // 127
    { sets: [25, 29, 25, 25, 28], restHours: 48 }, // 132
    { sets: [25, 30, 25, 25, 29], restHours: 72 }, // 134
    { sets: [26, 31, 25, 25, 31], restHours: 48 }, // 138
    { sets: [26, 32, 26, 26, 32], restHours: 48 }, // 142
    { sets: [27, 32, 26, 26, 32], restHours: 72 }, // 143
    { sets: [27, 34, 26, 26, 33], restHours: 48 }, // 146
    { sets: [28, 34, 26, 26, 34], restHours: 48 }, // 148
    { sets: [29, 35, 27, 27, 35], restHours: 48 }, // 153
  ]
};

export const calculateLevel = (reps: number): number => {
  if (reps > 40) return 9;
  if (reps >= 36) return 8;
  if (reps >= 31) return 7;
  if (reps >= 26) return 6;
  if (reps >= 21) return 5;
  if (reps >= 16) return 4;
  if (reps >= 12) return 3;
  if (reps >= 9) return 2;
  return 1;
};

export const getLevelRange = (level: number): string => {
  switch (level) {
    case 1: return "< 9 PUSHUPS";
    case 2: return "9-11 PUSHUPS";
    case 3: return "12-15 PUSHUPS";
    case 4: return "16-20 PUSHUPS";
    case 5: return "21-25 PUSHUPS";
    case 6: return "26-30 PUSHUPS";
    case 7: return "31-35 PUSHUPS";
    case 8: return "36-40 PUSHUPS";
    case 9: return "MORE 40 PUSHUPS";
    default: return "";
  }
};

export interface PlanResult {
  week: number;
  day: number;
  plan: WorkoutPlan | null;
  isTest: boolean;
}

export const getPlanForDay = (level: number, sessionCount: number): PlanResult => {
  const levelPlans = WORKOUT_PLANS[level] || WORKOUT_PLANS[1];
  const totalWorkouts = levelPlans.length;

  if (sessionCount >= totalWorkouts) {
    return {
      week: Math.ceil((totalWorkouts) / 3),
      day: (totalWorkouts % 3) || 3,
      plan: null,
      isTest: true
    };
  }

  const plan = levelPlans[sessionCount];
  // Calculate week/day based on 3 workouts per week assumption
  // sessionCount is 0-indexed
  const week = Math.floor(sessionCount / 3) + 1;
  const day = (sessionCount % 3) + 1;

  return {
    week,
    day,
    plan,
    isTest: false
  };
};
