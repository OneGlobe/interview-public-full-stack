export interface Movie {
  id?: string;
  title: string;
  originalTitle: string;
  synopsis: string;
  runtime: number;
  releaseDate: string;
  country: string;
  budget: number;
  mainCast: string[];
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  user: AuthResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}
