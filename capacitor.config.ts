import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.app',
  appName: 'POS_Market',
  webDir: 'www',
  server: {
    allowNavigation: [
      'http://194.233.95.37:8064/api/*',
      'http://194.233.95.37:8085/api/*',
    ],
    cleartext: true,
  },
};

export default config;
