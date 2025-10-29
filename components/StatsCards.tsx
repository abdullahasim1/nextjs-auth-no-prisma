"use client";

import type { Student } from "@/app/actions/studentActions";

interface StatsCardsProps {
  students: Student[];
}

export default function StatsCards({ students }: StatsCardsProps) {
  const totalStudents = students.length;
  const averageAge = students.length > 0 
    ? Math.round(students.reduce((sum, student) => sum + student.age, 0) / students.length)
    : 0;
  
  const gradeDistribution = students.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const topGrade = Object.entries(gradeDistribution).reduce(
    (a, b) => (gradeDistribution[a[0]] > gradeDistribution[b[0]] ? a : b),
    ["N/A", 0]
  );

  const stats = [
    {
      title: "Total Students",
      value: totalStudents,
      icon: "👥",
      color: "blue",
    },
    {
      title: "Average Age",
      value: averageAge,
      icon: "📊",
      color: "green",
    },
    {
      title: "Top Grade",
      value: topGrade[0],
      icon: "🏆",
      color: "yellow",
    },
    {
      title: "With Phone",
      value: students.filter(s => s.phone).length,
      icon: "📱",
      color: "purple",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-1">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-800">
                {stat.value}
              </p>
            </div>
            <div className="text-3xl">{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
