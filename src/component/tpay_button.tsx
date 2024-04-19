import { Image, Pressable, View, StyleSheet } from 'react-native';
import { useState } from 'react';

export type TpayButtonProps = {
  /**
   * Called when button is clicked
   */
  onClick: Function;

  /**
   * Whether the button should be enabled
   */
  isEnabled: boolean;
};

export const TpayButton = ({ onClick, isEnabled }: TpayButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <Pressable
      style={{
        backgroundColor: isPressed ? '#112458' : '#2248B0',
        borderRadius: 48,
      }}
      onPressIn={(_) => setIsPressed(true)}
      onPressOut={(_) => {
        setIsPressed(false);
        onClick();
      }}
      disabled={!isEnabled}
    >
      <View style={styles.tpayLogo}>
        <Image source={require('../assets/tpay_logo.png')} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  tpayLogo: {
    alignSelf: 'center',
    padding: 14,
  },
});
