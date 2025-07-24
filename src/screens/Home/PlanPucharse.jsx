import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
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
import { ColorsConstant } from '../../constants/Colors.constant';

const PlanPurchase = () => {
  const navigation = useNavigation();
  const planService = new HomeApiService();
  const [refreshing, setRefreshing] = useState(false);
  const [plans, setPlans] = useState([]);
  const [orderId, setOrderId] = useState(null);
  console.log(plans);
  const [loading, setLoading] = useState(true);

  const processedOrders = new Set(); // For deduplication

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
          price: `₹ ${plan.amount}`,
          amount: plan.amount,
          sub: 'month',
          tag: plan.plan_name === 'Pro Affiliate' ? 'Most Popular' : null,
          features: plan.benefits,
          icon: getPlanIcon(plan.plan_name),
          item_id: plan._id,
          loading: false, // Initialize loading state for each plan
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
      // Set loading to true for the specific plan
      setPlans(prevPlans =>
        prevPlans.map(plan =>
          plan.item_id === item_id ? { ...plan, loading: true } : plan
        )
      );

      const res = await planService.PlanOrder(item_id);
      console.log('Create Order Response:', res);
      setOrderId(res.order_id);
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
        ToastAndroid.show(
          `Failed to Initialize Payment: ${res.message || 'Unable to create order.'}`,
          ToastAndroid.LONG
        );
      }
    } catch (err) {
      console.error('Error while creating order:', err.message);
      ToastAndroid.show(
        `Error: ${err.message || 'Something went wrong during order creation.'}`,
        ToastAndroid.LONG
      );
    } finally {
      // Set loading to false for the specific plan
      setPlans(prevPlans =>
        prevPlans.map(plan =>
          plan.item_id === item_id ? { ...plan, loading: false } : plan
        )
      );
    }
  };

  const Verify = async (orderID) => {
    console.log(orderID, 'oooooo');
    if (processedOrders.has(orderID)) {
      console.log(`Order ${orderID} already processed, skipping`);
      return;
    }
    processedOrders.add(orderID);
    try {
      setLoading(true);
      const res = await planService.verifyPayment(orderID);
      console.log('Verify Payment Response:', res);

      if (res.status === 1) {
        ToastAndroid.show(
          'Payment Verified Successfully: Your plan has been activated!',
          ToastAndroid.LONG
        );
        navigation.navigate('Home', { refresh: true });
      } else {
        ToastAndroid.show(
          `Payment Verification Failed: ${res.message || 'Payment status is not active.'}`,
          ToastAndroid.LONG
        );
      }
    } catch (error) {
      console.error('Verification error:', error.message);
      ToastAndroid.show(
        `Verification Failed: ${error.message || 'Unable to verify payment.'}`,
        ToastAndroid.LONG
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const callback = {
      onVerify(orderID) {
        console.log('Cashfree onVerify triggered with orderID:', orderID);
        Verify(orderID);
      },
      onError(error, orderID) {
        console.error('Cashfree onError:', JSON.stringify(error), 'Order ID:', orderID);
        ToastAndroid.show(
          `Payment Failed: ${error.message || 'Payment could not be processed.'}`,
          ToastAndroid.LONG
        );
        setLoading(false);
      },
    };

    console.log('Setting Cashfree callback');
    CFPaymentGatewayService.setCallback(callback);

    return () => {
      console.log('Removing Cashfree callback');
      CFPaymentGatewayService.removeCallback();
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
        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
          <ActivityIndicator size="large" color="#FF6B2C" />
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
                disabled={plan.loading} // Use plan-specific loading state
              >
                {plan.loading ? (
                  <ActivityIndicator color="#FF6B2C" />
                ) : (
                  <Text style={getTextStyle(plan.name)}>{plan.name}</Text>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

export default PlanPurchase;

// Styles remain the same
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