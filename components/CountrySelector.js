import React from "react";
import { StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker'; // Muutettu oikeaan Pickeriin

export default function CountrySelector({values, selected, onValueChange}) {
    return (
        <Picker
            style={styles.picker}
            onValueChange={(itemValue) => onValueChange(itemValue)}
            selectedValue={selected}
        >
            {values.map((country) => (
                <Picker.Item key={country.key} label={country.label} value={country.value} />
            ))}
        </Picker>
    );
}

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        
    },
});
