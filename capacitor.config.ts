
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.88176769fca842ba86b2ee9e9adf53a6',
  appName: 'life-unfolds-online',
  webDir: 'dist',
  server: {
    url: 'https://88176769-fca8-42ba-86b2-ee9e9adf53a6.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#1e40af',
      showSpinner: false
    }
  }
};

export default config;
