import {FIELD_CITY, REQUESTING_DATA, SOURCE} from "./Reducer";

const booleanChangedTo = (propName, value, prevProps, currentProps) => {
    return prevProps[propName] === !value && currentProps[propName] === value;
};

export const handlerRequestData = (self, prevProps = null) => {
    if (booleanChangedTo(REQUESTING_DATA, true, prevProps, self.props) === false) {
        return;
    }

    axios({
        baseURL: "/api",
        method: "GET",
        url: "/weather",
        params: {
            city: self.props[FIELD_CITY],
            source: self.props[SOURCE]
        },
        responseType: "json"
    })
        .then((response) => {
            self.props.receivedData(self, response.data);
        });
};
