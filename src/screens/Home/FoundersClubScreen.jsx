import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

const plans = [
  {
    name: 'Basic',
    price: '₹0',
    sub: 'Free Forever',
    features: ['5% Referral Bonus', 'Basic Analytics', 'Community Access'],
    icon: require('../../assets/img/madels.png'),
  },
  {
    name: 'Pro Affiliate',
    price: '₹499',
    sub: '/month',
    tag: 'Most Popular',
    features: [
      '12% Referral Bonus',
      'Advanced Analytics',
      'Priority Support',
      'Exclusive Training',
    ],
    icon: require('../../assets/img/silver.png'),
  },
  {
    name: 'Elite Partner',
    price: '₹9,999',
    sub: '/month',
    features: [
      '20% Referral Bonus',
      'Premium Analytics',
      '24/7 VIP Support',
      '1-on-1 Mentoring',
      'Custom Marketing Tools',
    ],
    icon: require('../../assets/img/gold.png'),
  },
];

const FoundersClubScreen = () => {
  const navigation = useNavigation();

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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/img/backq.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.headerTextBox}>
          <Text style={styles.heading}>Choose Your Path</Text>
          <Text style={styles.subheading}>Level up your earning potential</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollArea}>
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

            <Text style={[styles.price, getTextColor(plan.name)]}>
              {plan.price}{' '}
              <Text style={[styles.sub, getTextColor(plan.name)]}>
                {plan.sub}
              </Text>
            </Text>

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

            <TouchableOpacity style={getButtonStyle(plan.name)}>
              <Text style={getTextStyle(plan.name)}>Select Plan</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FoundersClubScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FC',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F9F9FC',
  },
  backIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    marginRight: 17,
  },
  headerTextBox: {
    flex: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subheading: {
    fontSize: 16,
    color: '#666666',
    marginTop: 2,
    fontFamily: 'Poppins',
  },
  scrollArea: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    fontSize:24
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
    fontWeight: '700',
    fontFamily:"Poppins"
  },
  price: {
    fontSize: 30,
    fontWeight: '800',
    marginTop: 10,
    marginBottom: 12,
    fontFamily:"Poppins"
  },
  sub: {
    fontSize: 15,
    fontWeight: '400',
    fontFamily:"Poppins"
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
    width: 16,
    height: 16,
    marginRight: 8,
    resizeMode: 'contain',
  },
  feature: {
    fontSize: 16,
    flexShrink: 1,
    fontWeight:"400"
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
    fontSize: 12,
    fontWeight: '600',
  },
  buttonBase: {
    marginTop: 16,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonTextBase: {
    fontSize: 14,
    fontWeight: '700',
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
