import { StatusBar, StyleSheet, Text, View, ScrollView, Image, TextInput } from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import React, { useEffect, useState } from 'react'

import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline"
import Categories from '../components/Categories';
import axios from "axios"
import Recipes from '../components/Recipes';





const HomeScreen = () => {
const [activeCategory,setActiveCategory]=useState( "Beef");
const [categories,setCategories]=useState([]);
const [meals,setMeals]=useState([])
useEffect(()=>{
  getCategories();
  getRecipes();
},[])
// seçilen categoriyi yönetme
const handleChangeCategory=(category)=>{
getRecipes(category);
setActiveCategory(category);
setMeals([]);
}
// tarifleri kategori ismine göre  çekme
const getRecipes=async(category="Beef")=>{
  try {
    const res=await axios.get(`https://themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    
    if( res && res.data){
setMeals(res.data.meals)
    }
  } catch (error) {
    console.log("eroor:",error);
  }
}
// kategorileri çekme
 const getCategories=async()=>{
  try {
    const res=await axios.get('https://themealdb.com/api/json/v1/1/categories.php')
 
    if( res && res.data){
 setCategories(res.data.categories)
    }
  } catch (error) {
    console.log("eroor:",error);
  }
 }

  return (
    <View className="flex-1 bg-white " >
      <StatusBar barStyle={"dark-content"} />
      <ScrollView showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="space-y-6 pt-14"
      >
        {/* avatar ve zil ikonu */}
        <View className="mx-4 flex-row justify-between items-center mb-2" >
          <Image source={require("../../assets/images/avatar.png")} style={{ height: hp(5), width: hp(5.5) }} />
          <BellIcon size={hp(4)} color={"gray"} />
        </View>
        <View className="mx-4 space-y-2 mb-2">
          <Text style={{ fontSize: hp(1.7) }} className="text-neutral-600" >Hello, Nurseda!</Text>
          <View>
            <Text className="font-semibold text-neutral-600 " style={{ fontSize: hp(3.8) }} >Make your own food, </Text>
          </View>
          <Text style={{ fontSize: hp(3.8) }} className="font-semibold text-neutral-600 " >stay at <Text className="text-amber-400">home</Text></Text>
        </View>
        {/* seacrh bar */}
        <View className="flex-row mx-4 items-center rounded-full bg-black/5 p-[6px]">

          <TextInput
            placeholder='Search any recipe'
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking-wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon size={hp(2.5)} strokeWidth={3} color={"gray"} />
          </View>

        </View>

        {/* kategoriler */}
        <View  >
          {/* kategoriler yüklendikten sonra categories i render et */}
          {categories.length>0 &&  <Categories categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
         
        </View>
        {/* tarifler */}
        <View>
          <Recipes meals={meals} categories={categories}/>
        </View>
      </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})