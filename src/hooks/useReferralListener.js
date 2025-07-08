import { useEffect } from 'react';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import AsyncStorage from '@react-native-async-storage/async-storage';

const REFERRAL_KEY = 'referralCode';

export const useReferralListener = () => {
  useEffect(() => {
    const fetchReferral = async (url) => {
      try {
        const params = new URL(url).searchParams;
        const code = params.get('referralCode');
        if (code) {
          await AsyncStorage.setItem(REFERRAL_KEY, code);
          console.log('Referral Code Saved:', code);
        }
      } catch (e) {
        console.log('Failed to extract referral code');
      }
    };

    // App opened from killed state
    dynamicLinks().getInitialLink().then(link => {
      if (link?.url) fetchReferral(link.url);
    });

    // App already running
    const unsubscribe = dynamicLinks().onLink(link => {
      if (link?.url) fetchReferral(link.url);
    });

    return () => unsubscribe();
  }, []);
};

export const getReferralCode = async () => {
  return await AsyncStorage.getItem(REFERRAL_KEY);
};
