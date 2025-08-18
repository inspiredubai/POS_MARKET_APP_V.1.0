import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'POS_Market',
  webDir: 'www',
  server: {
    androidScheme: 'http',
    cleartext: true,
    allowNavigation: [
      'http://103.74.54.207:8207/api/*',
      'http://103.74.54.207:8585/api/*'
    ]
  }
};

export default config;
