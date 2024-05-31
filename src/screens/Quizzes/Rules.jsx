import React, { useState } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from '../../utils/Translate';
import { StyleConstants } from '../../constants/Style.constant';

export default function Rules({ rulesList }) {


  return (
    <>
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <ScrollView>
          <View style={StyleConstants.safeArView}>
            <ScrollView style={{ flex: 1, height: 'auto' }}>
              {rulesList.map((item, index) => (
                <View style={styles.RulesV} key={item}>
                  <View style={{ flex: 0.10 }}>
                    <Text style={styles.RulesText}>{index + 1}</Text>
                  </View>
                  <View style={{ flex: 0.90 }}>
                    <Text style={[styles.RulesText, { fontSize: 12, color: "#000" }]}>{item}</Text>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  RulesV: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    flexDirection: 'row',
  },
  RulesText: {
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    textAlign: "justify",
    color: '#000',
  },
});
