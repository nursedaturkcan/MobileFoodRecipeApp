import { View, Text, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon, ClockIcon, FireIcon, Square3Stack3DIcon, UsersIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../components/Loading';
import YoutubeIframe from 'react-native-youtube-iframe';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';








const RecipeDetailScreen = (props) => {
    let item = props.route.params;
    // kalp ikonu için state
    const [isFavourite, setIsFavourite] = useState(false)
    const navigation = useNavigation();
    // tarif detay state'i
    const [meal, setMeal] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getMealData(item.idMeal)
    }, [])
    // tarif detyalarını çekme
    const getMealData = async (id) => {
        try {
            const res = await axios.get(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            console.log(res.data);
            if (res && res.data) {
                setMeal(res.data.meals[0]);
                setLoading(false)
            }
        } catch (error) {
            console.log("eroor:", error);
        }
    }
    // malzeme bulduğunda ,
    //malzemelerin indekslerini ( "strIngredient1", "strIngredient2" vb.) bir dizi olarak döndürür. 
    const ingredientsIndexes = (meal) => {
        if (!meal) return [];
        let indexes = [];
        for (let i = 1; i < 20; i++) {
            if (meal["strIngredient" + i]) {
                indexes.push(i)
            }

        }
        return indexes;
    }

    // youtube videosu çekme
    const getYoutubeVideo=(url)=>{
        const regex = /[?&]v=([^&]+)/;
        const match = url.match(regex);
        if (match && match[1]) {
          return match[1];
        }
        return null;
    }
    return (
        <ScrollView className="bg-white flex-1"
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 30 }}
        >
            <StatusBar barStyle={"light-content"} />
            {/* tarif resmi */}
            <View className="flex-row justify-center">
                <Image source={{ uri: item.strMealThumb }} style={{ width: wp(98), height: hp(50), borderRadius: 53, borderBottomLeftRadius: 40, borderBottomRightRadius: 40, marginTop: 4 }} />
            </View>
            {/* geri butonu */}
            <Animated.View entering={FadeIn.delay(200).duration(1000)} className="w-full absolute flex-row justify-between items-center pt-14">
                <TouchableOpacity className="p-2 rounded-full ml-5 bg-white" onPress={() => navigation.goBack()} >
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={"#fbbf24"} />
                </TouchableOpacity>
                <TouchableOpacity className="p-2 rounded-full mr-5 bg-white" onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size={hp(3.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
                </TouchableOpacity>
            </Animated.View>
            {/* tarif detay */}
            {
                loading ? (
                    <Loading size="large" className="mt-16" />
                ) : (
                    <View className="px-4 flex justify-between space-y-4 p-t-8">
                        <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(3) }} className="font-bold flex-1 text-neutral-700" > {meal?.strMeal}</Text>
                            <Text style={{ fontSize: hp(2) }} className="font-medium flex-1 text-neutral-500" > {meal?.strArea}</Text>
                        </Animated.View>
                        {/* ikonlar kısmı*/}
                        <Animated.View entering={FadeInDown.delay(100).springify().damping(12)} className="flex-row justify-around ">
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <ClockIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700" >35</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700" >Mins</Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <UsersIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700" >03</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700" >Servings</Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <FireIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700" >103</Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700" >Cal</Text>
                                </View>
                            </View>
                            <View className="flex rounded-full bg-amber-300 p-2">
                                <View style={{ height: hp(6.5), width: hp(6.5) }} className="bg-white rounded-full flex items-center justify-center">
                                    <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color={"#525252"} />
                                </View>
                                <View className="items-center py-2 space-y-1">
                                    <Text style={{ fontSize: hp(2) }} className="font-bold text-neutral-700" ></Text>
                                    <Text style={{ fontSize: hp(1.3) }} className="font-bold text-neutral-700" >Easy</Text>
                                </View>
                            </View>
                        </Animated.View>

                        {/* İçindekiler kısmı */}
                        <Animated.View entering={FadeInDown.delay(200).springify().damping(12)} className="space-y-2">
                            <Text style={{ fontSize: hp(2) }} className="font-bold flex-1 text-neutral-700 mt-3" > Ingredients</Text>

                            <View className="space-y-2 ml-3">
                                {
                                    ingredientsIndexes(meal).map(i => {
                                        return (
                                            <View key={i} className="flex-row space-x-4">
                                                <View style={{ height: hp(1.5), width: hp(1.5) }} className="bg-amber-300 rounded-full" />

                                                <View className="flex-row space-x-2">
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-extrabold text-neutral-600" > {meal["strMeasure" + i]}</Text>
                                                    <Text style={{ fontSize: hp(1.7) }} className="font-medium text-neutral-600" > {meal["strIngredient" + i]}</Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                            {/* tarif verme kısmı */}
                            <Animated.View entering={FadeInDown.delay(300).springify().damping(12)} className="space-y-10">
                                <Text style={{ fontSize: hp(2) }} className="font-bold flex-1 text-neutral-700 mt-3" > Instructions</Text>
                                <Text style={{ fontSize: hp(1.6) }} className="text-neutral-700"> {meal?.strInstructions}</Text>


                            </Animated.View>
                            {/* tarif videosu */}
                            {
                                meal?.strYoutube && (
                                    <Animated.View entering={FadeInDown.delay(400).springify().damping(12)} className="space-y-4">
                                        <Text style={{ fontSize: hp(2) }} className="font-bold flex-1 text-neutral-700 mt-3" > Recipe Video</Text>
                                        <View>
                                            <YoutubeIframe
                                            videoId={getYoutubeVideo(meal.strYoutube)}
                                           
                                            height={hp(30)}
                                            />
                                        </View>
                                    </Animated.View>
                                )
                            }
                        </Animated.View>



                    </View>
                )
            }
        </ScrollView>
    )
}

export default RecipeDetailScreen