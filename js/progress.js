/**
 * progress.js — Progress Tracking
 * All lesson progress is stored in localStorage so it persists across sessions.
 */

const STORAGE_KEY = 'learnhub_progress';

/**
 * Load all progress data from localStorage
 */
function loadProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

/**
 * Save progress data to localStorage
 */
function saveProgress(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Could not save progress:', e);
  }
}

/**
 * Mark a lesson as complete
 * @param {string} courseId - e.g. 'datascience'
 * @param {string} lessonId - e.g. 'intro-to-data-science'
 */
export function markComplete(courseId, lessonId) {
  const progress = loadProgress();
  if (!progress[courseId]) progress[courseId] = {};
  progress[courseId][lessonId] = {
    completed: true,
    completedAt: new Date().toISOString(),
  };
  saveProgress(progress);
}

/**
 * Mark a lesson as incomplete (undo)
 */
export function markIncomplete(courseId, lessonId) {
  const progress = loadProgress();
  if (progress[courseId] && progress[courseId][lessonId]) {
    delete progress[courseId][lessonId];
    saveProgress(progress);
  }
}

/**
 * Check if a specific lesson is completed
 */
export function isCompleted(courseId, lessonId) {
  const progress = loadProgress();
  return !!(progress[courseId] && progress[courseId][lessonId]?.completed);
}

/**
 * Get the number of completed lessons in a course
 */
export function getCourseProgress(courseId, totalLessons) {
  const progress = loadProgress();
  if (!progress[courseId]) return { completed: 0, total: totalLessons, percent: 0 };
  const completed = Object.values(progress[courseId]).filter(l => l.completed).length;
  const percent = totalLessons > 0 ? Math.round((completed / totalLessons) * 100) : 0;
  return { completed, total: totalLessons, percent };
}

/**
 * Get overall stats across all courses
 */
export function getOverallStats(courses) {
  let totalCompleted = 0;
  let totalLessons = 0;
  for (const course of Object.values(courses)) {
    const { completed, total } = getCourseProgress(course.id, course.lessons.length);
    totalCompleted += completed;
    totalLessons += total;
  }
  return {
    completed: totalCompleted,
    total: totalLessons,
    percent: totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0,
  };
}

/**
 * Reset all progress (used in settings)
 */
export function resetAllProgress() {
  localStorage.removeItem(STORAGE_KEY);
}
