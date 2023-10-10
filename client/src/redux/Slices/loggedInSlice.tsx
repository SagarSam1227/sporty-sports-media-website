import { createSlice,PayloadAction } from "@reduxjs/toolkit";

interface logedInInterface {
    items:{
        isLogIn:boolean

    } 

}

const initialState:logedInInterface = {
    items:{
        isLogIn:false

    }
}


const loginSlice = createSlice({
    name:'login',
    initialState,
    reducers:{
        setLoginState:(state,action:PayloadAction<{isLogIn:boolean}>)=>{
            state.items.isLogIn=action.payload.isLogIn
        }
    }
})

export const {setLoginState} = loginSlice.actions;
export default loginSlice.reducer;