import dynamicLinks from '@react-native-firebase/dynamic-links';

// ✅ This will generate a short Firebase Dynamic Link for sharing
export const generateDynamicLink = async (referCode) => {
  try {
    const link = await dynamicLinks().buildShortLink({
      link: `https://quiz.brainbucks.in/SignupReferral?referralCode=${referCode}`, // 👈 This is your real deep link
      domainUriPrefix: 'https://brainbucks.in/', // 👈 Your Firebase Dynamic Link domain (set in Firebase Console)
      android: {
        packageName: 'com.brainbucks.android', // 👈 Your app's real package name
      },
      ios: {
        bundleId: 'com.brainbucks.ios', // ✅ Add this if you plan to use iOS too
      },
    });

    return link;
  } catch (error) {
    console.error('🔥 Error generating referral link:', error);
    return null;
  }
};
