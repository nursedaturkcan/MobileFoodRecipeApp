import { View, Text } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import { mealData } from '../constants';
import RecipeCard from './RecipeCard';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
const Recipes = ({categories,meals}) => {
    const {navigate}=useNavigation();
    return (
        <View className="mx-4 space-y-3">
            <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-600 ">Recipes</Text>
            {/* kategoriler yüklenmediyse */}
            <View>
                {categories.length==0 || meals.length==0 ? (<Loading size="large" className="mt-20" />) :<MasonryList
                    data={meals}
                    keyExtractor={(item) => item.idMeal}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item,index }) => <RecipeCard item={item} index={index} navigate={navigate} />}
                   
                   
                    onEndReachedThreshold={0.1}
                 
                /> }
                
            </View>
        </View>
    )
}

export default Recipes