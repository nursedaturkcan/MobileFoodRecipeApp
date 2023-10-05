import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { categoryData } from '../constants';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { CachedImage } from '../helpers/image';




const Categories = ({ activeCategory, setActiveCategory,handleChangeCategory ,categories}) => {
    return (
        <Animated.View entering={FadeInDown.duration(500).springify()}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {categories.map((category, index) => {
                    let isActive = category.strCategory === activeCategory;
                    let activeButtonClasss = isActive ? "bg-amber-400" : "bg-black/10";
                    return (

                        <TouchableOpacity
                            key={index}
                            className="flex items-center space-y-1"
                            onPress={() => handleChangeCategory(category.strCategory)}
                        >
                            <View className={"items-center ml-3 " + activeButtonClasss}>
                                <View className={"rounded-full p-[6px]"}>
                                    <Image
                                        source={{ uri: category.strCategoryThumb }}
                                        style={{ width: hp(6), height: hp(6) }}
                                        className="rounded-full"
                                    /> 
                                  
                                </View>
                               <View>
                               <Text className="text-neutral-600 " style={{ fontSize: hp(1.6), }}>{category.strCategory}</Text>
                               </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </Animated.View>
    );
}

export default Categories;
