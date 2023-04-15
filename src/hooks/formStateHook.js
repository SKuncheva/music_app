import { useState } from "react";

export const useForm = (firstValues) => {
    const [values, setForm] = useState(firstValues)
    const changeHandler = (e) => {
        setForm(state => ({...state, [e.target.name]:e.target.value}))
    }

    return {values, changeHandler}
};
