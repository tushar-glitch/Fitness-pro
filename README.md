# FitConnect - Fitness Community Platform

![FitConnect Logo](client/public/next.svg)

FitConnect is a comprehensive fitness platform that connects fitness enthusiasts, enables workout tracking, and helps users achieve their fitness goals through community support and personalized features.

## Features

### User Management
- User registration and authentication
- Profile customization with fitness levels and goals
- User connections and social networking

### Workout Tracking
- Create and log workouts
- Track exercise progress
- View workout statistics and history

### Goal Setting
- Create personalized fitness goals
- Track progress towards goals
- Different goal types (weight, strength, endurance, habit)

### Community Features
- Connect with like-minded fitness enthusiasts
- Find workout buddies based on preferences
- Join fitness groups and events

## Tech Stack

### Frontend
- Next.js 15.2.4
- React 19.0.0
- Tailwind CSS
- Radix UI Components
- React Hook Form with Zod validation

### Backend
- Node.js with Express
- PostgreSQL database with Sequelize ORM
- JWT Authentication
- RESTful API architecture

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL database

### Installation

#### Clone the repository
```bash
git clone https://github.com/yourusername/fitness-pro.git
cd fitness-pro
```

#### Backend Setup
1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the server directory with the following variables:
```
PORT=5000
NODE_ENV=development
JWT_SECRET=your_jwt_secret_key
DATABASE_URL=postgres://username:password@localhost:5432/fitness_pro_db
```

4. Start the development server:
```bash
npm run dev
```

The server will run on http://localhost:5000

#### Frontend Setup
1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the client directory with the following variables:
```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The client will run on http://localhost:3000

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user info

### User Endpoints
- `PATCH /api/users/profile` - Update user profile
- `GET /api/users/profile/:userId` - Get user profile
- `GET /api/users/connections` - Get user connections
- `POST /api/users/connections` - Add a connection
- `DELETE /api/users/connections/:connectionId` - Remove a connection
- `GET /api/users/potential-connections` - Find potential connections

### Workout Endpoints
- `POST /api/workouts` - Create a workout
- `GET /api/workouts` - Get user workouts
- `GET /api/workouts/stats` - Get workout statistics
- `GET /api/workouts/:workoutId` - Get a specific workout
- `PATCH /api/workouts/:workoutId` - Update a workout
- `DELETE /api/workouts/:workoutId` - Delete a workout

### Goal Endpoints
- `POST /api/goals` - Create a goal
- `GET /api/goals` - Get user goals
- `GET /api/goals/:goalId` - Get a specific goal
- `PATCH /api/goals/:goalId` - Update a goal
- `DELETE /api/goals/:goalId` - Delete a goal

### Recommendation Endpoints
- `GET /api/recommendations/connections` - Get recommended connections
- `GET /api/recommendations/workout-buddies` - Get workout buddies

## Database Models

### User
- Authentication details (username, email, password)
- Profile information (name, bio, profile image)
- Fitness attributes (fitness level, primary goal)

### Workout
- Workout details (title, description, duration)
- Exercise information
- Performance metrics

### Goal
- Goal details (title, description, target date)
- Progress tracking (start value, current value, target value)
- Goal categorization (weight, strength, endurance, habit)

### Other Models
- Exercise
- Event
- Group

## Deployment

### Backend Deployment
1. Set up a production PostgreSQL database
2. Configure environment variables for production
3. Build and deploy to your preferred hosting service (Heroku, AWS, etc.)

### Frontend Deployment
1. Build the Next.js application:
```bash
cd client
npm run build
```

2. Deploy the built application to Vercel, Netlify, or any other static hosting service

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- Radix UI for accessible UI components
- Express.js for the backend framework
- Sequelize for the ORM