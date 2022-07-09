import AsyncStorage from '@react-native-community/async-storage';

export const fetch_data = async (key) => {
    const data = await AsyncStorage.getItem(key);
    if( data === null )
    	return undefined;
    return data;
}

export const remove_data = async (key) => {
    await AsyncStorage.removeItem(key);
}

export const store_data = async (key, value) => {
    await AsyncStorage.setItem(key, value);
}
