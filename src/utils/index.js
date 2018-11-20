
import { Platform } from 'react-native';

export const isIOS = () => Platform.OS === 'ios';
export const isAndroid = () => Platform.OS === 'android';

function translateElevationStyle(elevation) {
    if (elevation && Platform.OS === 'ios') {
        return {
            shadowOffset: { width: 0, height: (elevation / 10) * 5 },
            shadowColor: 'rgb(0,0,0)',
            shadowOpacity:  0.20,
            shadowRadius: (elevation / 10) * 7, 
            position: 'relative',
            zIndex: elevation,
        };
    }
}

export class Style {

    constructor(stylesCollection) {
        if (typeof stylesCollection === 'object') {
            this.stylesCollection = stylesCollection;
        }
    }

    style = keys => {
        const style = [];

        if (this.stylesCollection) {
            keys.split(/\s+/gi).forEach(key => {
                const stProps = this.stylesCollection[key];
                if (stProps && !style.includes(stProps)) { 
                    style.push(this.stylesCollection[key]);
                    if(stProps.elevation) {
                        style.push(translateElevationStyle(stProps.elevation));
                    }
                }
            });
        }


        return { style };
    };
}