import { StyleSheet, View, FlatList, Text, Dimensions } from "react-native";
import React, { useState, useRef } from "react";
import SliderItem from "./SliderItem";

const data = [
  {
    id: 1,
    title: "Foto1",
    image: require("../../assets/foto.jpg"),
  },
  {
    id: 2,
    title: "Foto2",
    image: require("../../assets/foto.jpg"),
  },
  {
    id: 3,
    title: "Foto3",
    image: require("../../assets/foto.jpg"),
  },
  {
    id: 4,
    title: "Foto4",
    image: require("../../assets/foto.jpg"),
  },
  {
    id: 5,
    title: "Foto5",
    image: require("../../assets/foto.jpg"),
  },
];

export default function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const viewabilityConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View className="mt-5">
      <FlatList
        data={data}
        horizontal
        pagingEnabled
        renderItem={({ item }) => <SliderItem item={item} />}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />
      <Text style={styles.counter} className="text-[#fff] items-end p-5 rounded-lg">{`${currentIndex + 1}/${data.length}`}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  counter: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: -35,
  },
});