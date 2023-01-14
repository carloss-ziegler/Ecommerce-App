import { View, Image } from "react-native";
import React from "react";
import { FlatList } from "react-native-gesture-handler";
import { SIZES, constants } from "../../constants";

const ITEM_WIDTH = 120;

const Walkthrough1 = () => {
  const [row1Images, setRow1Images] = React.useState([
    ...constants.walkthrough_01_01_images,
    ...constants.walkthrough_01_01_images,
  ]);
  const [currentPosition, setCurrentPosition] = React.useState(0);

  const [row2Images, setRow2Images] = React.useState([
    ...constants.walkthrough_01_02_images,
    ...constants.walkthrough_01_02_images,
  ]);
  const [row2CurrentPosition, setRow2CurrentPosition] = React.useState(0);

  const row1FlatListRef = React.useRef();
  const row2FlatListRef = React.useRef();

  React.useEffect(() => {
    let positionTimer;

    const timer = () => {
      positionTimer = setTimeout(() => {
        setCurrentPosition((prev) => {
          const position = Number(prev) + 1;
          row1FlatListRef?.current?.scrollToOffset({
            offset: position,
            animated: false,
          });

          const maxOffset =
            constants.walkthrough_01_01_images.length * ITEM_WIDTH;

          if (prev > maxOffset) {
            const offset = prev - maxOffset;

            row1FlatListRef?.current?.scrollToOffset({
              offset,
              animated: false,
            });

            return offset;
          } else {
            return position;
          }
        });

        setRow2CurrentPosition((prevPosition) => {
          const position = Number(prevPosition + 1);
          row2FlatListRef?.current?.scrollToOffset({
            offset: position,
            animated: false,
          });

          const maxOffset =
            constants.walkthrough_01_02_images.length * ITEM_WIDTH;

          if (prevPosition > maxOffset) {
            const offset = prevPosition - maxOffset;

            row2FlatListRef?.current?.scrollToOffset({
              offset,
              animated: false,
            });

            return offset;
          } else {
            return position;
          }
        });

        timer();
      }, 32);
    };
    timer();

    return () => {
      clearTimeout(positionTimer);
    };
  }, []);

  return (
    <View>
      <FlatList
        ref={row1FlatListRef}
        decelerationRate="fast"
        horizontal
        showsHorizontalScrollIndicator={false}
        listKey="Slider1"
        keyExtractor={(_, index) => `Slider-${index}`}
        data={row1Images}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Image
                source={item}
                style={{
                  width: 110,
                  height: 110,
                }}
              />
            </View>
          );
        }}
      />

      <FlatList
        ref={row2FlatListRef}
        decelerationRate="fast"
        style={{
          marginTop: SIZES.padding,
          transform: [{ rotate: "180deg" }],
        }}
        horizontal
        showsHorizontalScrollIndicator={false}
        listKey="Slider2"
        keyExtractor={(_, index) => `Slider2-${index}`}
        data={row2Images}
        scrollEnabled={false}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                width: ITEM_WIDTH,
                alignItems: "center",
                justifyContent: "center",
                transform: [{ rotate: "180deg" }],
              }}
            >
              <Image
                source={item}
                style={{
                  width: 110,
                  height: 110,
                }}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

export default Walkthrough1;
