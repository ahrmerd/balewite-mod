interface CommonDataI {
  id: number;
  created_at: string;
  updated_at: string;
}
export interface DepartmentI extends CommonDataI {
  department: string;
  faculty_id: number;
}

export interface FacultyI extends CommonDataI {
  faculty: string;
}
export interface AnnouncementI extends CommonDataI {
  title: string;
  label: string;
  announcement: string;
  priority: number;
  user_id: number;
  image: boolean;
  image_url: string;
}
export interface ArticleI extends CommonDataI {
  title: string;
  label: string;
  article: string;
  priority: number;
  user_id: number;
}
export interface LevelI extends CommonDataI {
  level: string | number;
}
export interface CourseI extends CommonDataI {
  code: string;
  name: string;
  level: LevelI;
}

export interface UserI {
  id: number;
  department_id: number;
  username: string;
  phone_number: string;
  email: string;
  authorization_level: number;
  email_verified_at: null;
  created_at: Date;
  updated_at: Date;
  two_factor_secret: null;
  two_factor_recovery_codes: null;
}

export interface QuizI {
  id: number;
  course_id: number;
  title: string;
  year: string;
  created_at: Date;
}

export interface QuizResourceI {
  id: number;
  course: CourseI;
  title: string;
  questions: QuestionI[];
  year: string;
  created_at: Date;
}

export interface QuestionI {
  id: number;
  question: string;
  quiz_id: number;
  choices: ChoiceI[];
}

export interface ChoiceI {
  id: number;
  choice: string;
  is_answer: boolean;
}
export interface LectureI extends CommonDataI {
  course_id: number;
  day_id?: number;
  period_id?: number;
  location: string;
  lecturer: string;
  period: PeriodI;
  day: DayI;
}
export interface DayI extends CommonDataI {
  day: String;
}
export interface PeriodI extends CommonDataI {
  start_time: string;
  end_time: string;
}

export interface MaterialI extends CommonDataI {
  course_id: number;
  title: string;
  description: string;
  url: string;
}
