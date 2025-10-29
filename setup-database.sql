-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create students table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  age INTEGER NOT NULL CHECK (age > 0 AND age <= 100),
  grade VARCHAR(10) NOT NULL,
  phone VARCHAR(20),
  address TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_students_email ON students(email);

-- Create index on grade for filtering
CREATE INDEX IF NOT EXISTS idx_students_grade ON students(grade);

-- Insert some sample users (passwords are hashed versions of 'password123')
INSERT INTO users (name, email, password) VALUES
('Admin User', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'),
('Test User', 'test@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
ON CONFLICT (email) DO NOTHING;

-- Insert some sample data
INSERT INTO students (name, email, age, grade, phone, address) VALUES
('John Doe', 'john.doe@example.com', 20, 'A', '+1234567890', '123 Main St, City, State'),
('Jane Smith', 'jane.smith@example.com', 19, 'A+', '+1234567891', '456 Oak Ave, City, State'),
('Mike Johnson', 'mike.johnson@example.com', 21, 'B+', '+1234567892', '789 Pine Rd, City, State'),
('Sarah Wilson', 'sarah.wilson@example.com', 20, 'A-', '+1234567893', '321 Elm St, City, State'),
('David Brown', 'david.brown@example.com', 22, 'B', '+1234567894', '654 Maple Dr, City, State')
ON CONFLICT (email) DO NOTHING;
