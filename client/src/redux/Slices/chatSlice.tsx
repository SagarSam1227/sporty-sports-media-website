import { createSlice,PayloadAction } from "@reduxjs/toolkit"

interface IdInterface {
    items:{
        hearerId:String | null
    }
}

const initialState:IdInterface = {
    items:{
        hearerId:null
    }
}

const chatSlice = createSlice({
    name :'chat',
    initialState,
    reducers:{
        setId:(state,action:PayloadAction<{hearerId:String}>)=>{
            state.items.hearerId = action.payload.hearerId
        }
    }
})

export const {setId} = chatSlice.actions;
export default chatSlice.reducer;