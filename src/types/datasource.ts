export interface Datasource {
  id: string;
  name: string;
  type: 'postgresql' | 'mysql' | 'mongodb' | 'rest-api' | 'graphql' | 'firebase' | 'supabase';
  config: {
    host?: string;
    port?: number;
    database?: string;
    username?: string;
    password?: string;
    url?: string;
    ssl?: boolean;
    apiKey?: string;
    projectId?: string;
  };
  isConnected?: boolean;
  lastTested?: Date;
}
