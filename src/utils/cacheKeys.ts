export const cacheKeys = (id?: any) => {
  return {
    days: "days",
    periods: "periods",
    announcements: "announcements",
    articles: "articles",
    levels: "levels",
    course: ["course", id],
    courses: "courses",
    lectures: ["lectures", id],
    quiz: ["quizz", id],
    quizzes: ["quizzes", id],
  };
};
