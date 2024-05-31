import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity as BBText,
  Image,
  ToastAndroid,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {CheckBox, Icon} from '@rneui/themed';
import {useNavigation} from '@react-navigation/native';
import {NavigationContainer, useIsFocused} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text} from '../../utils/Translate';
import { ColorsConstant } from '../../constants/Colors.constant';

export default function PrivacyPolicy() {
  const navigation = useNavigation();
  const [check4, setCheck4] = useState(false);

  const showToast = () => {
    ToastAndroid.show(
      'Please check the agreement to continue',
      ToastAndroid.SHORT,
    );
  };

  const isFocused = useIsFocused();
  const [Rules, setRules] = useState([]);

  useEffect(() => {
    getUpdate();
  }, [isFocused]);

  const getUpdate = async () => {
    const token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      token: token,
    });

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://brainbucks.co.in/api/user/get-roles-policy', requestOptions)
      .then(response => response.json())

      .then(result => {
        if (result.status == '001') {
          setRules(result.data[0].privacy_policy.split('#'));
          console.log('Response>>>>', result.data[0].privacy_policy);
        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <>
      <View style={{backgroundColor: '#fff', height: '100%'}}>
      <View style={styles.Hview}>
      <View style={styles.Hview1}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.THead}>
          <Image
            source={require('../../assets/img/arrows.png')}
            resizeMode="contain"
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
        <View style={styles.ViewMy}>
          <Text style={styles.TextMy}>Privacy Policy</Text>
        </View>
      </View>
    </View>

        <View
          style={{
            borderBottomColor: 'white',
            borderBottomWidth: 1,
            borderColor: 'lightgrey',
          }}
        />
        <ScrollView style={{marginVertical: 10, marginHorizontal: 15}}>
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}>
            <Privacy navigation={navigation} />
          </View>
        </ScrollView>
        <View
          style={{
            alignItems: 'center',
            width: '100%',
            height: 80,
            borderTopColor: 'whitesmoke',
            borderTopWidth: 0.5,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 10,
              paddingHorizontal: 20,
            }}>
            <TouchableOpacity>
              <Image
                source={require('../../assets/img/check-mark.png')}
                style={{height: 20, width: 20}}
              />
            </TouchableOpacity>
            {/* {console.log(isChecked)} */}
            <Text
              style={{
                fontSize: 16,
                fontFamily: 'WorkSans-Medium',
                color: '#000',
                textAlign: 'justify',
                paddingLeft: 15,
              }}>
              I hereby agree to the{' '}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: 'WorkSans-Medium',
                  color: '#367CFF',
                }}>
                Rules & Regulations
              </Text>{' '}
              of the Brain Bucks app
            </Text>
          </View>
        </View>
      </View>
    </>
  );
}

