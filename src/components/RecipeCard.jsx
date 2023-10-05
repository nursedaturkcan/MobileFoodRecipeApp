import { View, Text, Pressable, Image } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';


const RecipeCard = ({item,index,navigate}) => {
    // index numarası çift olanlar
    let isEven=index%2==0;
  return (
    <Animated.View entering={FadeInDown.delay(index*100).duration(600).springify().damping(12)}>
      <Pressable
      style={{width: '100%', paddingLeft: isEven? 0:8, paddingRight: isEven?8:0}}
      className="flex justify-center mb-4 space-y-1"
      onPress={()=>navigate("RecipeDetail",{...item})}

      >

         <Image source={{uri:item.strMealThumb }}
        style={{width: '100%', height: index%3==0? hp(25): hp(35), borderRadius: 35}} className="bg-black/5"  /> 
       
        <Text className="font-semibold ml-2 text-neutral-600"  style={{fontSize:hp(1.5)}}>
            {/* isim 20 karakterden uzunsa */}
            {item.strMeal.length>20 ? item.strMeal.slice(0,20)+"....": item.strMeal}
             </Text>
      </Pressable>
    </Animated.View>
  )
}

export default RecipeCard