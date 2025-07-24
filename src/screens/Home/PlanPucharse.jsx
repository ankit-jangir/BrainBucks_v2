import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import HomeApiService from '../../services/api/HomeApiService';
import {
  CFDropCheckoutPayment,
  CFEnvironment,
  CFPaymentComponentBuilder,
  CFPaymentModes,
  CFSession,
  CFThemeBuilder,
} from 'cashfree-pg-api-contract';
import { CFPaymentGatewayService } from 'react-native-cashfree-pg-sdk';
import Toast from 'react-native-toast-message';
import { ColorsConstant } from '../../constants/Colors.constant';

const PlanPurchase = () => {
  const navigation = useNavigation();
  const planService = new HomeApiService();
  const [refreshing, setRefreshing] = useState(false);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);



  const onRefresh = async () => {
    setRefreshing(true);
    await getPlans();
    setRefreshing(false);
  };

  const getPlans = async () => {
    try {
      setLoading(true);
      const response = await planService.getPlanDeatils();
      if (response?.status === 1 && Array.isArray(response.data)) {
        const formatted = response.data.map(plan => ({
          name: plan.plan_name,
          price: `₹${plan.amount}`,
          amount: plan.amount, // Store raw amount
          sub: 'month',
          tag: plan.plan_name === 'Pro Affiliate' ? 'Most Popular' : null,
          features: plan.benefits,
          icon: getPlanIcon(plan.plan_name),
          item_id: plan._id,
        }));
        setPlans(formatted);
      }
    } catch (err) {
      console.error('Error loading plans:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPlans();
  }, []);

  const getPlanIcon = name => {
    if (name === 'Elite Partner') return require('../../assets/img/gold.png');
    if (name === 'Pro Affiliate') return require('../../assets/img/silver.png');
    return require('../../assets/img/madels.png');
  };

  const getCardStyle = name => {
    if (name === 'Basic') return styles.basicCard;
    if (name === 'Pro Affiliate') return styles.proCard;
    if (name === 'Elite Partner') return styles.eliteCard;
    return {};
  };

  const getButtonStyle = name => {
    if (name === 'Basic') return [styles.buttonBase, styles.outlineButton];
    if (name === 'Pro Affiliate') return [styles.buttonBase, styles.filledButton];
    if (name === 'Elite Partner') return [styles.buttonBase, styles.whiteButton];
    return styles.buttonBase;
  };

  const getTextStyle = name => {
    if (name === 'Basic') return [styles.buttonTextBase, styles.outlineButtonText];
    if (name === 'Pro Affiliate') return [styles.buttonTextBase, styles.filledButtonText];
    if (name === 'Elite Partner') return [styles.buttonTextBase, styles.blackText];
    return styles.buttonTextBase;
  };

  const getTextColor = name => {
    if (name === 'Elite Partner') return styles.whiteText;
    return styles.blackText;
  };

const createOrder = async (item_id) => {
    try {
      setLoading(true);
      const res = await planService.PlanOrder(item_id);
      console.log('Create Order Response:', res);

      if (res.status === 1 && res.payment_session_id && res.order_id) {
        const session = new CFSession(
          res.payment_session_id,
          res.order_id,
          CFEnvironment.SANDBOX
        );

        const paymentModes = new CFPaymentComponentBuilder()
          .add(CFPaymentModes.CARD)
          .add(CFPaymentModes.UPI)
          .add(CFPaymentModes.NB)
          .add(CFPaymentModes.WALLET)
          .add(CFPaymentModes.PAY_LATER)
          .build();

        const theme = new CFThemeBuilder()
          .setNavigationBarBackgroundColor(ColorsConstant.Theme)
          .setNavigationBarTextColor('#FFFFFF')
          .setButtonBackgroundColor(ColorsConstant.Theme)
          .setButtonTextColor('#FFFFFF')
          .setPrimaryTextColor('#212121')
          .setSecondaryTextColor('#757575')
          .build();

        const dropPayment = new CFDropCheckoutPayment(session, paymentModes, theme);

        CFPaymentGatewayService.doPayment(dropPayment);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Failed to Initialize Payment',
          text2: res.message || 'Unable to create order.',
        });
      }
    } catch (err) {
      console.error('Error while creating order:', err.message);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: err.message || 'Something went wrong during order creation.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Payment verification function
  const VerifiyPayment = async (order_id) => {
    try {
      setLoading(true);
      const res = await planService.verifyPayment(order_id);
      console.log('Verify Payment Response:', res);

      if (res.status === 1 && res.data?.order_status === 'PAID') {
        Toast.show({
          type: 'success',
          text1: 'Payment Verified Successfully',
          text2: 'Your plan has been activated!',
        });
        // Navigate to a success screen or refresh user data
        navigation.navigate('PaymentSuccess', { order_id });
        // Optionally, refresh plans or user profile
        await getPlans();
      } else {
        Toast.show({
          type: 'error',
          text1: 'Payment Verification Failed',
          text2: res.message || 'Payment status is not active.',
        });
      }
    } catch (error) {
      console.error('Verification error:', error.message);
      Toast.show({
        type: 'error',
        text1: 'Verification Failed',
        text2: error.message || 'Unable to verify payment.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Set up Cashfree callback for payment verification
  useEffect(() => {
    CFPaymentGatewayService.setCallback({
      onVerify: (data) => {
        console.log('Cashfree onVerify:', data);
        if (data?.order_id) {
          VerifiyPayment(data.order_id);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Verification Error',
            text2: 'Invalid order ID received.',
          });
        }
      },
      onError: (error, data) => {
        console.error('Cashfree onError:', error, data);
        let errorMessage = 'An unexpected error occurred';
        if (error === 'cfFailure') {
          errorMessage = 'Payment Failed';
        } else if (error === 'cfCancelled') {
          errorMessage = 'Payment Cancelled by User';
        }
        Toast.show({
          type: error === 'cfCancelled' ? 'info' : 'error',
          text1: errorMessage,
          text2: data?.error_description || 'Please try again.',
        });
      },
    });

    // Cleanup callback on component unmount
    return () => {
      CFPaymentGatewayService.setCallback(null);
    };
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/h27.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerTextBox}>
          <Text style={styles.heading}>Choose Your Path</Text>
          <Text style={styles.subheading}>Level up your earning potential</Text>
        </View>
      </View>

      {loading ? (
        <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
        <ActivityIndicator size="large" color="#FF6B2C"  />
        </View>
      ) : (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#FF6B2C']}
            />
          }
          contentContainerStyle={styles.scrollArea}
          showsVerticalScrollIndicator={false}
        >
          {plans.map((plan, index) => (
            <View key={index} style={[styles.card, getCardStyle(plan.name)]}>
              {plan.tag && (
                <View style={styles.tag}>
                  <Text style={styles.tagText}>{plan.tag}</Text>
                </View>
              )}
              <View style={styles.topRow}>
                <Text style={[styles.planName, getTextColor(plan.name)]}>
                  {plan.name}
                </Text>
                <Image source={plan.icon} style={styles.icon} />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={[styles.price, getTextColor(plan.name)]}>
                  {plan.price}/{' '}
                </Text>
                <Text style={[styles.sub, getTextColor(plan.name)]}>
                  {plan.sub}
                </Text>
              </View>
              {plan.features.map((feature, i) => (
                <View key={i} style={styles.featureRow}>
                  <Image
                    source={
                      plan.name === 'Elite Partner'
                        ? require('../../assets/img/checkbox2.png')
                        : require('../../assets/img/checkbox.png')
                    }
                    style={styles.checkbox}
                  />
                  <Text style={[styles.feature, getTextColor(plan.name)]}>
                    {feature}
                  </Text>
                </View>
              ))}
              <TouchableOpacity
                onPress={() => createOrder(plan.item_id)}
                style={getButtonStyle(plan.name)}
              >
                <Text style={getTextStyle(plan.name)}>Select Plan</Text>
              </TouchableOpacity>

            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PlanPurchase;

// Styles remain unchanged
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FC',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F9F9FC',
    gap: 10,
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  heading: {
    fontSize: 28,
    fontWeight: '400',
    color: '#1A1A1A',
    fontFamily: 'Poppins',
  },
  subheading: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins',
    fontWeight: '400',
    paddingTop: 5,
  },
  scrollArea: {
    paddingHorizontal: 15,
    paddingBottom: 40,
    paddingTop: 30,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    fontSize: 24,
  },
  basicCard: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  proCard: {
    backgroundColor: '#FFF5EF',
    borderColor: '#FF6A00',
    borderWidth: 1,
  },
  eliteCard: {
    backgroundColor: '#2C2C2C',
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  planName: {
    fontSize: 24,
    fontWeight: '400',
    fontFamily: 'Poppins',
    color: '#1A1A1A',
  },
  price: {
    fontSize: 30,
    fontWeight: '400',
    fontFamily: 'Poppins',
  },
  sub: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Poppins',
    color: '#4B5563',
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  feature: {
    fontSize: 14,
    flexShrink: 1,
    fontWeight: '400',
    fontFamily: 'Poppins',
    color: '#374151',
  },
  tag: {
    backgroundColor: '#FF6A00',
    paddingVertical: 4,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    borderTopLeftRadius: 12,
    borderBottomRightRadius: 12,
    marginBottom: 10,
  },
  tagText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  buttonBase: {
    marginTop: 16,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonTextBase: {
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: '#FF6A00',
    backgroundColor: '#fff',
  },
  outlineButtonText: {
    color: '#FF6A00',
  },
  filledButton: {
    backgroundColor: '#FF6B2C',
  },
  filledButtonText: {
    color: '#fff',
  },
  whiteButton: {
    backgroundColor: '#fff',
  },
  blackText: {
    color: '#000',
  },
  whiteText: {
    color: '#fff',
  },
});