export class PrivPagingResult<T> {
    data: T[]; 
    totalItemCount: number; 
    totalPages: number; 
    success: boolean; 
    message: string; 
  
    constructor(
      data: T[],
      totalItemCount: number,
      totalPages: number,
      success: boolean,
      message: string
    ) {
      this.data = data;
      this.totalItemCount = totalItemCount;
      this.totalPages = totalPages;
      this.success = success;
      this.message = message;
    }
  }
  