import { Score } from "./Score";

export interface User {
    userId: number;
    username: string;
    rating: number;
    
    scores?: Score[];
}