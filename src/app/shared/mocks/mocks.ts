export interface Course {
  id: string;
  title: string;
  description: string;
  duration: number;
  authors: string[];
  creationDate: string;
}

export const mockedCoursesList: Course[] = [
  {
    id: '1',
    title: 'Angular Fundamentals',
    description: 'Learn the basics of Angular framework including components, services, and routing.',
    duration: 120,
    authors: ['John Doe', 'Jane Smith'],
    creationDate: '2024-01-15'
  },
  {
    id: '2',
    title: 'Advanced TypeScript',
    description: 'Deep dive into TypeScript features and best practices for large applications.',
    duration: 90,
    authors: ['Mike Johnson'],
    creationDate: '2024-02-20'
  },
  {
    id: '3',
    title: 'RxJS Reactive Programming',
    description: 'Master reactive programming with RxJS in Angular applications.',
    duration: 75,
    authors: ['Sarah Wilson', 'Tom Brown'],
    creationDate: '2024-03-10'
  }
];

export const mockedAuthorsList = [
    {
        id: '27cc3006-e93a-4748-8ca8-73d06aa93b6d',
        name: 'Vasiliy Dobkin'
    },
    {
        id: 'f762978b-61eb-4096-812b-ebde22838167',
        name: 'Nicolas Kim'
    },
    {
        id: 'df32994e-b23d-497c-9e4d-84e4dc02882f',
        name: 'Anna Sidorenko'
    },
    {
        id: '095a1817-d45b-4ed7-9cf7-b2417bcbf748',
        name: 'Valentina Larina'
    },
];
