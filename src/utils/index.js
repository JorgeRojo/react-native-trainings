


export class Style {

    constructor(stylesCollection) { 
        if (typeof stylesCollection === 'object') {
            this.stylesCollection = stylesCollection;
            this.stylesCollectionKeys = Object.keys(stylesCollection);
        }
    }

    style = keys => {
        const style = [];

        if (this.stylesCollectionKeys) {
            keys.split(/\s+/gi).forEach(key => {
                if (this.stylesCollectionKeys.includes(key)
                    && !style.includes(this.stylesCollection[key])
                ) {
                    style.push(this.stylesCollection[key]);
                }
            });
        }

        return { style };
    };
}