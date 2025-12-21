Battery Telemetry Dashboard
This project allows users to submit battery telemetry data (Voltage, Current, Temperature, SOC) and view the latest readings in a dashboard.

Getting Started
To get this project running on your local machine, follow these steps:

1. Prerequisites
Node.js (v18 or higher recommended)

npm or yarn

2. Installation
First, clone the repository and install the dependencies:
npm install

3. Environment Setup
The API URL  is kept private for security. 
You need to create a local environment file:

  1. Create a file named .env.local in the root folder.

  2. Add the following variable (replace with your actual API details):
      API_URL=add_URL_here
      Note: This file is already ignored by Git to keep credentials safe.

4. Run the Development Server
npm run dev

Open http://localhost:3000 in your browser to see the result.

Tech Stack & Implementation
Framework: Next.js 15 
Styling: Tailwind CSS
Data Handling: React Server Actions and the FormData API
Responsiveness: Designed with a mobile-first approach.

Key Features
Forms: Uses FormData for efficient data submission.

Real-time Validation: HTML5 validation ensures only positive numbers are submitted for battery data.

Dashboard: A clean, row-based table layout for quick telemetry analysis.Dashboard shows latest fetched telemetry data.

Safety Alerts: Visual message that trigger when the battery voltage exceeds safety threshold(200v-240v).