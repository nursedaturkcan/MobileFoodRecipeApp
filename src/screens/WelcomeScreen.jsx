import { View, Text, StatusBar, Image } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import React, { useEffect } from 'react'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
  const ring1padding=useSharedValue(0)
  const ring2padding=useSharedValue(0)
  const {navigate}=useNavigation();

  // componentDidmounttan 100ms ve 300ms  sonra spring animasyonu ile
  useEffect(()=>{
    ring1padding.value=0
    ring2padding.value=0
    setTimeout(()=> ring1padding.value=withSpring(ring1padding.value+hp(5)),100);
    setTimeout(()=> ring2padding.value=withSpring(ring2padding.value+hp(5.5)),300);

    // 2.5sn sonra homeScreene git
    setTimeout(()=>navigate("Home"),2500)
  },[])
  return (

    <View className="flex-1 justify-center items-center space-y-10 bg-amber-500">
      <StatusBar barStyle={"light-content"} />

      {/* halkalar içinde logo */}
      <Animated.View className="bg-white/20 rounded-full " style={{padding: ring2padding }}>
        <Animated.View className="bg-white/20 rounded-full " style={{padding: ring1padding } } >
          <Image source={require("../../assets/images/welcome.png")} style={{ width: hp(20), height: hp(20) }} />
        </Animated.View>
      </Animated.View>
      {/* başlık ve punchline  */}
      <View className="flex items-center space-y-2" >
        <Text className="font-bold text-white tracking-widest " style={{fontSize:hp(7)}} >Foody</Text>
        <Text className="font-medium text-white tracking-widest " style={{fontSize:hp(2)}} >Food is always right</Text>
      </View>
    </View>


  )
}

export default WelcomeScreen