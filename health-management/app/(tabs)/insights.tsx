import React from "react";
import { ScrollView, StyleSheet, View, Text, SafeAreaView, StatusBar } from "react-native";
import StabilityCard from "../../components/insights/StabilityCard";
import CycleTrendsChart from "../../components/insights/CycleTrendsChart";
import WeightChart from "../../components/insights/WeightChart";
import BodySignalsDonut from "../../components/insights/BodySignalsDonut";
import LifestyleHeatmap from "../../components/insights/LifestyleHeatmap";

export default function InsightsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
      </View>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <StabilityCard />
        <CycleTrendsChart />
        <WeightChart />
        <BodySignalsDonut />
        <LifestyleHeatmap />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f9fafb", 
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: "#f9fafb",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#111827",
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
});