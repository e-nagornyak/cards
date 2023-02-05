// global types
export type InitialStateType = typeof initialState
export type AuthReducerActionsType = someACType

// AC types
export type someACType = ReturnType<typeof someAC>

const initialState = {}
export const authReducer = (state: InitialStateType, action: AuthReducerActionsType): InitialStateType => {
    switch (action.type) {
        default:
            return {...state}
    }
}

// actions
export const someAC = () =>
    ({type: 'AUTH/SOME-AC', payload: {}}) as const
// thunks

