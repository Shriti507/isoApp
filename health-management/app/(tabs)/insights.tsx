import React, { useState, useEffect } from "react";
import { 
  ScrollView, 
  StyleSheet, 
  View, 
  Text, 
  SafeAreaView, 
  StatusBar, 
  Dimensions 
} from "react-native";
import Animated, { FadeOut, FadeIn } from "react-native-reanimated";
import StabilityCard from "../../components/insights/StabilityCard";
import CycleTrendsChart from "../../components/insights/CycleTrendsChart";
import WeightChart from "../../components/insights/WeightChart";
import BodySignalsDonut from "../../components/insights/BodySignalsDonut";
import LifestyleHeatmap from "../../components/insights/LifestyleHeatmap";
import { Colors } from "../../constants/colors";

const { height } = Dimensions.get("window");

const LoadingSkeleton = () => (
  <Animated.View 
    exiting={FadeOut.duration(800)}
    style={styles.skeletonContainer}
  >
    {[1, 2, 3, 4].map((i) => (
      <View key={i} style={styles.skeletonCard} />
    ))}
  </Animated.View>
);

export default function InsightsScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Insights</Text>
        <Text style={styles.headerSubtitle}>Your health overview</Text>
      </View>

      <View style={styles.mainContainer}>
        {loading ? (
          <LoadingSkeleton />
        ) : (
          <Animated.ScrollView 
            entering={FadeIn.duration(600)}
            style={styles.container}
            contentContainerStyle={styles.contentContainer}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={16}
          >
            <StabilityCard />
            <CycleTrendsChart />
            <BodySignalsDonut />
            <WeightChart />
            <LifestyleHeatmap />
          </Animated.ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: Colors.textPrimary,
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },
  skeletonContainer: {
    padding: 16,
    flex: 1,
  },
  skeletonCard: {
    height: 180,
    backgroundColor: Colors.white,
    borderRadius: 16,
    marginBottom: 16,
    opacity: 0.6,
  },
});