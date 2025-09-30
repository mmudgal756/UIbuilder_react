export interface SqlQuery {
  id: string;
  name: string;
  query: string;
  datasource: string;
  result?: any[];
  isLoading?: boolean;
  error?: string;
  parameters?: Record<string, any>;
  timeout?: number;
  limit?: number;
}
