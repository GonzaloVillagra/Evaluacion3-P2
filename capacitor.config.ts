import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.evaluacion3ph',
  appName: 'evaluacion3ph',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    CapacitorHttp:{
      enabled: true
    } 
   }
};

export default config;