const Privacy = () => {
  return (
    <>
      <View style={{backgroundColor:"white"}}>
        <View style={{backgroundColor:"white"
    }}>
          <Text style={{fontSize: 25, fontWeight: 'bold', paddingVertical: 10,color:"black"}}>
            Privacy Policy
          </Text>

          <Text
            style={{fontSize: 15, textAlign: 'justify', paddingVertical: 5,color:"black"}}>
            Tech Brain Bucks Infosoft Private Limited operates the portal in
            India, which offers live competitive exam preparation and fantasy
            quiz through the portal Brainbucks.in and mobile application(s)
            (collectively referred to as the “Portal”) (Tech Brain Bucks
            Infosoft Private Limited referred to herein as “Brain Bucks” or “we”
            or “us” “our”).
          </Text>

          <Text
            style={{fontSize: 15, textAlign: 'justify', paddingVertical: 5,color:"black"}}>
            Any person utilizing the Portal ("User" or "you" or "your") or any
            of its features including participation in the various contests,
            Quiz shall be bound by this Privacy Policy.
          </Text>

          <Text
            style={{fontSize: 15, textAlign: 'justify', paddingVertical: 5,color:"black"}}>
            Tech Brain Bucks Infosoft Private Limited respects the privacy of
            its Users and is committed to protect it in all respects. With a
            view to offer an enriching and holistic internet experience to its
            Users, Tech Brain Bucks Infosoft Private Limited offers a vast
            repository of Services. Kindly take time to read the 'About Us'
            section to know more about Tech Brain Bucks Infosoft Private
            Limited. Most of the Services are offered for free but you may need
            registration to participate in Tech Brain Bucks Infosoft Private
            Limited's online Quizzes. The information about the User is
            collected by Tech Brain Bucks Infosoft Private Limited as (i)
            information supplied by Users and (ii) information automatically
            tracked during User's navigation on Tech Brain Bucks Infosoft
            Private Limited.
          </Text>

          <Text
            style={{fontSize: 15, textAlign: 'justify', paddingVertical: 5,color:"black"}}>
            Before you submit any information to the Portal, please read this
            Privacy Policy for an explanation of how we will treat your personal
            information. By using any part of the Portal, you consent to the
            collection, use, disclosure and transfer of your personal
            information for the purposes outlined in this Privacy Policy and to
            the collection, processing and maintenance of this information. If
            you do not agree to this Privacy Policy, please do not use the
            Portal. Your use of any part of the Portal indicates your acceptance
            of this Privacy Policy and of the collection, use and disclosure of
            your personal information in accordance with this Privacy Policy.
            While you have the option not to provide us with certain
            information, withdraw your consent to collect certain information,
            request temporary suspension of collection of information or request
            deletion of information collected, kindly note that in such an event
            you may not be able to take full advantage of the entire scope of
            features and services offered to you and we reserve the right not to
            provide you with our services.
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text style={{fontSize: 25, fontWeight: 'bold', marginTop: 20,color:"black"}}>
            Purpose and Usage:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 10,color:"black"}}>
            To avail certain Services on the Portal, Users would be required to
            provide certain information for the registration process namely:
          </Text>

          <View style={{paddingHorizontal: 15}}>
            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              1. Username
            </Text>

            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              2. Password
            </Text>

            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              3. Email address
            </Text>

            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              4. Date of birth
            </Text>
          </View>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            In the course of providing you with access to the Services, and in
            order to provide you access to the features offered through the
            Portal and to verify your identity, secure your account details, you
            may give us the permission to capture, record your device
            information, operating system information, network information,
            location information. In certain instances, we may also collect
            Sensitive Personal Information (“SPI”) from you on the Portal. SPI
            means such personal information which consists of information
            relating to your physical, physiological and mental health
            condition; medical records and history; biometric information,
            sexual orientation and financial information, such as information
            regarding the payment instrument/modes used by you to make such
            payments, which may include cardholder name, credit/debit card
            number (in encrypted form) with expiration date, banking details,
            wallet details etc. This information is presented to you at the time
            of making a payment to enable you to complete your payment
            expeditiously.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Except for any financial information that you choose to provide
            while making payment for any Services on the Portal, Tech Brain
            Bucks Infosoft Private Limited does not collect any other SPI in the
            course of providing the Services. Any SPI collected by Tech Brain
            Bucks Infosoft Private Limited shall not be disclosed to any third
            party without your express consent, save as otherwise set out in
            this Privacy Policy or as provided in a separate written agreement
            between Tech Brain Bucks Infosoft Private Limited and you or as
            required by law. It is clarified that this condition shall not apply
            to publicly available information, including SPI, in relation to you
            on the Portal.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            In the course of providing the Services, Users may invite other
            existing Users or other users ("Invited Users") to participate in
            any of the Services by providing the email address or Facebook
            username of such users. Tech Brain Bucks Infosoft Private Limited
            may thereafter use this information to contact the Invited User and
            invite such user to register with Tech Brain Bucks Infosoft Private
            Limited (if such Invited User is not an existing User) and
            participate in the Quiz in relation to which such person was invited
            by the User. The participation of the Invited User in any of the
            Quiz shall be subject to the terms of this Privacy Policy and the
            Terms and Conditions for the use of the Portal. The User hereby
            represents that the Invited Users have consented and agreed to such
            disclosure to and use of their email address by Tech Brain Bucks
            Infosoft Private Limited.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            All required information is specific and based on the kind of Quiz /
            Services the User wishes to participate in or access, and will be
            utilized for the purpose of providing services, including but not
            limited to the Services requested by the User. The information as
            supplied by the Users enables us to improve the Services and provide
            you the most user-friendly game experience.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop:15 ,color:"black"}}>
            Tech Brain Bucks Infosoft Private Limited may also share such
            information with affiliates and third parties in limited
            circumstances, including for the purpose of providing services
            requested by the User, complying with legal process, preventing
            fraud or imminent harm, and ensuring the security of our network and
            services.
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Disclosure/Sharing:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Tech Brain Bucks Infosoft Private Limited may also share information
            as provided by you and data concerning usage of the Services and
            participation in the Games with third party service providers
            engaged by Tech Brain Bucks Infosoft Private Limited, for the
            purpose of data analytics or other similar purposes, for the purpose
            of storage, improving the services and helping Tech Brain Bucks
            Infosoft Private Limited serve you better.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Where we propose to use your personal information (that is,
            information that that may be used to identify the User and that is
            not otherwise publicly available) for any other uses we will ensure
            that we notify you first. You will also be given the opportunity to
            withhold or withdraw your consent for your use other than as listed
            above.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            By using the Portal, you hereby expressly agree and grant consent to
            the collection, use and storage of this information by Tech Brain
            Bucks Infosoft Private Limited. Tech Brain Bucks Infosoft Private
            Limited reserves the right to share, disclose and transfer
            information collected hereunder with its own affiliates. In the
            event Tech Brain Bucks Infosoft Private Limited sells or transfers
            all or a portion of its business assets, consumer information may be
            one of the business assets that are shared, disclosed or transferred
            as part of the transaction. You hereby expressly grant consent and
            permission to Tech Brain Bucks Infosoft Private Limited for
            disclosure and transfer of information to such third parties. Tech
            Brain Bucks Infosoft Private Limited may share information as
            provided by you and data concerning usage of the Services and
            participation in the Quizzes with its commercial partners for the
            purpose of facilitating user engagement, for marketing and
            promotional purposes and other related purposes. Further, Tech Brain
            Bucks Infosoft Private Limited reserves the right to disclose
            personal information as obligated by law, in response to duly
            authorized legal process, governmental requests and as necessary to
            protect the rights and interests of Tech Brain Bucks Infosoft
            Private Limited.
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>

          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Use of Cookies:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 25,color:"black"}}>
            To improve the effectiveness and usability of the Portal for our
            Users, we use "cookies", or such similar electronic tools to collect
            information to assign each visitor a unique random number as a User
            Identification (User ID) to understand the User's individual
            interests using the identified computer. Unless the User voluntarily
            identifies himself/herself (e.g., through registration), Tech Brain
            Bucks Infosoft Private Limited has no way of knowing who the User
            is, even if we assign a cookie to the User's computer. The only
            personal information a cookie can contain is information supplied by
            the User. A cookie cannot read data off the User's hard drive.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 25,color:"black"}}>
            Tech Brain Bucks Infosoft Private Limited's web servers
            automatically collect limited information about User's computer's
            connection to the Internet, including User's IP address, when the
            User visits the Portal. (User's IP address is a number that lets
            computers attached to the Internet know where to send data to the
            User -- such as the web pages viewed by the User). The User's IP
            address does not identify the User personally. Tech Brain Bucks
            Infosoft Private Limited uses this information to deliver its web
            pages to Users upon request, to tailor its Portal to the interests
            of its users, to measure traffic within the Portal and let
            advertisers know the geographic locations from where Tech Brain
            Bucks Infosoft Private Limited's visitors come.
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Links:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Tech Brain Bucks Infosoft Private Limited does not includes links to
            other websites.
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Security Procedures:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 20,color:"black"}}>
            All information gathered on Tech Brain Bucks Infosoft Private
            Limited is securely stored within Tech Brain Bucks Infosoft Private
            Limited- controlled database. The database is stored on servers
            secured behind a firewall; access to such servers being
            password-protected and strictly limited based on need-to-know basis.
            However, we understand that as effective as our security measures
            are, no security system is impenetrable. Thus, we cannot guarantee
            the security of our database, nor can we guarantee that information
            you supply will not be intercepted while being transmitted to us
            over the Internet. Further, any information you include in a posting
            to the discussion areas will be available to anyone with Internet
            access. By using the Portal, you understand and agree that your
            information may be used in or transferred to countries other than
            India.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 20,color:"black"}}>
            Tech Brain Bucks Infosoft Private Limited also believes that the
            internet is an ever-evolving medium. We may periodically review from
            time to time and change our privacy policy to incorporate such
            future changes as may be considered appropriate, without any notice
            to you. Our use of any information we gather will always be
            consistent with the policy under which the information was
            collected, regardless of what the new policy may be. Any changes to
            our privacy policy will be posted on this page, so you are always
            aware of what information we collect, how we use it, how we store it
            and under what circumstances we disclose it.
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
              color:"black"
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Payment:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 20,color:"black"}}>
            We use Razorpay for processing payments. We/Razorpay do not store
            your card data on their servers. The data is encrypted through the
            Payment Card Industry Data Security Standard (PCI-DSS) when
            processing payment.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 20,color:"black"}}>
            Your purchase transaction data is only used as long as is necessary
            to complete your purchase transaction. After that is complete, your
            purchase transaction information is not saved. Our payment gateway
            adheres to the standards set by PCI-DSS as managed by the PCI
            Security Standards Council, which is a joint effort of brands like
            Visa, MasterCard, American Express and Discover. PCI-DSS
            requirements help ensure the secure handling of credit card
            information by our store and its service providers. For more
            insight, you may also want to read terms and conditions of razorpay
            on https://razorpay.com
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Advertising:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            When Tech Brain Bucks Infosoft Private Limited presents information
            to it's online advertisers -- to help them understand our audience
            and confirm the value of advertising on the Portal -- it is usually
            in the form of aggregated statistics on traffic to various pages
            within our site. When you register with Tech Brain Bucks Infosoft
            Private Limited, we contact you from time to time about updating
            your content to provide features which we believe may benefit you.
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Several deceptive emails, websites, blogs etc. claiming to be from
            or associated with Tech Brain Bucks Infosoft Private Limited may or
            are circulating on the Internet. These emails, websites, blogs etc.
            often include our logo, photos, links, content or other information.
            Some emails, websites, blogs etc. call the user requesting the user
            to provide login name, password etc. or inform the user that the
            user has won a prize/ gift or provide a method to commit illegal/
            unauthorized act or deed or request detailed personal information or
            a payment of some kind. The sources and contents of these emails,
            websites, blogs etc. and accompanying materials are in no way
            associated with Tech Brain Bucks Infosoft Private Limited. For your
            own protection, we strongly recommend not responding to such emails
            or using these websites, blogs etc. We may use the information
            provided by you to Tech Brain Bucks Infosoft Private Limited,
            including your email address or phone number, to contact you about
            the Services availed by you or to inform you of our updated Services
            if any.
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Conditions of Use:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            TECH BRAIN BUCKS INFOSOFT PRIVATE LIMITED DOES NOT WARRANT THAT THIS
            PORTAL, IT’S SERVERS, OR EMAIL SENT BY US OR ON OUR BEHALF ARE VIRUS
            FREE. TECH BRAIN BUCKS INFOSOFT PRIVATE LIMITED WILL NOT BE LIABLE
            FOR ANY DAMAGES OF ANY KIND ARISING FROM THE USE OF THIS PORTAL,
            INCLUDING, BUT NOT LIMITED TO COMPENSATORY, DIRECT, INDIRECT,
            INCIDENTAL, PUNITIVE, SPECIAL AND CONSEQUENTIAL DAMAGES, LOSS OF
            DATA, GOODWILL, BUSINESS OPPORTUNITY, INCOME OR PROFIT, LOSS OF OR
            DAMAGE TO PROPERTY AND CLAIMS OF THIRD PARTIES. IN NO EVENT WILL
            TECH BRAIN BUCKS INFOSOFT PRIVATE LIMITED BE LIABLE FOR ANY DAMAGES
            WHATSOEVER IN AN AMOUNT IN EXCESS OF AN AMOUNT OF INR 100.
          </Text>
          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Retention of Data:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Your personal information may be retained and may continue to be
            used until: (i) the relevant purposes for the use of your
            information described in this Privacy Policy are no longer
            applicable; and (ii) we are no longer required by applicable law,
            regulations, contractual obligations or legitimate business purposes
            to retain your personal information and the retention of your
            personal information is not required for the establishment, exercise
            or defense of any legal claim.
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>
        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            User Account and Data Deletion:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Users are entitled to request Tech Brain Bucks Infosoft Private
            Limited to delete their User accounts and their personal information
            by sending an email with their written request to help@brainbucks.in
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            We will do our best to respond promptly and in any event within one
            month of the{' '}
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            following:
          </Text>

          <View style={{paddingHorizontal: 15}}>
            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              • Our receipt of your written request; or
            </Text>

            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              • Our receipt of any further information we may ask you to provide
              to enable us to comply with your request, whichever is later.
            </Text>
          </View>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            As an alternative to account deletion, by writing to
            help@brainbucks.in, you also have the option to request either:
          </Text>

          <View style={{paddingHorizontal: 15}}>
            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              • (i) the suspension of your account, after which you will not be
              able to play paid contests on your User account but will continue
              to have access to other parts of the Portal; or
            </Text>

            <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
              • (ii) temporary deactivation of your account, where you will no
              longer be able to log into the Portal but which allows you to
              request reactivation of your account with all your account data.
            </Text>
          </View>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            If you proceed with permanent deactivation of your account, you will
            lose access to the Portal and the Services, including any User data
            and personal information associated with your account. Users may
            request for account restoration within six (6) months from the date
            of notification of account deletion by Tech Brain Bucks Infosoft
            Private Limited by writing to help@brainbucks.in When you request
            deletion of your data, we follow a deletion process that ensures
            that your data is safely and completely removed from our servers or
            retained only in anonymised form. We try to ensure that our services
            protect information from accidental or malicious deletion. Because
            of this, there may be delays between when you request deletion and
            when copies are deleted from our active and backup systems.
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Applicable Law and Jurisdiction:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            By visiting this Portal, you agree that the laws of the Republic of
            India without regard to its conflict of laws principles, govern this
            Privacy Policy and any dispute arising in respect hereof shall be
            subject to and governed by the dispute resolution process set out in
            the Terms and Conditions.
          </Text>

          <View
            style={{
              borderBottomWidth: 1,
              borderColor: 'lightgrey',
              paddingVertical: 10,
            }}></View>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Updating Information:
          </Text>

          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            You will promptly notify Brain Bucks if there are any changes,
            updates or modifications to your information. Further, you may also
            review, update or modify your information and user preferences by
            logging into your Profile page on the app.{' '}
          </Text>
        </View>

        <View style={{paddingVertical: 10}}>
          <Text
            style={{
              fontSize: 25,
              fontWeight: 'bold',
              marginTop: 20,
              paddingVertical: 5,
              color:"black"
            }}>
            Contact Us:
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Any questions or clarifications with respect to this Policy or any
            complaints, comments, concerns or feedback can be sent to Tech Brain
            Bucks Infosoft Private Limited at: help@brainbucks.in or by
            normal/physical mail addressed to:
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Attn: Brainbucks Team{' '}
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Techno Brain Bucks infosoft Private Limited
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            101-103, Chanda Tower, opp. Grand Utsav Marriage Garden,
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 15,color:"black"}}>
            Vaishali nagar,
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 2}}>
            Jaipur – 302021,
          </Text>
          <Text style={{fontSize: 15, textAlign: 'justify', marginTop: 2}}>
            Rajasthan, India
          </Text>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Hview: {
    width: '100%',
    height: 65,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: ColorsConstant.LightGray,
    backgroundColor:"white"
  },
  Hview1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  THead: {
    flex: 0.15,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    width: 50,
    height: 50,
    borderColor: ColorsConstant.LightWhite,
    borderWidth: 1,
    borderRadius: 100,
  },
  ViewMy: {
    flex: 0.8,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingLeft: 20,
  },
  TextMy: {
    fontSize: 20,
    fontFamily: 'WorkSans-SemiBold',
    color: '#000',
  },
}

)