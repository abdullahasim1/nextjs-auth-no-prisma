 Student Dashboard Setup Guide

## Database Configuration

This application uses Neon PostgreSQL database. To set up the database connection:

### 1. Create a Neon Database

1. Go to [Neon Console](https://console.neon.tech/)
2. Sign up/Login to your account
3. Create a new project
4. Copy the connection string

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@hostname:port/database?sslmode=require"

# Example Neon URL format:
# DATABASE_URL="postgresql://user:password@ep-xxx-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
```

### 3. Set Up Database Schema

Run the SQL commands from `setup-database.sql` in your Neon SQL editor. This will create both the users and students tables with sample data.

The setup includes:
- **Users table**: For authentication
- **Students table**: For student data management
- **Sample users**: Pre-configured test accounts
- **Sample students**: Demo data for testing

### 4. Test Credentials

After running the setup script, you can use these test accounts:

**Admin Account:**
- Email: `admin@example.com`
- Password: `password123`

**Test Account:**
- Email: `test@example.com`
- Password: `password123`

### 5. Test the Application

After setting up the database:

1. Restart your development server: `npm run dev`
2. Visit `http://localhost:3000`
3. You should be redirected to the login page
4. Use one of the test credentials above to log in
5. After successful login, you'll be redirected to the student dashboard

## Fallback Mode

If no database is configured, the application will automatically use sample data for demonstration purposes. You'll see 5 sample students in the dashboard.

## Features

- ✅ **Authentication**: Login/logout system with password hashing
- ✅ **Protected Routes**: Automatic redirect to login when not authenticated
- ✅ **Server Actions**: Modern Next.js 15 server actions
- ✅ **Pagination**: Smart pagination with configurable page sizes
- ✅ **Search**: Real-time search across student data
- ✅ **CRUD Operations**: Create, Read, Update, Delete students
- ✅ **Walking Loader**: Charming loading animation
- ✅ **Responsive Design**: Works on all screen sizes
- ✅ **TypeScript**: Full type safety throughout
- ✅ **Error Handling**: Graceful error boundaries

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Troubleshooting

### Database Connection Issues

1. **Check your DATABASE_URL**: Ensure it's correctly formatted
2. **Verify Neon project status**: Make sure your Neon project is active
3. **Check network connectivity**: Ensure you can reach Neon servers
4. **Review Neon logs**: Check the Neon console for any connection issues

### Common Issues

- **"fetch failed" error**: Usually indicates network connectivity issues
- **"Connect Timeout Error"**: Database server might be sleeping (Neon free tier)
- **"Invalid connection string"**: Check your DATABASE_URL format

### Fallback Mode

If you encounter database issues, the application will automatically fall back to sample data mode, allowing you to test all features without a database connection.


