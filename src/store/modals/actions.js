import Types from "./actionType";
import getVendorName from "../../views/productName"

const generationID = () => "_" + Math.random().toString(36).substr(2, 9);

export const DELETE_ERROR = (id) => ({
    type: Types.DELETE_ERROR,
    payload: id,
});

export const SET_ERROR = (module) => (error) => {
    // let id = generationID();
    return {
        type: Types.SET_ERROR,
        payload: {
            ...error,
            module,
            message: `${module} ${error.message}`,
        },
    };
};

export const GET_ERROR_STRUCTURE = (err, requestName) => {
    if (err) {
        console.error("-----------------------");
        console.error(err.response);
        console.error("-----------------------");
    }

    let error = {};
    error.id = generationID();
    if (err.response) {
        const { status } = err.response;
        error.status = status;
        error.message = status + " " + err.toString();
    } else {
        error.status = "Відсутній код помилки";
        error.message = `${getVendorName()} не відповідає ( ${requestName} )`;
    }
    return error;
};
