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