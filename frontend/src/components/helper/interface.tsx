export interface Note {
  _id: string;
  title: string;
  content: string;
}

export interface User {
  id?: string,
  name: string,
  dateOfBirth: Date,
  email: string
}

export interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  notes: Note[];
  loading: boolean;
  error: unknown;
}