# 50 Pushups Training App 🏋️‍♂️

A modern, progressive web application designed to guide users from 0 to 50+ consecutive pushups. Built with React, TypeScript, and Supabase.

## 🚀 Features

- **Progressive Training Plans**: 9 distinct difficulty levels taking you from <5 reps to >50 reps.
- **Placement Test**: An initial assessment to assign you the perfect starting level.
- **Interactive Workouts**: Real-time workout tracking with a built-in, customizable rest timer.
- **Cloud Sync**: All progress (history, max reps, current level) is synced to the cloud via Supabase.
- **Dark Mode UI**: A sleek, battery-saving dark theme with green accents.
- **Account Management**: Settings to reset progress, delete accounts, or adjust workout preferences.

## 🛠️ Tech Stack

- **Frontend**: React (TypeScript) + Vite
- **Styling**: Vanilla CSS (Scoped & CSS Variables)
- **Icons**: Lucide React
- **Backend/Database**: Supabase (PostgreSQL + Auth)
- **State Management**: React Context API

## ⚙️ Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/engkufizz/pushup-app.git
    cd pushup-app
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Environment Setup**
    Create a `.env` file in the root directory and add your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_project_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Run the development server**
    ```bash
    npm run dev
    ```

## 📱 How It Works

1.  **Sign Up**: Create an account to save your progress.
2.  **Take the Test**: Perform a max-effort set of pushups.
3.  **Get Your Plan**: The app assigns you a level (1-9) based on your result.
4.  **Train**: Follow the structured workout days (e.g., Week 1, Day 1).
5.  **Level Up**: Retake the test after completing a level to advance.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
